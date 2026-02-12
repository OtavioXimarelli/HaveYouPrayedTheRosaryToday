import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NavigationWrapper } from "@/components/navigation-wrapper";

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Rosário Vivo | Viva sua fé católica plenamente",
  description:
    "Acompanhe sua jornada espiritual, explore conteúdos profundos sobre o Rosário e espiritualidade católica, e conecte-se com uma comunidade global de fé. Gratuito e open-source.",
  keywords: ["rosário", "terço", "oração", "católico", "fé", "espiritualidade", "maria", "meditação", "santos"],
  authors: [{ name: "Rosário Vivo" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rosário Vivo",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Rosário Vivo - Viva sua fé católica plenamente",
    description: "Plataforma completa de espiritualidade católica. Acompanhe sua jornada, explore conteúdos profundos e ore em comunidade.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-manrope antialiased">
        <ThemeProvider defaultTheme="system" storageKey="rosario-theme">
          <QueryProvider>
            <NavigationWrapper />
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
