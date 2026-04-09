"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/blog";
import { PostComposer } from "./PostComposer";
import { BlogPostSharer } from "./BlogPostSharer";

type Tab = "compose" | "blog";

interface Props {
  posts: PostMeta[];
}

export function AdminFacebookTabs({ posts }: Props) {
  const [tab, setTab] = useState<Tab>("compose");
  const [prefillMessage, setPrefillMessage] = useState("");
  const [prefillLink, setPrefillLink] = useState("");

  function handlePrefill(message: string, link: string) {
    setPrefillMessage(message);
    setPrefillLink(link);
    setTab("compose");
    // Scroll to top of composer
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1 border-b">
        {(["compose", "blog"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "compose" ? "Nueva publicación" : "Compartir artículo"}
          </button>
        ))}
      </div>

      {/* Panels */}
      {tab === "compose" && (
        <PostComposer
          defaultMessage={prefillMessage}
          defaultLink={prefillLink}
        />
      )}
      {tab === "blog" && (
        <BlogPostSharer posts={posts} onPrefill={handlePrefill} />
      )}
    </div>
  );
}
