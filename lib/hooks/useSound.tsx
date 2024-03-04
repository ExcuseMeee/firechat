import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { soundPaths } from "../sounds";

export default function useSound(
  audioContext: AudioContext | null,
  savedBuffers: Map<string, AudioBuffer>
) {
  const [isBuffering, setIsBuffering] = useState(false);

  async function playSounds(sources: string[]) {
    console.log("[playSounds] ran");
    if (!audioContext) {
      console.log("[playSounds] no ctx, returning");
      return;
    }

    if (sources.length === 0) {
      console.log("[playSounds] no sound to play");
      return;
    }

    // prefetch buffer sequence
    setIsBuffering(true);
    const fetchedMissing = await getMissingBuffers(sources);
    const bufferSequence = await Promise.all(
      sources.map(async (src) => {
        const buffer = savedBuffers.has(src)
          ? (savedBuffers.get(src) as AudioBuffer)
          : fetchedMissing?.has(src)
          ? (fetchedMissing.get(src) as AudioBuffer)
          : await getSoundBuffer(src);
        return buffer;
      })
    );
    setIsBuffering(false);

    // play first buffer immediately
    const initialNode = audioContext.createBufferSource();
    const initialBuffer = bufferSequence.at(0);
    if (initialBuffer) {
      initialNode.buffer = initialBuffer;
      initialNode.connect(audioContext.destination);
      initialNode.start();
    }

    // consecutive playing
    let currentIndex = 1; // start at 1 because first buffer was already played
    const interval = setInterval(() => {
      if (currentIndex > bufferSequence.length - 1) {
        // end of sequence
        clearInterval(interval);
        return;
      }

      const audioNode = audioContext.createBufferSource();
      const audioBuffer = bufferSequence.at(currentIndex);
      if (audioBuffer) {
        // play sound if it exists
        audioNode.buffer = audioBuffer;
        audioNode.connect(audioContext.destination);
        audioNode.start();
      }

      currentIndex++;
    }, 500);
  }

  async function getSoundBuffer(src: string) {
    console.log("[getSoundBuffer] called");
    if (!audioContext) {
      console.log("[getSoundBuffer] no audioctx available");
      return null;
    }
    try {
      const soundRef = ref(storage, src);
      const soundUrl = await getDownloadURL(soundRef);
      const buffer = await fetch(soundUrl).then((res) => res.arrayBuffer());
      const decoded = await audioContext.decodeAudioData(buffer);
      savedBuffers.set(src, decoded);
      return decoded;
    } catch (error) {
      console.log("[getSoundBuffer] ", error);
      return null;
    }
  }

  async function getMissingBuffers(sources: string[]) {
    const missingBuffers = sources.filter((src) => !savedBuffers.has(src));
    if (missingBuffers.length === 0) return null;

    const uniqueMissingBuffers = Array.from(new Set(missingBuffers));

    const fetchedMissing = await Promise.all(
      uniqueMissingBuffers.map(async (missingSrc) => {
        if (Object.values(soundPaths).includes(missingSrc)) {
          // missingSrc is valid source, fetch it
          return [missingSrc, await getSoundBuffer(missingSrc)] as const;
        } else {
          // missingSrc is not valid, don't bother fetching
          return [missingSrc, null] as const;
        }
      })
    );
    const fetchedMissingMap = new Map(fetchedMissing);
    return fetchedMissingMap;
  }

  return {
    isBuffering,
    playSounds,
  };
}
