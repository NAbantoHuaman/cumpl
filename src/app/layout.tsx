import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";
import CustomCursor from "@/components/effects/CustomCursor";
import StarfieldCanvas from "@/components/effects/StarfieldCanvas";
import FloatingHearts from "@/components/effects/FloatingHearts";
import MusicPlayer from "@/components/effects/MusicPlayer";
import LoadingScreen from "@/components/effects/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Feliz Cumpleaños Mi Amor ✨ | 20 Años de Magia",
  description:
    "Una experiencia digital inmersiva creada con amor para celebrar tu cumpleaños número 20. Una carta de amor interactiva.",
  keywords: ["cumpleaños", "amor", "20 años", "celebración"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <LoadingScreen />
        <SmoothScroll>
          <CustomCursor />
          <StarfieldCanvas />
          <FloatingHearts />
          <main className="relative z-10 flex min-h-screen flex-col">
          {children}
        </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
