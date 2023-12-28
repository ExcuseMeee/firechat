import { AudioPiece } from "@/components/AudioPiece";
import { soundPaths } from "@/lib/sounds";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/chat"}>CHAT</Link>
      <AudioPiece soundPath={soundPaths.VINE_BOOM} />
      <AudioPiece soundPath={soundPaths.HEHEHEHAW} />
    </div>
  )
}
