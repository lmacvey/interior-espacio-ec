"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { PostCard, FeaturedCard } from "@/components/blog/PostCards";

interface PostSearchProps {
  posts: PostMeta[];
}

export function PostSearch({ posts }: PostSearchProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags that appear across the post set
  const allTags = useMemo(() => {
    const seen = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags ?? []) seen.add(tag);
    }
    return Array.from(seen).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesTag = activeTag ? post.tags?.includes(activeTag) : true;
      if (!matchesTag) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        (post.excerpt ?? "").toLowerCase().includes(q) ||
        (post.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, query, activeTag]);

  const [featured, ...rest] = filtered;
  const isFiltering = query.trim() !== "" || activeTag !== null;

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artículos…"
          className="w-full pl-10 pr-4 py-2.5 rounded-[--radius-lg] border border-border bg-background text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Tag filter chips — only shown when tags exist */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors duration-150 ${
                activeTag === tag
                  ? "bg-primary text-white border-primary"
                  : "bg-background text-text-secondary border-border hover:border-primary hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-text-muted">
            No se encontraron artículos{activeTag ? ` con la etiqueta "${activeTag}"` : ""}.
          </p>
          {isFiltering && (
            <button
              onClick={() => { setQuery(""); setActiveTag(null); }}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Ver todos los artículos
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Hero card for first result */}
          <FeaturedCard post={featured} />

          {/* Grid for remaining results */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((post) => (
                <PostCard key={post.url ?? post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
