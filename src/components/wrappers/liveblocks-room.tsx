"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config.ts";
import { ClientSideSuspense } from "@liveblocks/react";

export function Room({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  return (
    <RoomProvider id={roomId} initialPresence={{ userName: roomId }}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
