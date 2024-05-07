"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef } from "react";

export default function Test() {
  const r = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ScrollArea className="h-72">
        <div className="bg-lighter">
          <button
            onClick={() => {
              if (r.current) {
                r.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Scroll
          </button>
          <div className="border border-dashed border-red-500 h-screen">
            Padding...
          </div>
          <div className="border border-dashed border-red-500 h-screen">
            Padding...
          </div>
          <div className="border border-dashed border-red-500 h-screen">
            Padding...
          </div>
          <div className="border border-green-500" ref={r}>
            HERE
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
