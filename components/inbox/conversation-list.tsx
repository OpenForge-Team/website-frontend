"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CustomButton } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Users } from "lucide-react"
import type { Conversation } from "@/lib/types"

// Groups
const conversationFilters = [
  { value: "owners", label: "Clients", count: 2 },
  { value: "guests", label: "Projects", count: 1 },
  { value: "cleaners", label: "Internal", count: 1 },
  { value: "investors", label: "All", count: 0 },
]

const MAX_VISIBLE_CHATS = 5

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversation: Conversation
  onSelectConversation: (conversation: Conversation) => void
}

export function ConversationList({ conversations, selectedConversation, onSelectConversation }: ConversationListProps) {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [filteredConversations, setFilteredConversations] = useState(conversations)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
    if (filter === "all") {
      setFilteredConversations(conversations)
    } else {
      setFilteredConversations(conversations.filter((c) => c.label.toLowerCase() === filter))
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current && filteredConversations.length > MAX_VISIBLE_CHATS) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [filteredConversations])

  return (
    <div className="w-80 border-r border-soft flex flex-col">
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {conversationFilters.map((filter) => (
            <CustomButton
              key={filter.value}
              variant={selectedFilter === filter.value ? "default" : "secondary"}
              size="sm"
              onClick={() => handleFilterChange(filter.value)}
              className="flex items-center chat-font"
            >
              {filter.label}
              {filter.count > 0 && <span className="ml-1 rounded-full px-1.5 py-0.5 text-xs">{filter.count}</span>}
            </CustomButton>
          ))}
        </div>
        <div className="flex items-center mt-4">
          <Search className="h-4 w-4 absolute ml-2" />
          <Input
            placeholder="Search contacts..."
            className="pl-8 text-primary placeholder:text-primary/60 bg-white chat-font"
          />
        </div>
        <CustomButton variant="secondary" className="w-full mt-4 chat-font" size="sm">
          <Users className="h-4 w-4 mr-2" />
          Create Contact Group
        </CustomButton>
      </div>

      <ScrollArea className="flex-1" ref={scrollAreaRef} style={{ height: `${MAX_VISIBLE_CHATS * 100}px` }}>
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "p-4 border-b border-soft cursor-pointer text-primary chat-font rounded-soft",
              conversation.unread && "font-semibold",
              selectedConversation.id === conversation.id && "border-l-2 border-l-primary",
            )}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-primary">{conversation.sender}</span>
              <span className="text-xs text-primary">{conversation.time}</span>
            </div>
            <p className="text-sm line-clamp-2 text-primary">{conversation.lastMessage}</p>
            <div className="flex justify-end items-center mt-2">
              <span className="text-xs rounded-full px-2 py-1 text-primary">{conversation.label}</span>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

