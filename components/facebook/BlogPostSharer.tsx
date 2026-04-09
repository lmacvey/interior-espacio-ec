"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

interface Props {
  posts: PostMeta[];
  onPrefill: (message: string, link: string) => void;
}

export function BlogPostSharer({ posts, onPrefill }: Props) {
  const [shared, setShared] = useState<Set<string>>(new Set());

  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No hay artículos todavía.
      </p>
    );
  }

  return (
    <ul className="divide-y">
      {posts.map((post) => {
        const postUrl = `${SITE_URL}/blog/${post.slug}`;
        const prefillMessage = `${post.title}\n\n${post.excerpt}\n\n${postUrl}`;
        const isShared = shared.has(post.slug);

        return (
          <li
            key={post.slug}
            className="py-4 flex items-start justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">{post.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {post.date
                  ? new Date(post.date).toLocaleDateString("es-EC", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Sin fecha"}{" "}
                {!post.published && (
                  <span className="ml-1 text-amber-600">(borrador)</span>
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onPrefill(prefillMessage, postUrl);
                setShared((prev) => new Set(prev).add(post.slug));
              }}
              className="shrink-0 text-sm border rounded-md px-3 py-1.5 hover:bg-muted transition-colors"
            >
              {isShared ? "Rellenar de nuevo" : "Compartir en Facebook"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
