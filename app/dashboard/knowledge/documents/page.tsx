"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { getUser } from "@/utils/queries";
import { getSubjects } from "@/utils/supabase/subjects";
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
  const [categories, setCategories] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

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
    const fetchCategories = async () => {
      if (!user) return;
      try {
        const subjects = await getSubjects(user.id);
        setCategories(
          subjects.map((subject) => ({
            value: subject.id,
            label: subject.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch categories. Please try again.",
        });
      }
    };
    fetchCategories();
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
      <h1 className="text-2xl font-bold mb-6">Document Management</h1>

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
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.value === field.value
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
                      />
                      <CommandList>
                        <CommandEmpty className="px-2">
                          No subject found. Press Enter to add.
                        </CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              key={category.value}
                              value={category.value}
                              onSelect={() => {
                                form.setValue("subject", category.value);
                                setOpen(false);
                              }}
                            >
                              {category.label}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  category.value === field.value
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

          <Button type="submit">Upload Documents</Button>
        </form>
      </Form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
        <DocumentList userId={user?.id} />
      </div>
    </div>
  );
}
