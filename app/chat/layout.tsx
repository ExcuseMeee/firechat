import { AudioSelection } from "@/components/AudioSelection";
import { Header } from "@/components/Header";
import { ChatProvider } from "@/components/providers/chatProvider";
import { SoundProvider } from "@/components/providers/soundProvider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <SoundProvider>
        <div className="flex flex-col h-screen">
          <Header className="min-h-[8%] border border-yellow-500" />
          <main className="flex h-full">
            <AudioSelection className="border border-blue-500 min-w-[15%]" />
            {children}
          </main>
        </div>
      </SoundProvider>
    </ChatProvider>
  );
}
