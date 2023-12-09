import Connect from "@/components/collab";
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
    console.log(res);
    if ("error" in res) {
      alert = true;
    } else {
      return (
        <Room roomId={roomId}>
          <Connect />
        </Room>
      );
    }
  }

  return <div>Join{alert ? "no rooms with Id exist" : "bro"}</div>;
}
