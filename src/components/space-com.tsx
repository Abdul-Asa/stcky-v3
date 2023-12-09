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

export default function SpaceComp({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user] = useAtom(userAtom);
  const [, updateOnSignIn] = useAtom(userAtom);
  const render = useRenderCount();

  useEffect(() => {
    if (!magic) return console.log("Magic not initialized");
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        console.log("This should not happen");
        removeSessionToken();
        router.push("/sign-in");
      }
    });

    magic.user
      .getIdToken()
      .then((token) => {
        setSessionToken(token).then((res) => {
          if ("error" in res) showToast({ message: res.error, type: "error" });
          else updateOnSignIn(res);
          setLoading(false);
        });
      })
      .catch(handleError);
  }, [router, updateOnSignIn]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-sm p-6 space-y-6 border rounded-lg shadow-lg dark:border-gray-700">
          <h1 className="text-3xl font-bold text-center">Space:{render}</h1>
          {children}
          <Button
            className="w-full "
            variant="outline"
            onClick={() => {
              console.log(user);
              showToast({
                message: user.email + user.provider,
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
            onClick={() =>
              checkSessionToken(user.token, user.issuer).then((res) => {
                console.log(res);
              })
            }
          >
            <UserIcon className="w-5 h-5 mr-2" />
            Check token matches
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
      )}
    </div>
  );
}
