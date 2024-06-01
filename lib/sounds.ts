export const soundPaths = {
  VINE_BOOM: "sounds/vine-boom.mp3",
  HEHEHEHAW: "sounds/hehehehaw.mp3",
  TACO_BELL: "sounds/taco-bell.mp3",
  HELLS_KITCHEN: "sounds/hells-kitchen.mp3",
  ULTRA_INSTINCT: "sounds/ultra-instinct.mp3",
  BRUH: "sounds/bruh.mp3",
  METAL_PIPE: "sounds/metal-pipe.mp3",
  THWOMP: "sounds/thwomp.mp3",
}

export function getFileName(soundPath: string){
  const parts = soundPath.split("/")
  const filename = parts[parts.length - 1].split(".")[0]
  return filename
}