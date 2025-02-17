"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { getUser } from "@/utils/queries";
import { addSubject, getSubjects } from "@/utils/supabase/subjects";
import { uploadDocument } from "@/utils/supabase/documents";
import { DocumentList } from "@/components/document-list";
import { DocumentUploader } from "@/components/document-uploader";
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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/providers/workspace-provider";

const formSchema = z.object({
  subject: z.string({
    required_error: "Please select a subject",
  }),
  files: z.array(z.instanceof(File)).min(1, "At least one file is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function DocumentPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [subjects, setSubjects] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();
  const { activeWorkspace } = useWorkspace();
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

  useEffect(() => {
    const fetchsubjects = async () => {
      if (!user) return;
      try {
        const subjects = await getSubjects(user.id);
        setSubjects(
          subjects.map((subject) => ({
            value: subject.id,
            label: subject.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch subjects. Please try again.",
        });
      }
    };
    fetchsubjects();
  }, [user, toast]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      files: [],
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to upload documents",
      });
      return;
    }

    try {
      const uploadPromises = data.files.map((file) =>
        uploadDocument({
          user_id: user.id,
          subject_id: data.subject,
          file: file,
        })
      );

      await Promise.all(uploadPromises);

      toast({
        title: "Success",
        description: `${data.files.length} document(s) uploaded successfully`,
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload documents. Please try again.",
      });
      console.error("Failed to upload documents:", error);
    }
  }

  return (
    <div className="mx-auto p-6">
      <h1 className="text-primary text-2xl font-bold mb-6">
        Document Management
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 grid-rows-1 gap-20">
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
                                    s.label.toLowerCase() ===
                                    input.toLowerCase()
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
                                  console.error(
                                    "Failed to add subject:",
                                    error
                                  );
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
                            {subjects.map((subject) => (
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
            <Button className="my-auto ml-auto max-w-min" type="submit">
              Upload Documents
            </Button>
          </div>

          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documents</FormLabel>
                <FormControl>
                  <DocumentUploader
                    onFilesSelected={(files) => form.setValue("files", files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-8">
        <h2 className="text-primary text-xl font-semibold mb-4">
          Your Documents
        </h2>
        <DocumentList userId={user?.id} />
      </div>
    </div>
  );
}
