import { Suspense } from "react";
import OAuth from "@/components/auth/oauth-callback";

export default function OAuthCallback() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Suspense fallback={<div>Loading...</div>}>
        <OAuth />
      </Suspense>
    </div>
  );
}
