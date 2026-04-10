import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/layout/ClientProviders";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "Acompañamiento psicológico en línea para transiciones de vida, momentos de cambio y procesos internos. Un espacio seguro para volver a ti.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Terapia en Línea`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  keywords: [
    "terapia en línea",
    "psicología",
    "transiciones de vida",
    "salud mental",
    "acompañamiento emocional",
    "Ecuador",
  ],
  openGraph: {
    type: "website",
    locale: "es_EC",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | Terapia en Línea`,
    description,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Terapia en Línea`,
    description,
  },
  ...(process.env.PINTEREST_DOMAIN_VERIFY
    ? { other: { "p:domain_verify": process.env.PINTEREST_DOMAIN_VERIFY } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <ClientProviders>
          <main className="flex-1">{children}</main>
        </ClientProviders>
        <Footer />
      </body>
    </html>
  );
}
