"use client";
import { Button } from "@/components/ui/button";
import { BluetoothConnected, LogOutIcon, UserIcon } from "lucide-react";
import { useOthers, useRoom, useSelf, useStatus } from "@/liveblocks.config.ts";

export default function Connect() {
  const room = useRoom();
  const status = useStatus();
  const capitalizedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  const roomName = room.id;
  const { id, info } = useSelf();
  const others = useOthers();

  return (
    <>
      <p className="truncate">{capitalizedStatus + " to room:" + roomName}</p>
      <p className="truncate">Me: {id}</p>
      <p>{info.isHost ? "-Host" : "-Guest"} </p>
      <h1>People in the room</h1>
      {others.map((user) => {
        return (
          <div key={user.connectionId}>
            <p className="truncate">Me: {user.id}</p>
            <p>{user.info.isHost ? "-Host" : "-Guest"} </p>
          </div>
        );
      })}
    </>
  );
}
