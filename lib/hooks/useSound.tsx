"use client";
import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { MutableRefObject, useState } from "react";
import { soundPaths } from "../sounds";

export default function useSound(
  audioContextRef: MutableRefObject<AudioContext | null>,
  savedBuffersRef: MutableRefObject<Map<string, AudioBuffer>>
) {
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [audioInterval, setAudioInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [playedNodes, setPlayedNodes] = useState<AudioBufferSourceNode[]>([]);

  async function playSounds(sources: string[]) {
    console.log("[playSounds] ran");
    if (!audioContextRef.current) {
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
        const buffer = savedBuffersRef.current.has(src)
          ? (savedBuffersRef.current.get(src) as AudioBuffer)
          : fetchedMissing?.has(src)
          ? (fetchedMissing.get(src) as AudioBuffer)
          : await getSoundBuffer(src);
        return buffer;
      })
    );
    setIsBuffering(false);

    // play first buffer immediately
    setIsPlaying(true);
    const initialNode = audioContextRef.current.createBufferSource();
    const initialBuffer = bufferSequence.at(0);
    if (initialBuffer) {
      initialNode.buffer = initialBuffer;
      initialNode.connect(audioContextRef.current.destination);
      setPlayedNodes((played) => [...played, initialNode]);
      initialNode.start();
    }

    // consecutive playing
    let currentIndex = 1; // start at 1 because first buffer was already played
    const interval = setInterval(() => {
      if (currentIndex > bufferSequence.length - 1) {
        // end of sequence
        clearInterval(interval);
        setAudioInterval(null);
        setPlayedNodes([]);
        setIsPlaying(false);
        return;
      }

      const audioNode = audioContextRef.current!.createBufferSource();
      const audioBuffer = bufferSequence.at(currentIndex);
      if (audioBuffer) {
        // play sound if it exists
        audioNode.buffer = audioBuffer;
        audioNode.connect(audioContextRef.current!.destination);
        setPlayedNodes((played) => [...played, audioNode]);
        audioNode.start();
      }

      currentIndex++;
    }, 500);
    setAudioInterval(interval);
  }

  async function getSoundBuffer(src: string) {
    console.log("[getSoundBuffer] called");
    if (!audioContextRef.current) {
      console.log("[getSoundBuffer] no audioctx available");
      return null;
    }
    try {
      const soundRef = ref(storage, src);
      const soundUrl = await getDownloadURL(soundRef);
      const buffer = await fetch(soundUrl).then((res) => res.arrayBuffer());
      const decoded = await audioContextRef.current.decodeAudioData(buffer);
      savedBuffersRef.current.set(src, decoded);
      return decoded;
    } catch (error) {
      console.log("[getSoundBuffer] ", error);
      return null;
    }
  }

  async function getMissingBuffers(sources: string[]) {
    const missingBuffers = sources.filter(
      (src) => !savedBuffersRef.current.has(src)
    );
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

  async function stopSounds() {
    console.log("[stopSounds] called");
    if (!audioContextRef.current) {
      console.log("[stopSounds] no audio ctx");
      return;
    }
    if (!audioInterval) {
      console.log("[stopSounds] no interval");
      return;
    }
    clearInterval(audioInterval);
    setAudioInterval(null);
    playedNodes.forEach((audioNode) => audioNode.stop());
    setPlayedNodes([]);
    setIsPlaying(false);
  }

  return {
    isBuffering,
    playSounds,
    isPlaying,
    stopSounds,
  };
}
