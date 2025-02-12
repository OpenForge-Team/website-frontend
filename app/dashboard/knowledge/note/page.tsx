"use client";
import { useToast } from "@/components/hooks/use-toast";
import { useWorkspace } from "@/providers/workspace-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VoiceRecorder } from "@/components/voice-recorder";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/utils/queries";
import { getSubjects, addSubject } from "@/utils/supabase/subjects";
import { addNote } from "@/utils/supabase/notes";

export default function NotePage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUserCall = async () => {
      const user = await getUser(supabase);
      if (user) {
        setUser(user);
      } else {
        console.log("User not authenticated");
      }
    };
    getUserCall();
  }, [supabase]);

  const [subjects, setSubjects] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user) return;

      const subjects = await getSubjects(user.id);
      setSubjects(
        subjects.map((subject) => ({
          value: subject.id,
          label: subject.name,
        }))
      );
    };
    fetchSubjects();
  }, [user]);

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const formSchema = z.object({
    subject: z.string({
      required_error: "Please select a subject",
    }),
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be less than 255 characters"),
    content: z
      .string()
      .min(1, "Content is required")
      .max(10000, "Content must be less than 10000 characters"),
    audioBuffer: z.instanceof(Blob).optional(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      title: "",
      content: "",
    },
  });

  const { toast } = useToast();
  const { activeWorkspace } = useWorkspace();
  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to create notes",
      });
      return;
    }

    if (!activeWorkspace) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No active workspace selected",
      });
      return;
    }

    try {
      const audioBuffer = form.getValues("audioBuffer");
      const newNoteId = await addNote({
        user_id: user.id,
        title: data.title,
        content: data.content,
        workspace_id: activeWorkspace.id,
        subject_id: data.subject,
        audioBuffer: audioBuffer,
      });
      toast({
        title: "Success",
        description: "Note created successfully",
      });

      // Reset form
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create note. Please try again.",
      });
      console.error("Failed to create note:", error);
    }
  }

  return (
    <div className="mx-auto p-6">
      <h1 className="text-primary text-2xl font-bold mb-6">Create New Note</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Subject</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value
                            ? "text-muted-foreground"
                            : "text-secondary" // Add this line
                        )}
                      >
                        {field.value
                          ? subjects.find(
                              (subject) => subject.value === field.value
                            )?.label
                          : "Select subject"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search subject or add new..."
                        className="h-9"
                        value={searchValue}
                        onValueChange={setSearchValue}
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            const input = e.currentTarget.value;
                            if (
                              !subjects.find(
                                (s) =>
                                  s.label.toLowerCase() === input.toLowerCase()
                              )
                            ) {
                              try {
                                if (!user)
                                  throw new Error("User not authenticated");
                                if (!activeWorkspace)
                                  throw new Error("Workspace not defined");
                                const newSubjects = await addSubject({
                                  user_id: user.id,
                                  name: input,
                                  workspace_id: activeWorkspace.id,
                                });
                                const value = newSubjects.id;
                                setSubjects([
                                  ...subjects,
                                  { value, label: input },
                                ]);
                                form.setValue("subject", value);
                                setOpen(false);
                                setSearchValue("");
                              } catch (error) {
                                console.error("Failed to add subject:", error);
                              }
                            }
                          }
                        }}
                      />
                      <CommandList>
                        <CommandEmpty className="px-2">
                          No subject found. Press Enter to add.
                        </CommandEmpty>
                        <CommandGroup>
                          {subjects.map((subject: any) => (
                            <CommandItem
                              key={subject.value}
                              value={subject.value}
                              onSelect={() => {
                                form.setValue("subject", subject.value);
                                setOpen(false);
                              }}
                            >
                              {subject.label}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  subject.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Note title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="text"
                className={cn(
                  "data-[state=active]:bg-background data-[state=active]:text-secondary"
                )}
              >
                Text Note
              </TabsTrigger>
              <TabsTrigger
                value="voice"
                className={cn(
                  "data-[state=active]:bg-background data-[state=active]:text-secondary"
                )}
              >
                Voice Note
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your note here..."
                        className="min-h-[200px] text-secondary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="voice">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice Input</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <VoiceRecorder
                          onTranscriptionComplete={(text, audioBuffer) => {
                            const currentContent = field.value;
                            field.onChange(
                              currentContent +
                                (currentContent ? " " : "") +
                                text
                            );
                            if (audioBuffer) {
                              form.setValue("audioBuffer", audioBuffer);
                            }
                          }}
                          allowRetry={true}
                        />
                        <Textarea
                          placeholder="Transcribed text will appear here..."
                          className="min-h-[100px] text-secondary"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          <Button type="submit">Save Note</Button>
        </form>
      </Form>
    </div>
  );
}
