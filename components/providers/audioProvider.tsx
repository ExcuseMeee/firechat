"use client";

import { createContext, useContext } from "react";

type AudioContextType = {};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {

  

  return <AudioContext.Provider value={{}}>{children}</AudioContext.Provider>;
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
}
