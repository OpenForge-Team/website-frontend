import RagChat from "@/components/rag-chat";
import { retrieveContentChunks } from "@/utils/supabase/rag/retrieve-content-embeddings";
import { retrieveTitleChunks } from "@/utils/supabase/rag/retrieve-title-embeddings";

export default async function ChatPage() {
  // const res1 = await retrieveTitleChunks({
  //   note_id: "38fd8474-df12-4ded-9eaa-ee8f8589e2ae",
  //   query: "LLM",
  // });
  // const res2 = await retrieveContentChunks({
  //   note_id: "38fd8474-df12-4ded-9eaa-ee8f8589e2ae",
  //   query: "AI",
  // });
  return <RagChat editable={true} mode={"chat"} conversationId={undefined} />;
}
