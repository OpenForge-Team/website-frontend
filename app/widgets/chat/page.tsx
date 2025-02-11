"use client";
import RagChat from "@/components/rag-chat";
import { useSearchParams } from "next/navigation";

export default function ChatWidgetPage() {
  const searchParams = useSearchParams();

  // Get parameters from URL
  const userId = searchParams.get("userId");
  console.log(userId);
  return (
    <div className="h-screen w-full">
      <RagChat editable={true} mode={"chat"} user_id={userId || ""} />
    </div>
  );
}
