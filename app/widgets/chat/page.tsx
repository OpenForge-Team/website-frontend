import { Metadata } from "next";
import RagChat from "@/components/rag-chat";
import { useSearchParams } from "next/navigation";

export const metadata: Metadata = {
  // Allow iframe embedding
  other: {
    "Content-Security-Policy": "frame-ancestors *",
  },
};

export default function ChatWidgetPage() {
  const searchParams = useSearchParams();
  
  // Get parameters from URL
  const workspaceId = searchParams.get('workspaceId');
  const userId = searchParams.get('userId');
  const mode = (searchParams.get('mode') as "chat" | "view") || "chat";
  const editable = searchParams.get('editable') !== "false";
  const conversationId = searchParams.get('conversationId');

  return (
    <div className="h-screen w-full">
      <RagChat 
        editable={editable}
        mode={mode}
        workspaceId={workspaceId || undefined}
        userId={userId || undefined}
        conversationId={conversationId || undefined}
      />
    </div>
  );
}
