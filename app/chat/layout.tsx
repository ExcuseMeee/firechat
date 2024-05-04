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
          <div className="flex h-screen max-w-screen border border-green-500">
            <AudioSelection />
            <main className="flex-grow flex flex-col px-16">
              <Header className="w-full py-4" />
              {children}
            </main>
          </div>
        </InputProvider>
      </SoundProvider>
    </ChatProvider>
  );
}
