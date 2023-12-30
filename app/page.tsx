import { AudioBase } from "@/components/AudioBase";
import { SoundProvider } from "@/components/providers/soundProvider";
import { soundPaths } from "@/lib/sounds";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/chat"}>CHAT</Link>
      <SoundProvider>
        <AudioBase audioPath={soundPaths.VINE_BOOM} />
        <AudioBase audioPath={soundPaths.HEHEHEHAW} />
      </SoundProvider>
    </div>
  );
}
