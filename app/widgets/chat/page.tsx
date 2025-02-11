import { Metadata } from "next";
import RagChat from "@/components/rag-chat";

export const metadata: Metadata = {
  // Allow iframe embedding
  other: {
    "Content-Security-Policy": "frame-ancestors *",
  },
};

export default function ChatWidgetPage() {
  return (
    <div className="h-screen w-full">
      <RagChat editable={true} mode="chat" />
    </div>
  );
}
