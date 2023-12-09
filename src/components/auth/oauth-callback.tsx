"use client";
import { magic } from "@/lib/magic";
import showToast from "@/lib/show-toast";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setSessionToken } from "@/lib/server-actions";
import useTimeout from "@/lib/hooks/use-timeout";
import { updateOnSignInAtom } from "../wrappers/jotai-provider";
import { useAtom } from "jotai";
import Loader from "../layout/loader";

export default function OAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, updateOnSignIn] = useAtom(updateOnSignInAtom);
  const [message, setMessage] = useState("Redirecting you soon...");

  useTimeout(() => {
    message !== "Redirecting you soon..."
      ? setMessage("You're still here? 🤔")
      : setMessage("It shouldn't take this long. Please try again.");
  }, 12000);

  useEffect(() => {
    const fetchRedirectResult = async () => {
      if (!magic) return console.log("Magic not initialized");
      if (
        !searchParams.get("magic_credential") &&
        !searchParams.get("magic_oauth_request_id")
      ) {
        setMessage("No Credentials found");
        return;
      }
      console.log("Mounted");

      try {
        const res = await magic.oauth.getRedirectResult();
        const token = await setSessionToken(res.magic.idToken);

        if ("error" in token) {
          showToast({ message: token.error, type: "error" });
          setMessage("Error!");
        } else {
          updateOnSignIn(token);
          router.push("/space");
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchRedirectResult();
  }, [router, searchParams, updateOnSignIn]);
  return (
    <div className="max-w-sm p-6 space-y-6 border rounded-lg shadow-lg dark:border-gray-700">
      <h1 className="text-3xl font-bold text-center">OAuth</h1>
      <p className="text-center ">{message}</p>
      <Loader />
    </div>
  );
}
