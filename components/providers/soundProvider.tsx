"use client";

import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

type SoundContextType = {
  audioCtxRef: MutableRefObject<AudioContext | null>;
  getSound: (src: string) => Promise<AudioBuffer | null>;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
  }, []);

  async function getSound(src: string) {
    console.log("[getSound] called")
    if (!audioCtxRef.current) {
      console.log("[getSound] no audioctx available");
      return null;
    }
    try {
      const soundRef = ref(storage, src);
      const soundUrl = await getDownloadURL(soundRef);
      const buffer = await fetch(soundUrl).then((res) => res.arrayBuffer());
      const decoded = await audioCtxRef.current.decodeAudioData(buffer);
      return decoded;
    } catch (error) {
      console.log("[getSound] ", error);
      return null;
    }
  }

  return (
    <SoundContext.Provider value={{ audioCtxRef, getSound }}>
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
