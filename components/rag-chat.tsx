"use client";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/utils/queries";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "./hooks/use-toast";
import { useRouter } from "next/navigation";
import { AskAIChat } from "@/utils/supabase/rag/chat/supabase-hybrid/ask";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { getNotebyId } from "@/utils/supabase/notes";
import { Textarea } from "./ui/textarea";
import { getDocumentById } from "@/utils/supabase/documents";
import { DocumentViewer } from "./document-viewer";
interface Props {
  editable: boolean;
  mode: "chat" | "view";
  conversationId?: string;
  user_id?: string;
}

interface ChatMessage {
  role: "ai" | "user";
  messageContent: string;
}
const mime = require("mime-types");
export default function RagChat({ editable, mode, conversationId, user_id }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();
  const [dialogSourceContent, setDialogSourceContent] = useState<any>(null);
  const [documentViewerContent, setDocumentViewerContent] = useState<any>(null);
  const [messages, setMessages] = useState([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatInputText, setChatInputText] = useState("");
  const [savedConversationId, setSavedConversationId] = useState<string | null>(
    null
  );
  const [isConversationSaved, setIsConversationSaved] = useState(false);
  const router = useRouter();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  async function fetchConversationById(conversationId: string) {
    try {
      const response = await fetch(
        `/api/ai/recommendations/find/${conversationId}`
      );
      const data = await response.json();

      if (response.ok) {
        setChatMessages(data.messages);
      } else {
        console.error("Error fetching conversation:", data.error);
        setChatMessages([
          {
            role: "ai",
            messageContent:
              "Sorry, this conversation doesn't exist or couldn't be loaded.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      setChatMessages([
        {
          role: "ai",
          messageContent:
            "An error occurred while trying to load the conversation.",
        },
      ]);
    }
  }

  async function saveConversation(
    conversation: ChatMessage[],
    conversationId?: string
  ) {
    try {
      const response = await fetch("/api/ai/recommendations/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation, conversationId, replace: true }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Conversation saved/updated with ID:", data.conversationId);
        return data.conversationId;
      } else {
        console.error("Error saving/updating conversation:", data.error);
      }
    } catch (error) {
      console.error("Error saving/updating conversation:", error);
    }
  }

  const handleSend = async () => {
    if (chatInputText.trim() === "") return;

    const userMessage: ChatMessage = {
      role: "user",
      messageContent: chatInputText,
    };

    setChatMessages((prevMessages) => [...prevMessages, userMessage]);
    setChatInputText("");
    setChatLoading(true);

    try {
      const response = await AskAIChat({
        user_id: user_id || "",
        workspace_id: "",
        message: chatInputText,
      });
      console.log(response);
      // Add empty AI message that will be updated with streaming content
      setChatMessages((prev) => [...prev, { role: "ai", messageContent: "" }]);

      let aiResponse = "";
      for await (const part of response) {
        aiResponse += part;
        setChatMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].messageContent = aiResponse;
          return updated;
        });
      }

      const newConversation: any = [
        ...chatMessages,
        userMessage,
        { role: "ai", messageContent: aiResponse },
      ];
      // const updatedConversationId = await saveConversation(
      //   newConversation,
      //   savedConversationId || conversationId
      // );
      // setSavedConversationId(updatedConversationId);
      // setIsConversationSaved(true);
      setChatLoading(false);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: ChatMessage = {
        role: "ai",
        messageContent: "Sorry, I couldn't process your request.",
      };
      setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
      setChatLoading(false);
    }
  };

  const addInitialMessageIfNeeded = () => {
    if (chatMessages.length === 0 && mode === "chat") {
      setChatMessages([
        { role: "ai", messageContent: "Ask me to retrieve your knowledge" },
      ]);
    }
  };
  const handleGetNoteSource = async (note_id: string) => {
    if (!user_id) return;
    try {
      const note = await getNotebyId(user_id, note_id);
      setDialogSourceContent({ ...note, type: "note" });
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  const handleGetDocumentSource = async (document_id: string) => {
    if (!user_id) return;
    try {
      const document = await getDocumentById(document_id);
      setDocumentViewerContent(document);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    console.log(href);
    if (href && href.startsWith("#note-")) {
      event.preventDefault();
      const targetId = href.replace("#note-", ""); // Extract the UUID
      handleGetNoteSource(targetId); // Call your function
    } else if (href && href.startsWith("#document-")) {
      event.preventDefault();
      const targetId = href.replace("#document-", ""); // Extract the UUID
      handleGetDocumentSource(targetId); // Call your function
    }
  };
  useEffect(() => {
    if (mode === "view" && conversationId) {
      fetchConversationById(conversationId);
    } else if (mode === "chat") {
      if (!savedConversationId) {
        addInitialMessageIfNeeded();
      } else {
        fetchConversationById(savedConversationId);
      }
    }
  }, [mode, conversationId, savedConversationId]);

  useEffect(() => {
    const scrollToBottom = () => {
      const content = document.querySelector(".chat-content");
      if (content) {
        content.scrollTop = content.scrollHeight;
      }
    };

    // Scroll on new messages
    scrollToBottom();

    // Also scroll after a short delay to handle dynamic content updates
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [chatMessages, chatLoading]);

  return (
    <Card className="w-full mx-auto h-[calc(100vh-6rem)] flex flex-col bg-background border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-primary">Forge AI</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 chat-content">
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            {chatMessages.map((message, index) => (
              <div key={`message-${index}`}>
                <div
                  className={`flex ${
                    message.role === "ai" ? "justify-start" : "justify-end"
                  } mb-4`}
                >
                  <div
                    className={`flex ${
                      message.role === "ai" ? "flex-row" : "flex-row-reverse"
                    } items-start max-w-[80%] gap-2`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        src={
                          message.role === "ai"
                            ? "https://img.icons8.com/fluency/48/000000/bot.png"
                            : "https://img.icons8.com/fluency/48/000000/user-male-circle.png"
                        }
                      />
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg relative bg-primary  ${
                        message.role === "ai"
                          ? "bg-muted/50 text-foreground prose prose-a:text-blue-500 prose-headings:text-white prose-strong:text-white text-white"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              onClick={(e) => handleLinkClick(e)}
                              className="text-blue-500 underline"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.messageContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
                {chatLoading &&
                  index === chatMessages.length - 1 &&
                  message.role === "user" && (
                    <div className="flex justify-start mt-2">
                      <div className="rounded-lg px-4 py-2 bg-muted/50 border border-border">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 bg-muted/50 border border-border">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={chatInputText}
          onChange={(e) => setChatInputText(e.target.value)}
          disabled={chatLoading}
          className="bg-muted/50 border-border"
          onKeyPress={(e) => {
            if (
              e.key === "Enter" &&
              !chatLoading &&
              chatInputText.trim() !== ""
            ) {
              handleSend();
            }
          }}
        />
        <Button
          variant="secondary"
          disabled={chatLoading || chatInputText === ""}
          onClick={handleSend}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </CardFooter>
      {dialogSourceContent?.type === "note" ? (
        <Dialog open={true}>
          <DialogContent className="max-w-xl min-h-[50%]">
            <DialogHeader>
              <DialogTitle>From Note: {dialogSourceContent.title}</DialogTitle>
              <DialogDescription>
                {dialogSourceContent.subjects
                  ? `From Subject: ${dialogSourceContent.subjects.name}`
                  : null}
              </DialogDescription>
            </DialogHeader>
            <Textarea
              className="h-full flex"
              value={dialogSourceContent.content}
              disabled
            />
            <DialogFooter className="mt-auto max-h-min">
              <Button
                onClick={() => {
                  setDialogSourceContent(null);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
      {documentViewerContent ? (
        <DocumentViewer
          fileName={documentViewerContent.file_name}
          fileType={
            mime.lookup(documentViewerContent.file_name) ||
            "application/octet-stream"
          }
          onClose={() => setDocumentViewerContent(null)}
        />
      ) : null}
    </Card>
  );
}
