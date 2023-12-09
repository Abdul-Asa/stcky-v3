import { Suspense } from "react";
import OAuth from "@/components/auth/oauth-callback";
import Loader from "@/components/layout/loader";

export default function OAuthCallback() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Suspense fallback={<Loader/>}>
        <OAuth />
      </Suspense>
    </div>
  );
}
