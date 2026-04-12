import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/layout/ClientProviders";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const GA_ID = "G-TT0466WK4C";
const FB_PIXEL_ID = "933865076303150";

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script
          src="https://connect.facebook.net/en_US/fbevents.js"
          strategy="afterInteractive"
        />
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
