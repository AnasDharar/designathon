import { IBM_Plex_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Vibes — AI-Powered Design Intelligence",
  description:
    "Create reusable aesthetic identities, generate UI with intention, and develop design taste through AI critique. Where AI meets human judgment.",
  keywords: ["AI design", "UI generation", "design critique", "aesthetic intelligence", "vibe"],
  authors: [{ name: "Vibes" }],
  openGraph: {
    title: "Vibes — Where AI Meets Taste",
    description: "AI-powered design intelligence platform for creating, generating, and critiquing UI with aesthetic direction.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${archivoBlack.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-foreground">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
