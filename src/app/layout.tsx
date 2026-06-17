import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090c",
};

export const metadata: Metadata = {
  title: "GovAgent — Força-Tarefa contra a Corrupção Sistêmica",
  description: "Assuma o controle da GovAgent nesta aventura tática de tomada de decisão. Equilibre as facções da República, investigue o Pacto das Sombras e obtenha as assinaturas de Nassau.",
  keywords: ["GovAgent", "jogo de decisão", "politica", "cyber-noir", "tensão", "Supabase", "Pacto das Sombras", "Nassau"],
  authors: [{ name: "GovAgent Task Force" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "GovAgent — Força-Tarefa contra a Corrupção Sistêmica",
    description: "Equilibre as facções, evite o colapso democrático e desmantele o Pacto das Sombras no comando da agência de inteligência.",
    url: "https://govagent.vercel.app",
    siteName: "GovAgent",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "GovAgent Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GovAgent — Força-Tarefa contra a Corrupção Sistêmica",
    description: "Comande a GovAgent e desmantele o Pacto das Sombras neste thriller político.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
