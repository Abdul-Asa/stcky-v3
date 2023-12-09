import { checkSessionToken } from "@/lib/server-actions";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export async function POST(request: Request) {
  const { room } = await request.json();
  const cookies = request.headers.get("cookie");
  const token = cookies
    ?.split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  const checkToken = await checkSessionToken(token ?? "");
  const isValid = !("error" in checkToken);
  const isHost = isValid && room === token;
  // Start an auth session inside your endpoint
  const userId = isValid ? checkToken.issuer : `guest:${crypto.randomUUID()}`;
  const session = liveblocks.prepareSession(
    userId,
    { userInfo: { isHost: isHost } } // Optional
  );

  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
