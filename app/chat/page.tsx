import { Backlog } from "@/components/Backlog";
import { LiveFeed } from "@/components/LiveFeed";
import { InputBox } from "@/components/InputBox";
import Link from "next/link";
import { SignIn } from "@/components/SignIn";

export default function Chat() {
  return (
    <section className="border border-red-500 w-full h-full">
      <Backlog />
      <LiveFeed />
      <InputBox />
      <Link href={"/"}>BACk</Link>
    </section>
  );
}
