"use client";
import { Button } from "@/components/ui/button";
import { LogOutIcon, PauseIcon, PlayIcon, UserIcon } from "lucide-react";
import showToast from "@/lib/show-toast";
import { useRouter } from "next/navigation";
import { handleError, magic } from "@/lib/magic";
import {
  checkSessionToken,
  removeSessionToken,
  setSessionToken,
} from "@/lib/server-actions";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "./wrappers/jotai-provider";
import useRenderCount from "@/lib/hooks/use-render-count";
import Loader from "./layout/loader";

export default function SpaceComp({
  children,
  alertMessage,
}: {
  children?: React.ReactNode;
  alertMessage?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user] = useAtom(userAtom);
  const [, updateOnSignIn] = useAtom(userAtom);
  const render = useRenderCount();

  useEffect(() => {
    // Check if roomId is valid
    if (alertMessage) {
      const userConfirmed = window.confirm("Invalid roomId");
      if (userConfirmed) {
        router.replace("/space");
      } else {
        router.push("/");
      }
    }

    // Check if user is logged in
    if (!magic) return console.log("Magic not initialized");
    Promise.all([magic.user.isLoggedIn(), magic.user.getIdToken()])
      .then(([isLoggedIn, token]) => {
        if (!isLoggedIn) {
          console.log("This should not happen");
          removeSessionToken();
          router.push("/sign-in");
        } else {
          setSessionToken(token).then((res) => {
            if ("error" in res)
              showToast({ message: res.error, type: "error" });
            else updateOnSignIn(res);
            setLoading(false);
          });
        }
      })
      .catch(handleError);
  }, [alertMessage, router, updateOnSignIn]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen ">
          <div className="p-4 border border-gray-700 rounded shadow-lg">
            {children}
          </div>
          <div className="max-w-sm p-6 space-y-6 border border-gray-700 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center">Space:{render}</h1>
            <Button
              className="w-full "
              variant="outline"
              onClick={() => {
                console.log(user);
                showToast({
                  message: user.email + " - " + user.provider,
                  type: "success",
                });
              }}
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Check user Info
            </Button>

            <Button
              className="w-full "
              variant="outline"
              onClick={() => {
                router.replace("/space?roomId=" + user.token);
              }}
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              Start shared session
            </Button>
            <Button
              className="w-full "
              variant="outline"
              onClick={() => {
                router.replace("/space");
              }}
            >
              <PauseIcon className="w-5 h-5 mr-2" />
              End shared session
            </Button>
            <Button
              className="w-full "
              variant="outline"
              onClick={() => {
                console.log("logOut");
                if (!magic) return console.log("Magic not initialized");
                magic.user.logout();
                updateOnSignIn({
                  email: "",
                  issuer: "",
                  provider: "none",
                  token: "",
                });
                removeSessionToken();
                router.push("/");
              }}
            >
              <LogOutIcon className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
