import { AudioBase } from "@/components/AudioBase";
import { SoundProvider } from "@/components/providers/soundProvider";
import { getFileName, soundPaths } from "@/lib/sounds";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/chat"}>CHAT</Link>
    </div>
  );
}
