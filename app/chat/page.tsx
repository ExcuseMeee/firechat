import { InputBox } from "@/components/input/InputBox";
import { ChatFeed } from "@/components/chat/ChatFeed";

export default function Chat() {
  return (
    <section className="w-full h-full flex flex-col">
      <ChatFeed />
      <InputBox />
    </section>
  );
}
