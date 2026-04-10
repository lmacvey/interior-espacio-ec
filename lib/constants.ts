export const SITE_NAME = "Espacio Interior";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "contacto@espaciointeriorec.com";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "593XXXXXXXXX";

export const WHATSAPP_PREFILLED_MESSAGE = encodeURIComponent(
  "Hola, me gustaría agendar una consulta de exploración gratuita con Espacio Interior."
);

// Substack — RSS uses the subdomain; subscribe link uses the handle
export const SUBSTACK_RSS_URL = process.env.SUBSTACK_PUBLICATION
  ? `https://${process.env.SUBSTACK_PUBLICATION}.substack.com/feed`
  : "";
export const SUBSTACK_HANDLE = process.env.NEXT_PUBLIC_SUBSTACK_HANDLE ?? "";
export const SUBSTACK_URL = SUBSTACK_HANDLE
  ? `https://substack.com/@${SUBSTACK_HANDLE}`
  : "";

export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  facebook:  process.env.NEXT_PUBLIC_FACEBOOK_URL  ?? "",
  linkedin:  process.env.NEXT_PUBLIC_LINKEDIN_URL  ?? "",
  // Derived from WHATSAPP_NUMBER — links to wa.me deep link
  whatsapp:  WHATSAPP_NUMBER,
  pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL ?? "",
};
