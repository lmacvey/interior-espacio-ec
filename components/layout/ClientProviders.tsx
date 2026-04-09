"use client";

import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <WhatsAppFloat />
    </>
  );
}
