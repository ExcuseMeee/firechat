import { ChatFeed } from "@/components/chat/ChatFeed";
import { Header } from "@/components/common/Header";
import { AudioSelection } from "@/components/input/AudioSelection";
import { InputBox } from "@/components/input/InputBox";

export default function Home() {
  return (
    <div className="flex h-screen max-w-screen border border-green-500">
      <AudioSelection />
      <main className="flex-grow flex flex-col px-16">
        <Header className="w-full py-4" />
        <ChatFeed />
        <InputBox />
      </main>
    </div>
  );
}