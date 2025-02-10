"use client"

import { useState } from "react"
import { CustomButton } from "@/components/ui/custom-button"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { User } from "lucide-react"
import type { Conversation } from "@/lib/types"

const profileBlocks = [
  { command: "/contact", label: "Contact Information" },
  { command: "/company", label: "Company Details" },
  { command: "/notes", label: "Meeting Notes" },
]

interface ProfileSheetProps {
  conversation: Conversation
}

export function ProfileSheet({ conversation }: ProfileSheetProps) {
  const [profileNotes, setProfileNotes] = useState("")

  const handleProfileNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setProfileNotes(value)
  }

  const insertProfileBlock = (block: { label: string }) => {
    setProfileNotes((prevNotes) => prevNotes + `\n\n## ${block.label}\n\n`)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <CustomButton variant="secondary" size="icon" className="chat-font">
          <User className="h-4 w-4" />
        </CustomButton>
      </SheetTrigger>
      <SheetContent className="border-l border-soft">
        <SheetHeader>
          <SheetTitle className="text-primary">Contact Profile: {conversation.sender}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4 chat-font">
          <Textarea
            placeholder="Add notes or use / commands to insert information blocks..."
            value={profileNotes}
            onChange={handleProfileNotesChange}
            className="min-h-[300px] text-primary placeholder:text-primary/60 bg-white"
          />
          <div className="flex flex-wrap gap-2">
            {profileBlocks.map((block) => (
              <CustomButton
                key={block.command}
                variant="secondary"
                size="sm"
                className="text-primary chat-font"
                onClick={() => insertProfileBlock(block)}
              >
                {block.label}
              </CustomButton>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
