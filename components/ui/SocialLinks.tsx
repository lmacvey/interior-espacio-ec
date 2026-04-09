import { SOCIAL_LINKS, WHATSAPP_PREFILLED_MESSAGE } from "@/lib/constants";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  PinterestIcon,
} from "@/components/ui/icons";

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

const platforms = [
  {
    key: "instagram" as const,
    label: "Instagram de Interior Espacio",
    Icon: InstagramIcon,
    href: (v: string) => v,
  },
  {
    key: "facebook" as const,
    label: "Facebook de Interior Espacio",
    Icon: FacebookIcon,
    href: (v: string) => v,
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn de Interior Espacio",
    Icon: LinkedInIcon,
    href: (v: string) => v,
  },
  {
    key: "whatsapp" as const,
    label: "WhatsApp de Interior Espacio",
    Icon: WhatsAppIcon,
    href: (v: string) =>
      `https://wa.me/${v}?text=${WHATSAPP_PREFILLED_MESSAGE}`,
  },
  {
    key: "pinterest" as const,
    label: "Pinterest de Interior Espacio",
    Icon: PinterestIcon,
    href: (v: string) => v,
  },
] as const;

export function SocialLinks({ className = "", iconSize = 20 }: SocialLinksProps) {
  const links = platforms.filter(({ key }) => Boolean(SOCIAL_LINKS[key]));

  if (links.length === 0) return null;

  return (
    <div className={`flex gap-3 items-center ${className}`}>
      {links.map(({ key, label, Icon, href }) => (
        <a
          key={key}
          href={href(SOCIAL_LINKS[key])}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-text-muted hover:text-primary transition-colors duration-150"
        >
          <Icon size={iconSize} aria-hidden={true} />
        </a>
      ))}
    </div>
  );
}
