import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Você Já Rezou o Terço Hoje? | Rastreador Diário de Oração",
  description:
    "Acompanhe suas orações diárias do terço, construa uma sequência e conecte-se com uma comunidade de oração. Um app minimalista para aprofundar sua fé.",
  keywords: ["terço", "rosário", "oração", "católico", "fé", "oração diária", "meditação"],
  authors: [{ name: "Terço Hoje" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
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
