"use client"

import { useState, useRef, useEffect } from "react"
import { CustomButton } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import {
  Paperclip,
  Smile,
  Send,
  Mail,
  Phone,
  Video,
  MessageSquare,
  Clock,
  FileText,
  MapPin,
  UserPlus,
  Globe,
} from "lucide-react"
import type React from "react"

const communicationChannels = [
  { icon: Mail, label: "Email" },
  { icon: Phone, label: "Phone" },
  { icon: Video, label: "Video Call" },
  { icon: MessageSquare, label: "Chat" },
]

const commandItems = [
  { icon: FileText, label: "Insert template", color: "text-blue-500" },
  { icon: MapPin, label: "Share location", color: "text-green-500" },
  { icon: UserPlus, label: "Add team member", color: "text-purple-500" },
  { icon: Globe, label: "Translate message", color: "text-cyan-500" },
]

interface MessageInputProps {
  scheduledCount: number
}

export function MessageInput({ scheduledCount }: MessageInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [showCommandMenu, setShowCommandMenu] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const commandMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandMenuRef.current &&
        !commandMenuRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowCommandMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value.startsWith("/")) {
      setShowCommandMenu(true)
    } else {
      setShowCommandMenu(false)
    }
  }

  const handleCommandClick = (command: { label: string }) => {
    setInputValue(command.label)
    setShowCommandMenu(false)
    inputRef.current?.focus()
  }

  return (
    <div className="p-4 border-t border-soft chat-font">
      <div className="flex items-center space-x-2 mb-2 relative">
        <Input
          ref={inputRef}
          placeholder="Type your message..."
          className="flex-1 text-primary placeholder:text-primary/60 bg-white"
          value={inputValue}
          onChange={handleInputChange}
        />
        <CustomButton variant="secondary" size="icon" className="chat-font">
          <Paperclip className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="secondary" size="icon" className="chat-font">
          <Smile className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="secondary" size="icon" className="chat-font">
          <Send className="h-4 w-4" />
        </CustomButton>
        {showCommandMenu && (
          <div
            ref={commandMenuRef}
            className="absolute bottom-full left-0 w-full border border-soft rounded-soft shadow-lg p-2 space-y-1 bg-white"
          >
            {commandItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer"
                onClick={() => handleCommandClick(item)}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="text-primary">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-2 pt-2 border-t">
        <div className="flex space-x-2">
          {communicationChannels.map((item, index) => (
            <CustomButton variant="secondary" key={index} size="icon" className="w-8 h-8 chat-font">
              <item.icon className={`h-4 w-4`} />
            </CustomButton>
          ))}
        </div>
        <div className="flex space-x-2">
          <CustomButton variant="secondary" size="sm" className="chat-font">
            ForgeAI
          </CustomButton>
          <CustomButton variant="secondary" size="sm" className="chat-font">
            <Clock className="h-4 w-4 mr-1" />
            Schedule
          </CustomButton>
          <CustomButton variant="secondary" size="sm" className="chat-font">
            Scheduled
            <span className="ml-1 rounded-full px-1.5 py-0.5 text-xs">{scheduledCount}</span>
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

