import Connect from "@/components/collab";
import SpaceComp from "@/components/space-com";
import { Room } from "@/components/wrappers/liveblocks-room";

export default function Space({
  searchParams,
}: {
  searchParams: { roomId: string | undefined };
}) {
  const roomId = searchParams.roomId;
  if (roomId) {
    return (
      <Room roomId={roomId}>
        <SpaceComp>
          <Connect />
        </SpaceComp>
      </Room>
    );
  }
  return <SpaceComp />;
}
