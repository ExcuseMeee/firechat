"use client";

import { AudioSelection } from "@/components/input/AudioSelection";
import { InputProvider } from "@/components/providers/inputProvider";
import { SoundProvider } from "@/components/providers/soundProvider";

export default function Test() {
  return (
    <div>
      <SoundProvider>
        <InputProvider>
          <AudioSelection />
        </InputProvider>
      </SoundProvider>
    </div>
  );
}
