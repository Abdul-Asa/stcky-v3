import Connect from "@/components/collab";
import { Room } from "@/components/wrappers/liveblocks-room";

export default function JoinPage({
  searchParams,
}: {
  searchParams: { roomId: string | undefined };
}) {
  if (searchParams.roomId) {
    return (
      <Room roomId={searchParams.roomId}>
        Join
        <Connect />
      </Room>
    );
  }
  return <div>Join</div>;
}
