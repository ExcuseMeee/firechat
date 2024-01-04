"use client";

import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SoundContextType = {
  audioCtxRef: MutableRefObject<AudioContext | null>;
  getSound: (src: string) => Promise<AudioBuffer | null>;
  playSound: (src: string) => Promise<void>;
  playSoundSequence: (sequence: string[]) => Promise<void>;
  inputSequence: string[];
  setInputSequence: Dispatch<SetStateAction<string[]>>
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const savedBuffers = useRef(new Map<string, AudioBuffer>());

  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
  }, []);

  async function getSound(src: string) {
    console.log("[getSound] called");
    if (!audioCtxRef.current) {
      console.log("[getSound] no audioctx available");
      return null;
    }
    try {
      const soundRef = ref(storage, src);
      const soundUrl = await getDownloadURL(soundRef);
      const buffer = await fetch(soundUrl).then((res) => res.arrayBuffer());
      const decoded = await audioCtxRef.current.decodeAudioData(buffer);
      savedBuffers.current.set(src, decoded);
      return decoded;
    } catch (error) {
      console.log("[getSound] ", error);
      return null;
    }
  }

  async function playSound(src: string) {
    if (!audioCtxRef.current) return;

    const soundNode = audioCtxRef.current.createBufferSource();

    const saved = savedBuffers.current.get(src);

    soundNode.buffer = saved ? saved : await getSound(src);

    soundNode.connect(audioCtxRef.current.destination);
    soundNode.start();
  }

  async function playSoundSequence(sequence: string[]) {
    if (!audioCtxRef.current) return;

    let currentIndex = 0;

    // TODO: optimize by pulling unfetched buffers to a Set, then fetching from there. prevents duplicate fetches for the same audio
    const bufferSequence = await Promise.all(
      sequence.map(async (src) => {
        const buffer = savedBuffers.current.has(src)
          ? (savedBuffers.current.get(src) as AudioBuffer)
          : await getSound(src);
        return buffer;
      })
    );

    function playNextNode() {
      if (currentIndex > bufferSequence.length - 1) return;

      const audioNode = audioCtxRef.current!.createBufferSource();
      const audioBuffer = bufferSequence.at(currentIndex);
      if (!audioBuffer) {
        currentIndex++;
        playNextNode();
        return;
      }
      audioNode.buffer = audioBuffer;
      audioNode.connect(audioCtxRef.current!.destination);
      audioNode.start();

      audioNode.onended = () => {
        currentIndex++;
        playNextNode();
      };
    }

    playNextNode();
  }

  return (
    <SoundContext.Provider
      value={{
        audioCtxRef,
        getSound,
        playSound,
        playSoundSequence,
        inputSequence,
        setInputSequence,
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
