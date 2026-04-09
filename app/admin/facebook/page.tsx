import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { AdminFacebookTabs } from "@/components/facebook/AdminFacebookTabs";

export const metadata: Metadata = { title: "Facebook" };

export default function AdminFacebookPage() {
  // Include unpublished posts so they can be shared from admin
  const posts = getAllPosts(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Publicaciones en Facebook</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Redacta o programa publicaciones para tu Página de Facebook.
        </p>
      </div>
      <AdminFacebookTabs posts={posts} />
    </div>
  );
}
