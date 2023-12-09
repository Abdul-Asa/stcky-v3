import { UserList } from "@/components/collab";
import Boundary from "@/components/layout/cursor-boundary";
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
          <Boundary>
            <SpaceComp>
              <UserList />
            </SpaceComp>
          </Boundary>
        </Room>
      );
    }
  }

  return <SpaceComp alertMessage={alert} />;
}
