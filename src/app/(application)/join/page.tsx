import { UserList } from "@/components/collab";
import Boundary from "@/components/layout/cursor-boundary";
import { Room } from "@/components/wrappers/liveblocks-room";
import { liveblockRoomExist } from "@/lib/server-actions";

export default async function JoinPage({
  searchParams,
}: {
  searchParams: { roomId: string | undefined };
}) {
  const roomId = searchParams.roomId;
  let alert = false;
  if (roomId) {
    const res = await liveblockRoomExist(roomId);
    if ("error" in res) {
      alert = true;
    } else {
      return (
        <Room roomId={roomId}>
          <Boundary>
            <UserList />
          </Boundary>
        </Room>
      );
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      Join
      <p>{alert && "no rooms with Id exist"}</p>
    </div>
  );
}
