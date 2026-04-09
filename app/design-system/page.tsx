import { NavIconSet } from "@/components/ui/NavIcons";

export const metadata = { title: "Design System — Interior Espacio" };

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted mb-2">
          Interior Espacio
        </p>
        <h1 className="font-display text-3xl mb-2">Design System</h1>
        <p className="text-text-secondary text-sm mb-12">
          Custom icon set — drawn from the logo&rsquo;s design language.
        </p>
        <NavIconSet />
      </div>
    </main>
  );
}
