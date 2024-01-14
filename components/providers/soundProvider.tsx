"use client";

import { storage } from "@/firebaseConfig";
import { soundPaths } from "@/lib/sounds";
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
  setInputSequence: Dispatch<SetStateAction<string[]>>;
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

    const fetchedMissing = await getMissing();

    const bufferSequence = await Promise.all(
      sequence.map(async (src) => {
        const buffer = savedBuffers.current.has(src)
          ? (savedBuffers.current.get(src) as AudioBuffer)
          : fetchedMissing?.has(src)
          ? (fetchedMissing.get(src) as AudioBuffer)
          : await getSound(src);
        return buffer;
      })
    );

    const interval = setInterval(() => {
      if (currentIndex > bufferSequence.length - 1) {
        console.log("[playSoundSequence] end of sequence");
        clearInterval(interval);
        return;
      }
      // console.log("[playSoundSequence] playing sound ", currentIndex);

      const audioNode = audioCtxRef.current!.createBufferSource();
      const audioBuffer = bufferSequence.at(currentIndex);
      if (!audioBuffer) {
        console.log("[playSoundSequence] null buffer, skipping");
        currentIndex++;
        return;
      }
      audioNode.buffer = audioBuffer;
      audioNode.connect(audioCtxRef.current!.destination);
      audioNode.start();

      currentIndex++;
    }, 500);

    async function getMissing() {
      const missingBuffers = sequence.filter(
        (src) => !savedBuffers.current.has(src)
      );
      if (missingBuffers.length === 0) return null;

      const uniqueMissingBuffers = Array.from(new Set(missingBuffers));

      const fetchedMissing = await Promise.all(
        uniqueMissingBuffers.map(async (missingSrc) => {
          if (Object.values(soundPaths).includes(missingSrc)) {
            // missingSrc is valid source, fetch it
            return [missingSrc, await getSound(missingSrc)] as const;
          } else {
            // missingSrc is not valid, don't bother fetching
            return [missingSrc, null] as const;
          }
        })
      );
      const fetchedMissingMap = new Map(fetchedMissing);
      return fetchedMissingMap;
    }

    // function playNextNode() {
    //   if (currentIndex > bufferSequence.length - 1) return;

    //   const audioNode = audioCtxRef.current!.createBufferSource();
    //   const audioBuffer = bufferSequence.at(currentIndex);
    //   if (!audioBuffer) {
    //     currentIndex++;
    //     playNextNode();
    //     return;
    //   }
    //   audioNode.buffer = audioBuffer;
    //   audioNode.connect(audioCtxRef.current!.destination);
    //   audioNode.start();

    //   audioNode.onended = () => {
    //     // TODO: Track when sequence ends
    //     currentIndex++;
    //     if (currentIndex < sequence.length) {
    //       playNextNode();
    //     } else {
    //       console.log("[playNextNode] sequence ended");
    //     }
    //   };
    // }
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
