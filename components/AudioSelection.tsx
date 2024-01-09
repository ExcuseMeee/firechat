import { soundPaths } from "@/lib/sounds";
import { AudioBase } from "./AudioBase";

export const AudioSelection = () => {
  return (
    <div className="border border-blue-500">
      {Object.values(soundPaths).map((src, i) => (
        <AudioBase key={i} src={src} index={i} />
      ))}
    </div>
  );
};
