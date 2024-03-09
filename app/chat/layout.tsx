import { AudioSelection } from "@/components/input/AudioSelection";
import { Header } from "@/components/common/Header";
import { ChatProvider } from "@/components/providers/chatProvider";
import { SoundProvider } from "@/components/providers/soundProvider";
import { InputProvider } from "@/components/providers/inputProvider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <SoundProvider>
        <InputProvider>
          <div className="flex h-screen">
            <AudioSelection />
            <main className="flex-grow flex flex-col px-10">
              <Header className="w-full border" />
              {children}
            </main>
          </div>
        </InputProvider>
      </SoundProvider>
    </ChatProvider>
  );
}
