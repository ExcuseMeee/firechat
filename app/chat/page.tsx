import { Backlog } from "@/components/Backlog";
import { LiveFeed } from "@/components/LiveFeed";
import { InputBox } from "@/components/InputBox";
import Link from "next/link";
import { AudioBase } from "@/components/AudioBase";
import { getFileName, soundPaths } from "@/lib/sounds";

export default function Chat() {
  return (
    <div>
      <Backlog />
      <LiveFeed />
      <InputBox />
      <Link href={"/"}>BACK</Link>
      <div className="border border-red-500">
        <AudioBase audioInfo={{ name: getFileName(soundPaths.VINE_BOOM), src: soundPaths.VINE_BOOM}} />
        <AudioBase audioInfo={{ name: getFileName(soundPaths.HEHEHEHAW), src: soundPaths.HEHEHEHAW}} />
      </div>
    </div>
  );
}
