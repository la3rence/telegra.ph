"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Editor } from "@/components/editor";
import { saveArticle } from "@/lib/article-service";

export default function EditorPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title to your article before publishing.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Your article needs some content before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);

    try {
      const slug = await saveArticle({
        title,
        author: author || "Anonymous",
        content,
      });

      // Redirect to the published article
      router.push(`/${slug}`);
    } catch (error) {
      console.error("Failed to publish:", error);
      toast({
        title: "Publishing failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error publishing your article. Please try again.",
        variant: "destructive",
      });
      setIsPublishing(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Title"
            className="text-3xl font-bold border-none px-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center gap-2 ">
            <Button variant="outline" onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>

        <Input
          type="text"
          placeholder="Your name"
          className="border-none px-2 w-1/2 h-4 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <Editor
          value={content}
          onChange={setContent}
          placeholder="Your story..."
        />
      </div>
    </div>
  );
}
