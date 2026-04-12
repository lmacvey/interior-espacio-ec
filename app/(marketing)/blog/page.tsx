import type { Metadata } from "next";
import { Suspense } from "react";
import { getUnifiedPosts } from "@/lib/blog-unified";
import { PinterestBoardEmbed } from "@/components/blog/PinterestBoardEmbed";
import { SubstackSubscribeWidget } from "@/components/blog/SubstackSubscribeWidget";
import { PostSearch } from "@/components/blog/PostSearch";
import { SOCIAL_LINKS, SITE_NAME, SITE_URL } from "@/lib/constants";

// Dynamic metadata — updates automatically as new Substack posts are published.
// Next.js deduplicates the getUnifiedPosts() fetch with the page component's call.
export async function generateMetadata(): Promise<Metadata> {
  const posts = await getUnifiedPosts();
  const latest = posts[0];

  const description = latest
    ? `Último artículo: "${latest.title}". Reflexiones sobre salud mental, transiciones de vida y bienestar emocional. Por Grace P. Pacheco, Psicóloga Clínica.`
    : "Recursos y reflexiones sobre salud mental, transiciones de vida y bienestar emocional. Por Grace P. Pacheco, Psicóloga Clínica.";

  return {
    title: "Blog",
    description,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/blog`,
      title: `Blog | ${SITE_NAME}`,
      description,
      ...(latest?.imageUrl
        ? { images: [{ url: latest.imageUrl, width: 1200, height: 630, alt: latest.title }] }
        : {}),
    },
  };
}

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
        <PostSearch posts={posts} />
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
