import { PinterestIcon } from "@/components/ui/icons";

interface Props {
  pageUrl: string;
  imageUrl: string;
  description: string;
  className?: string;
}

export function PinterestSaveButton({ pageUrl, imageUrl, description, className }: Props) {
  const href = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Guardar en Pinterest"
      className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text-muted transition-colors duration-150 hover:border-primary hover:text-primary ${className ?? ""}`}
    >
      <PinterestIcon className="w-4 h-4" />
      <span>Guardar en Pinterest</span>
    </a>
  );
}
