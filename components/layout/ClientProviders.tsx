"use client";

import dynamic from "next/dynamic";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const Analytics = dynamic(() => import("@/components/layout/Analytics"), { ssr: false });

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Analytics />
      {children}
      <WhatsAppFloat />
    </>
  );
}
