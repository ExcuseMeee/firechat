"use client";

import { InputProvider } from "@/components/providers/inputProvider";
import { SoundProvider } from "@/components/providers/soundProvider";

export default function Test() {
  return (
    <SoundProvider>
      <InputProvider>
        <div>TEST</div>
      </InputProvider>
    </SoundProvider>
  );
}
