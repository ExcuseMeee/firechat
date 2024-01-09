import { Backlog } from "@/components/Backlog";
import { LiveFeed } from "@/components/LiveFeed";
import { InputBox } from "@/components/InputBox";
import Link from "next/link";

export default function Chat() {
  return (
    <div className="border border-red-500">
      <Backlog />
      <LiveFeed />
      <InputBox />
      <Link href={"/"}>BACK</Link>
    </div>
  );
}
