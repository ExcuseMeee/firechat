"use client";

import React, { createContext, useContext, useState } from "react";

type InputContextType = {
  input: string[];
  setInput: React.Dispatch<React.SetStateAction<string[]>>;
  addSoundToInput: (src: string) => void;
  removeSoundFromInput: (index: number) => void;
  clearInput: () => void;
};

const InputContext = createContext<InputContextType | null>(null);

export function InputProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState<string[]>([]);

  function addSoundToInput(src: string) {
    console.log(`[addSoundToInput] adding ${src} to input`)
    const newInput = [...input, src];
    setInput(newInput);
  }
  
  function removeSoundFromInput(index: number) {
    console.log(`[removeSoundFromInput] removing sound at index ${index} from input`)
    const newInput = input.filter((src, i) => index !== i);
    setInput(newInput);
  }
  
  function clearInput() {
    console.log(`[clearInput] clearing input`)
    setInput([]);
  }

  return (
    <InputContext.Provider
      value={{ input, setInput, addSoundToInput, removeSoundFromInput, clearInput }}
    >
      {children}
    </InputContext.Provider>
  );
}

export function useInputContext() {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext must be used within a InputProvider");
  }
  return context;
}
