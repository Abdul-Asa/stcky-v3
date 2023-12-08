"use client";
import { magic } from "@/lib/magic";
import showToast from "@/lib/show-toast";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setSessionToken } from "@/lib/server-actions";
import useTimeout from "@/lib/hooks/use-timeout";

export default function OAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Redirecting you soon...");

  useTimeout(() => {
    message !== "Redirecting you soon..."
      ? setMessage("You're still here? 🤔")
      : setMessage("It shouldn't take this long. Please try again.");
  }, 10000);

  useEffect(() => {
    console.log("Run on mount");
    if (!magic) return console.log("Magic not initialized");
    if (
      !searchParams.get("magic_credential") &&
      !searchParams.get("magic_oauth_request_id")
    ) {
      setMessage("No Credentials found");
      return;
    }
    console.log("here 1");

    magic.oauth
      .getRedirectResult()
      .then(async (res) => {
        console.log("here 2" + res);
        const token = await setSessionToken(res.magic.idToken);
        console.log("here 3" + token);
        if (token.error) {
          showToast({ message: token.error, type: "error" });
          setMessage("Youre ready to go!");
        } else router.push("/space");
      })
      .catch((e) => {
        console.log("here 3.5" + e);
        console.log(e);
      });
    console.log("here 4");
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-sm p-6 space-y-6 border rounded-lg shadow-lg dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center">OAuth</h1>
        <p className="text-center ">{message}</p>
      </div>
    </div>
  );
}
