export const soundPaths = {
  VINE_BOOM: "sounds/vine-boom.mp3",
  HEHEHEHAW: "sounds/hehehehaw.mp3",
  HEHEHEHAWq: "sounds/hehehehaw.mp3",
  VINE_BOOM2: "sounds/vine-boom.mp3",
  HEHEHEHAW3: "sounds/hehehehaw.mp3",
  HEHEHEHAWw: "sounds/hehehehaw.mp3",
  HEHEHEHAWx: "sounds/hehehehaw.mp3",
  HEHEHEHAW1: "sounds/hehehehaw.mp3",
  HEHEHEHAW4: "sounds/hehehehaw.mp3",
}

export function getFileName(soundPath: string){
  const parts = soundPath.split("/")
  const filename = parts[parts.length - 1].split(".")[0]
  return filename
}