import { Backlog } from "@/components/Backlog";
import { LiveFeed } from "@/components/LiveFeed";
import { InputBox } from "@/components/InputBox";
import Link from "next/link";
import { SignIn } from "@/components/SignIn";

export default function Chat() {
  return (
    <div className="border border-red-500 w-5/6">
      <Backlog />
      <LiveFeed />
      <InputBox />
      <SignIn />
      <Link href={"/"}>BACk</Link>
    </div>
  );
}
