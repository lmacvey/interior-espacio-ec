import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { PinterestSaveButton } from "@/components/blog/PinterestSaveButton";
import { FacebookShareButton } from "@/components/facebook/ShareButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.meta.title ?? slug.replace(/-/g, " ");
  const pageUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = `${SITE_URL}/opengraph-image`;

  return {
    title,
    description: post?.meta.excerpt ?? "",
    openGraph: {
      type: "article",
      url: pageUrl,
      title: `${title} | ${SITE_NAME}`,
      description: post?.meta.excerpt ?? "",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      publishedTime: post?.meta.date
        ? new Date(post.meta.date).toISOString()
        : new Date().toISOString(),
      authors: [SITE_URL],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const processed = await remark().use(remarkHtml).process(post.content);
  const html = processed.toString();

  const pageUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = `${SITE_URL}/opengraph-image`;

  return (
    <article className="py-24 px-6 max-w-3xl mx-auto prose">
      <header className="not-prose mb-10">
        {post.meta.date && (
          <time className="text-sm text-muted-foreground">
            {new Date(post.meta.date).toLocaleDateString("es-EC", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        <h1 className="text-4xl mt-2 mb-4">{post.meta.title}</h1>
        {post.meta.excerpt && (
          <p className="text-muted-foreground text-lg">{post.meta.excerpt}</p>
        )}
      </header>

      <div dangerouslySetInnerHTML={{ __html: html }} />

      <footer className="not-prose mt-12 pt-8 border-t flex flex-wrap items-center gap-4">
        <span className="text-sm text-muted-foreground">Compartir:</span>
        <FacebookShareButton url={pageUrl} />
        <PinterestSaveButton
          pageUrl={pageUrl}
          imageUrl={imageUrl}
          description={`${post.meta.title} | ${SITE_NAME}`}
        />
      </footer>
    </article>
  );
}
