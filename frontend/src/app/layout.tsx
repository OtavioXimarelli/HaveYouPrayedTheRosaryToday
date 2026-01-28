import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";

// Use local font to avoid Google Fonts fetch issues in Docker builds
const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Você Já Rezou o Terço Hoje? | Rastreador Diário de Oração",
  description:
    "Acompanhe suas orações diárias do terço, construa uma sequência e conecte-se com uma comunidade de oração. Um app minimalista para aprofundar sua fé.",
  keywords: ["terço", "rosário", "oração", "católico", "fé", "oração diária", "meditação"],
  authors: [{ name: "Terço Hoje" }],
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
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
