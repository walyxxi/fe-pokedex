import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import QueryProvider from "@/components/query-provider";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokemon Data Source with pokeapi.co",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          <main className="min-h-screen pt-10">
            <article className="container p-10">{children}</article>
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
