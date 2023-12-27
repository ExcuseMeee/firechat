import { AudioPiece } from "@/components/AudioPiece";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/chat"}>CHAT</Link>
      <AudioPiece />
    </div>
  )
}
