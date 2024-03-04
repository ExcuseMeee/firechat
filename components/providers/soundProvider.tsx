"use client";

import {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

type SoundContextType = {
  audioCtxRef: MutableRefObject<AudioContext | null>;
  savedBuffers: MutableRefObject<Map<string, AudioBuffer>>;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const savedBuffers = useRef(new Map<string, AudioBuffer>());

  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
  }, []);

  return (
    <SoundContext.Provider
      value={{
        audioCtxRef,
        savedBuffers,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
}
