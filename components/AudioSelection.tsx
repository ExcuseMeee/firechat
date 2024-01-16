import { soundPaths } from "@/lib/sounds";
import { AudioBase } from "@/components/AudioBase";

export const AudioSelection = () => {
  return (
    <section className="border border-blue-500 w-1/6 h-screen">
      <div className="border flex items-center">
        {Object.values(soundPaths).map((src, i) => (
          <AudioBase key={i} src={src} type={"selection"} index={i} />
        ))}
      </div>
    </section>
  );
};
