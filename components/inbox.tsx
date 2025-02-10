"use client"

import { useState } from "react"
import { ConversationList } from "@/components/inbox/conversation-list"
import { ConversationView } from "@/components/inbox/conversation-view"
import type { Conversation } from "@/lib/types"


// mock data

export const conversations: Conversation[] = [
  {
    id: "1",
    sender: "John Doe",
    time: "10:30 AM",
    lastMessage: "Hey, how are you doing?",
    label: "Personal",
    unread: true,
  },
  {
    id: "2",
    sender: "Jane Smith",
    time: "Yesterday",
    lastMessage: "Can we schedule a meeting for next week?",
    label: "Work",
    unread: false,
  },
    {
    id: "3",
    sender: "Jane Smith",
    time: "Yesterday",
    lastMessage: "Can we schedule a meeting for next week?",
    label: "Work",
    unread: false,
  },
    {
    id: "4",
    sender: "Jane Smith",
    time: "Yesterday",
    lastMessage: "Can we schedule a meeting for next week?",
    label: "Work",
    unread: false,
  },
    {
    id: "69",
    sender: "Jane Smith",
    time: "Yesterday",
    lastMessage: "Can we schedule a meeting for next week?",
    label: "Work",
    unread: false,
  },
    {
    id: "5",
    sender: "Jane Smith",
    time: "Yesterday",
    lastMessage: "Can we schedule a meeting for next week?",
    label: "Work",
    unread: false,
  },
    {
    id: "6",
    sender: "Jane Smith",
    time: "Yesterday",
    lastMessage: "Can we schedule a meeting for next week?",
    label: "Work",
    unread: false,
  },
    {
    id: "7",
    sender: "Jane Smith",
    time: "Yesterday",
    lastMessage: "Can we schedule a meeting for next week?",
    label: "Work",
    unread: false,
  },
    {
    id: "8",
    sender: "Jane Smith",
    time: "Yesterday",
    lastMessage: "Can we schedule a meeting for next week?",
    label: "Work",
    unread: false,
  },

  // Add more sample conversations here as needed
]



export function Inbox() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])

  return (
    <div className="flex flex-col h-full bg-white">
      <h1 className="text-2xl font-bold p-4 text-primary">Business Inbox</h1>
      <div className="flex flex-1">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
        <ConversationView conversation={selectedConversation} />
      </div>
    </div>
  )
}

