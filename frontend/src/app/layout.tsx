import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
