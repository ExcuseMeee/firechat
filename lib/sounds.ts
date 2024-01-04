export const soundPaths = {
  VINE_BOOM: "sounds/vine-boom.mp3",
  HEHEHEHAW: "sounds/hehehehaw.mp3",
}

export function getFileName(soundPath: string){
  const parts = soundPath.split("/")
  const filename = parts[parts.length - 1].split(".")[0]
  return filename
}