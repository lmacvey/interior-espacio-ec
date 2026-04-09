"use client";

interface Props {
  url: string;
  label?: string;
}

export function FacebookShareButton({ url, label = "Compartir en Facebook" }: Props) {
  function handleClick() {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, "fb-share", "width=600,height=400,noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="inline-flex items-center gap-2 text-sm border rounded-full px-4 py-1.5 hover:bg-muted transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
      {label}
    </button>
  );
}
