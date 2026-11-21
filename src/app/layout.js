import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import DotBackground from "@/components/DotBackground";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mark Joemarie Obra",
  description: "Software developer portfolio of Mark Joemarie Obra — Laravel, React, Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${jakarta.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <DotBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
