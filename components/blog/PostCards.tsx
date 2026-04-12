import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: PostMeta }) {
  const href = post.url ?? `/blog/${post.slug}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[--radius-xl] border border-border bg-background overflow-hidden hover:shadow-[var(--shadow-md)] transition-shadow duration-200"
    >
      <div className="aspect-video w-full overflow-hidden bg-primary-muted">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={640}
            height={360}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary opacity-30 text-5xl font-display italic">ei</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6 gap-3">
        {post.date && (
          <time className="text-xs text-text-muted">{formatDate(post.date)}</time>
        )}
        <h2 className="font-display text-xl leading-snug text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-150">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-text-secondary line-clamp-3 flex-1">{post.excerpt}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-primary-muted text-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="mt-auto pt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Leer artículo <ArrowUpRight size={14} className="opacity-70" />
        </span>
      </div>
    </a>
  );
}

export function FeaturedCard({ post }: { post: PostMeta }) {
  const href = post.url ?? `/blog/${post.slug}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col md:flex-row rounded-[--radius-xl] border border-border bg-background overflow-hidden hover:shadow-[var(--shadow-lg)] transition-shadow duration-200"
    >
      {/* Image — full width on mobile, 55% on desktop */}
      <div className="w-full md:w-[55%] aspect-video md:aspect-auto overflow-hidden bg-primary-muted shrink-0">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={900}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary opacity-30 text-7xl font-display italic">ei</span>
          </div>
        )}
      </div>

      {/* Content — right side on desktop */}
      <div className="flex flex-col justify-center flex-1 p-8 md:p-10 gap-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Último artículo
        </span>
        {post.date && (
          <time className="text-xs text-text-muted">{formatDate(post.date)}</time>
        )}
        <h2 className="font-display text-2xl md:text-3xl leading-snug text-text-primary group-hover:text-primary transition-colors duration-150">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-base text-text-secondary line-clamp-4">{post.excerpt}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-primary-muted text-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Leer artículo <ArrowUpRight size={15} className="opacity-70" />
        </span>
      </div>
    </a>
  );
}
