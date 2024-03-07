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
          <div className="flex flex-col h-screen">
            <Header className="min-h-[8%] border border-yellow-500" />
            <main className="flex h-full">
              <AudioSelection className="border border-blue-500" />
              {children}
            </main>
          </div>
        </InputProvider>
      </SoundProvider>
    </ChatProvider>
  );
}
