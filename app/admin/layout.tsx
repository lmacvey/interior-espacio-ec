import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-sm">Espacio Interior — Admin</span>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="text-sm text-muted-foreground hover:underline"
          >
            Cerrar sesión
          </button>
        </form>
      </header>
      <main className="px-6 py-10 max-w-3xl mx-auto">{children}</main>
    </div>
  );
}
