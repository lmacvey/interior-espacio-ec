import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getUnifiedPosts } from "@/lib/blog-unified";
import { PinterestBoardEmbed } from "@/components/blog/PinterestBoardEmbed";
import { SubstackSubscribeWidget } from "@/components/blog/SubstackSubscribeWidget";
import { SOCIAL_LINKS, SITE_URL } from "@/lib/constants";
import type { PostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Recursos y reflexiones sobre salud mental, transiciones de vida y bienestar emocional. Por Espacio Interior EC.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post }: { post: PostMeta }) {
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
        <span className="mt-auto pt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Leer artículo <ArrowUpRight size={14} className="opacity-70" />
        </span>
      </div>
    </a>
  );
}

function FeaturedCard({ post }: { post: PostMeta }) {
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
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Leer artículo <ArrowUpRight size={15} className="opacity-70" />
        </span>
      </div>
    </a>
  );
}

export default async function BlogPage() {
  const posts = await getUnifiedPosts();
  const [featured, ...rest] = posts;

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl mb-4">Recursos y artículos</h1>
      <p className="text-text-secondary mb-12 text-lg max-w-xl">
        Reflexiones sobre bienestar emocional, transiciones y vida cotidiana.
      </p>

      {posts.length === 0 ? (
        <div className="py-16 text-center max-w-md mx-auto">
          <p className="text-text-muted text-lg mb-10">
            Los artículos estarán disponibles pronto.
          </p>
          <SubstackSubscribeWidget variant="blog-page" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Most recent — hero */}
          <FeaturedCard post={featured} />

          {/* Older posts — 2-column grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((post) => (
                <PostCard key={post.url ?? post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-16 pt-12 border-t border-border">
        <SubstackSubscribeWidget variant="blog-page" />
      </div>

      <div className="mt-16 pt-12 border-t border-border">
        <h2 className="text-2xl font-semibold mb-2 text-text-primary">
          Síguenos en Pinterest
        </h2>
        <p className="text-text-muted mb-6 text-sm">
          Recursos, reflexiones y bienestar emocional.
        </p>
        <Suspense
          fallback={<div className="h-[500px] rounded-xl bg-surface-2 animate-pulse" />}
        >
          <PinterestBoardEmbed
            boardUrl={`${SOCIAL_LINKS.pinterest}/recursos/`}
            width={380}
            height={500}
          />
        </Suspense>
      </div>
    </section>
  );
}
