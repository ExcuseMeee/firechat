import { soundPaths } from "@/lib/sounds";
import { AudioBase } from "@/components/AudioBase";
import { HTMLAttributes } from "react";

type AudioSelectionProps = HTMLAttributes<HTMLDivElement> & {}

export const AudioSelection = ({...rest}: AudioSelectionProps) => {
  return (
    <section {...rest}>
      <div className="flex items-center">
        {Object.values(soundPaths).map((src, i) => (
          <AudioBase key={i} src={src} type={"selection"} index={i} />
        ))}
      </div>
    </section>
  );
};
