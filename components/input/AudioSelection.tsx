"use client";
import { soundPaths } from "@/lib/sounds";
import { HTMLAttributes, useEffect, useState } from "react";
import { AudioIcon } from "@/components/common/AudioIcon";

type AudioSelectionProps = HTMLAttributes<HTMLDivElement> & {};

export const AudioSelection = ({ ...rest }: AudioSelectionProps) => {
  const [test, setTest] = useState(false);

  useEffect(() => {
    setTest(true);
  }, []);

  if (!test) return <div>LOADINFSADSADASd</div>;

  return (
    <section {...rest}>
      <div className="flex items-center">
        {Object.values(soundPaths).map((src, i) => (
          <AudioIcon key={i} src={src} type={"selection"} index={i} />
        ))}
      </div>
    </section>
  );
};
