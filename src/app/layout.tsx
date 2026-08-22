import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import "./redesign.css";
import { ServiceWorkerRegistrar } from "@/components/pwa/ServiceWorkerRegistrar";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://evangelizae.org'),
  title: {
    default: "Evangelizae — oração para a vida cotidiana",
    template: "%s — Evangelizae",
  },
  description: "Um companheiro católico, gratuito e sereno para rezar o Rosário e acompanhar a liturgia diária.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{url: "/evangelizae-seal.svg", type: "image/svg+xml"}],
  },
};

const devServiceWorkerPurge = `
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    registrations.forEach(function (registration) { registration.unregister(); });
  });
  if (window.caches) {
    caches.keys().then(function (keys) { keys.forEach(function (key) { caches.delete(key); }); });
  }
}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning data-scroll-behavior="smooth" className={`${sourceSans.variable} ${sourceSerif.variable}`}>
      <body>
        {children}
        <ServiceWorkerRegistrar />
        {process.env.NODE_ENV !== 'production' && (
          <script dangerouslySetInnerHTML={{__html: devServiceWorkerPurge}} />
        )}
      </body>
    </html>
  );
}
