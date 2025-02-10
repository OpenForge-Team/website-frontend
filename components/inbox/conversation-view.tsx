"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CustomButton } from "@/components/ui/custom-button"
import { Archive } from "lucide-react"
import type { Conversation } from "@/lib/types"
import { MessageInput } from "@/components/inbox/message-input"
import { ProfileSheet } from "@/components/profile-sheet"

interface ConversationViewProps {
  conversation: Conversation
}

export function ConversationView({ conversation }: ConversationViewProps) {
  const [scheduledCount, setScheduledCount] = useState(2)

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-soft flex justify-between items-center">
        <h2 className="font-semibold text-primary">{conversation.sender}</h2>
        <div className="flex items-center space-x-2">
          <CustomButton variant="secondary" size="sm" className="chat-font">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </CustomButton>
          <ProfileSheet conversation={conversation} />
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 chat-font">
          <div className="bg-gray-100 rounded-soft p-3 max-w-[70%]">
            <p className="text-primary">{conversation.lastMessage}</p>
            <span className="text-xs mt-1 block text-primary">{conversation.time}</span>
          </div>
          <div className="border-b border-gray-200 my-4"></div>
          {/* Add more message bubbles here if needed */}
        </div>
      </ScrollArea>
      <MessageInput scheduledCount={scheduledCount} />
    </div>
  )
}

