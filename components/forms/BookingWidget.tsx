"use client";

/**
 * BookingWidget — embeds a third-party scheduling tool.
 * Swap the src URL for your Calendly, Acuity, or Jane App embed link.
 */
export default function BookingWidget() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-border">
      <iframe
        src="https://calendly.com/your-link"   // TODO: replace with real booking URL
        width="100%"
        height="700"
        frameBorder="0"
        title="Book a Session"
      />
    </div>
  );
}
