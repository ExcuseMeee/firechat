"use client"

import { soundPaths } from "@/lib/sounds"
import { useSoundContext } from "./providers/soundProvider"

export const AudioSequence = () => {

  const test = [soundPaths.HEHEHEHAW ,soundPaths.HEHEHEHAW]
  const {playSound, playSoundSequence} = useSoundContext()

  function sounds(){
    // test.forEach(src => playSound(src))
    playSoundSequence(test)
  }

  return (
    <div>
      audio sequence
      <button onClick={sounds}>
        play sequence
      </button>
    </div>
  )
}