import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { PinterestBoardEmbed } from "@/components/blog/PinterestBoardEmbed";
import { SOCIAL_LINKS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Recursos y reflexiones sobre salud mental, transiciones de vida y bienestar emocional. Por Grace P. Pacheco, Psicóloga Clínica.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl mb-12">Recursos y artículos</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-lg">Próximamente.</p>
      ) : (
        <ul className="space-y-10">
          {posts.map((post) => (
            <li key={post.slug} className="border-b pb-10 last:border-0">
              <time className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("es-EC", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="text-2xl mt-1 mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline underline-offset-4"
                >
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="text-muted-foreground">{post.excerpt}</p>
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-4 text-sm font-medium hover:underline underline-offset-4"
              >
                Leer artículo →
              </Link>
            </li>
          ))}
        </ul>
      )}
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
