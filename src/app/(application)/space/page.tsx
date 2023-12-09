import Connect from "@/components/collab";
import SpaceComp from "@/components/space-com";
import { Room } from "@/components/wrappers/liveblocks-room";
import { checkSessionToken } from "@/lib/server-actions";

export default async function Space({
  searchParams,
}: {
  searchParams: { roomId: string | undefined };
}) {
  const roomId = searchParams.roomId;
  let alert = false;
  if (roomId) {
    const res = await checkSessionToken(roomId);
    if ("error" in res) {
      alert = true;
    } else {
      return (
        <Room roomId={roomId}>
          <SpaceComp>
            <Connect />
          </SpaceComp>
        </Room>
      );
    }
  }

  return <SpaceComp alertMessage={alert} />;
}
