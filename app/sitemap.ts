import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/services",
    "/contact",
    "/blog",
    "/privacy",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route === "/blog" ? 0.9 : 0.8,
  }));

  // Local markdown posts rendered on our domain — empty for now since blog is
  // Substack-driven, but kept so any future local posts are auto-included.
  const localBlogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Substack posts are canonical on substack.com — do NOT include external
  // URLs in this sitemap (that would confuse Google about domain ownership).

  return [...staticRoutes, ...localBlogRoutes];
}
