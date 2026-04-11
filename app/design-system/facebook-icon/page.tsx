/**
 * Facebook App Icon preview — 1024×1024
 *
 * To export as PNG:
 *   1. Open this page in Chrome at 100% zoom
 *   2. Right-click the icon → "Save image as…"   (if served as <img>)
 *      OR use DevTools → capture node screenshot of the <img> element
 *   3. Upload the PNG to Meta Developer Portal → App Settings → App Icon
 */
export const metadata = { title: "Facebook App Icon — Espacio Interior" };

export default function FacebookIconPage() {
  return (
    <main className="min-h-screen bg-[#1c1917] flex flex-col items-center justify-center gap-8 p-8">
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[#78716c]">
        Facebook App Icon — 1024 × 1024
      </p>

      {/* Full size preview (scaled down for screen) */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-[10px] text-[#57534e] font-mono">512px preview</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/facebook-app-icon.svg"
          alt="Espacio Interior Facebook app icon"
          width={512}
          height={512}
          className="rounded-2xl shadow-2xl"
        />
      </div>

      {/* Small size stress-test */}
      <div className="flex items-end gap-6">
        {[256, 128, 64, 32, 16].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/facebook-app-icon.svg"
              alt=""
              width={s}
              height={s}
              className="rounded"
            />
            <span className="text-[10px] text-[#57534e] font-mono">{s}px</span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#57534e] max-w-sm text-center leading-relaxed">
        Source file: <code className="font-mono text-[#78716c]">public/facebook-app-icon.svg</code>
        <br />
        Export to PNG via browser DevTools or{" "}
        <code className="font-mono text-[#78716c]">npx sharp-cli</code> before uploading to Meta.
      </p>
    </main>
  );
}
