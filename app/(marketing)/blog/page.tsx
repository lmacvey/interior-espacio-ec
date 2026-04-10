import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
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
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl mb-12">Recursos y artículos</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-lg">Próximamente.</p>
      ) : (
        <ul className="space-y-10">
          {posts.map((post) => {
            const isSubstack = post.source === "substack";
            const href = isSubstack ? post.url! : `/blog/${post.slug}`;

            return (
              <li key={isSubstack ? post.url : post.slug} className="border-b pb-10 last:border-0">
                <div className="flex items-center gap-2">
                  <time className="text-sm text-muted-foreground">
                    {post.date
                      ? new Date(post.date).toLocaleDateString("es-EC", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </time>
                  {isSubstack && (
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: "#b0706020", color: "#b07060" }}>
                      Substack
                    </span>
                  )}
                </div>
                <h2 className="text-2xl mt-1 mb-2">
                  {isSubstack ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-4 inline-flex items-center gap-1.5"
                    >
                      {post.title}
                      <ExternalLink size={16} className="shrink-0 opacity-50" />
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="hover:underline underline-offset-4"
                    >
                      {post.title}
                    </Link>
                  )}
                </h2>
                {post.excerpt && (
                  <p className="text-muted-foreground">{post.excerpt}</p>
                )}
                {isSubstack ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm font-medium hover:underline underline-offset-4"
                  >
                    Leer artículo →
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="inline-block mt-4 text-sm font-medium hover:underline underline-offset-4"
                  >
                    Leer artículo →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
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
