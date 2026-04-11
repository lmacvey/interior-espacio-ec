import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getUnifiedPosts } from "@/lib/blog-unified";
import { PinterestBoardEmbed } from "@/components/blog/PinterestBoardEmbed";
import { SubstackSubscribeWidget } from "@/components/blog/SubstackSubscribeWidget";
import { SOCIAL_LINKS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Recursos y reflexiones sobre salud mental, transiciones de vida y bienestar emocional. Por Grace P. Pacheco, Psicóloga Clínica.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default async function BlogPage() {
  const posts = await getUnifiedPosts();

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => {
            const href = post.url ?? `/blog/${post.slug}`;
            const isExternal = post.source === "substack";

            return (
              <a
                key={post.url ?? post.slug}
                href={href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex flex-col rounded-[--radius-xl] border border-border bg-background overflow-hidden hover:shadow-[var(--shadow-md)] transition-shadow duration-200"
              >
                {/* Cover image */}
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
                      <span className="text-primary opacity-30 text-5xl font-display italic">
                        ei
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <time className="text-xs text-text-muted">
                    {post.date
                      ? new Date(post.date).toLocaleDateString("es-EC", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </time>

                  <h2 className="font-display text-xl leading-snug text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-150">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-sm text-text-secondary line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  <span className="mt-auto pt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Leer artículo
                    <ArrowUpRight size={14} className="opacity-70" />
                  </span>
                </div>
              </a>
            );
          })}
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
          fallback={
            <div className="h-[500px] rounded-xl bg-surface-2 animate-pulse" />
          }
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
