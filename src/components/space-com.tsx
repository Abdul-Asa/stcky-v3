"use client";
import { Button } from "@/components/ui/button";
import { LogOutIcon, PauseIcon, PlayIcon, UserIcon } from "lucide-react";
import showToast from "@/lib/show-toast";
import { useRouter } from "next/navigation";
import { magic, handleError } from "@/lib/magic";
import { deleteCookie } from "@/lib/server-actions";
import { useEffect, useState } from "react";

export default function SpaceComp() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const checkUser = async () => {
    if (!magic) return console.log("Magic not initialized");
    await magic.user
      .getInfo()
      .then((data) => {
        showToast({
          message: data.email + " : " + data.publicAddress,
          type: data.email ? "success" : "error",
        });
      })
      .catch(handleError);
  };

  useEffect(() => {
    if (!magic) return console.log("Magic not initialized");
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        console.log("This should not happen");
        deleteCookie();
        router.push("/sign-in");
      }
      setLoading(false);
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-sm p-6 space-y-6 border rounded-lg shadow-lg dark:border-gray-700">
          <h1 className="text-3xl font-bold text-center">Space</h1>
          <Button className="w-full " variant="outline" onClick={checkUser}>
            <UserIcon className="w-5 h-5 mr-2" />
            Check user Info
          </Button>
          <Button
            className="w-full "
            variant="outline"
            onClick={() => {
              router.replace("/space?roomId=123");
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
              deleteCookie();
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
