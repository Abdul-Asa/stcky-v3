"use client";
import {
  useMyPresence,
  useOthers,
  useOthersMapped,
  useSelf,
  useUpdateMyPresence,
} from "@/liveblocks.config.ts";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Minimize2Icon, Maximize2Icon } from "lucide-react";

import { shallow } from "@liveblocks/client";

export function UserList() {
  const onlineUsers = useOthersMapped(
    (user) => [user.id, user.info.isHost],
    shallow
  );
  const { info, id } = useSelf();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={` w-full space-y-8 h-fit flex flex-col transition-all ${
        isExpanded ? "max-h-[300px]" : "max-h-[40px]"
      } duration-500 overflow-hidden`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full gap-1 space-x-2">
          <div
            style={{
              background: `linear-gradient(to bottom right, red, orange)`,
            }}
            className="h-6 border-border rounded-full border-[1px] w-6"
          />

          <p
            onClick={() => {
              setIsExpanded(false);
            }}
          >
            {info.isHost ? "Host" : "Guest"}
          </p>
        </div>
        <div className="flex items-center w-[150px]  justify-end gap-3">
          {isExpanded ? (
            <Minimize2Icon
              className="transition-all cursor-pointer text-scale-900 hover:text-scale-1200 hover:scale-105"
              strokeWidth={2}
              size={16}
              onClick={() => setIsExpanded(false)}
            />
          ) : (
            <>
              <p
                className="cursor-pointer "
                onClick={() => {
                  setIsExpanded(true);
                }}
              >
                {onlineUsers.length} others online
              </p>
              <Maximize2Icon
                className="transition-all cursor-pointer text-scale-900 hover:text-scale-1200 hover:scale-105"
                strokeWidth={2}
                size={16}
                onClick={() => {
                  setIsExpanded(true);
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start h-full space-y-6 overflow-scroll">
        <hr className="w-full border-border" />
        {!onlineUsers.length && (
          <>
            <p className="w-full font-bold text-center font-anon">
              {"👀 Looks like you're the only one here"}
            </p>
          </>
        )}
        {onlineUsers.map((onlineUser) => {
          const id = onlineUser[0];
          const isHost = onlineUser[1][0];
          console.log(onlineUser);
          return (
            <div
              key={id}
              className="flex items-center justify-center gap-2 space-x-2"
            >
              <div
                style={{
                  background: `linear-gradient(to bottom right, green, yellow)`,
                }}
                className="h-6 border-border rounded-full border-[1px] w-6"
              />
              {isHost ? "Host" : "Guest"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
