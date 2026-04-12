declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackWhatsAppClick(
  source: "contact_page" | "floating_button" | "footer"
) {
  window.gtag?.("event", "whatsapp_click", {
    event_category: "contact",
    event_label: source,
  });
  window.fbq?.("track", "Contact", { content_name: "WhatsApp", source });
}

export function trackFormSubmit() {
  window.gtag?.("event", "form_submit", {
    event_category: "contact",
    event_label: "contact_form",
  });
  window.fbq?.("track", "Lead", { content_name: "ContactForm" });
}
