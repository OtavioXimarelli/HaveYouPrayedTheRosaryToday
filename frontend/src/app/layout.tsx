import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Você Já Rezou o Terço Hoje? | Rastreador Diário de Oração",
  description:
    "Acompanhe suas orações diárias do terço, construa uma sequência e conecte-se com uma comunidade de oração. Um app minimalista para aprofundar sua fé.",
  keywords: ["terço", "rosário", "oração", "católico", "fé", "oração diária", "meditação"],
  authors: [{ name: "Terço Hoje" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Terço Hoje",
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
    title: "Você Já Rezou o Terço Hoje?",
    description: "Acompanhe suas orações diárias do terço e conecte-se com fiéis do mundo todo.",
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
            <Navbar />
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
