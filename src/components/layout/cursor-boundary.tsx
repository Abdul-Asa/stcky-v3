"use client";

import { useOthers, useMyPresence, useSelf } from "@/liveblocks.config.ts";
import { useMousePosition } from "@/lib/hooks/use-mouse";

export default function Boundary({ children }: { children: React.ReactNode }) {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const { id, info } = useSelf();
  const { x, y } = useMousePosition();

  const onPointerMove = (event: React.PointerEvent) => {
    event.preventDefault();
    updateMyPresence({
      cursor: {
        x: x,
        y: y,
      },
    });
  };

  const onPointerLeave = () => {
    updateMyPresence({
      cursor: null,
    });
  };

  return (
    <main
      className="relative flex cursor-none flex-col items-center justify-between w-full min-h-[100svh] p-4 overflow-hidden text-sm touch-none lg:px-16 lg:py-10"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}

      {/* my cursor */}
      {cursor && (
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
          }}
        >
          <svg
            width="24"
            height="36"
            viewBox="0 0 24 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
              fill={"blue"}
            />
          </svg>
          {info.isHost ? "Host" : "Guest"}{" "}
        </div>
      )}

      {/* other cursors */}
      {others.map(({ connectionId, presence, info, id }) => {
        if (presence == null || !presence.cursor) {
          return null;
        }

        return (
          <div
            key={connectionId}
            className="absolute top-0 left-0 pointer-events-none"
            style={{
              transform: `translateX(${presence.cursor.x}px) translateY(${presence.cursor.y}px)`,
            }}
          >
            <svg
              width="24"
              height="36"
              viewBox="0 0 24 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={"red"}
              />
            </svg>
            {info.isHost ? "host" : "guest"}
          </div>
        );
      })}
    </main>
  );
}
