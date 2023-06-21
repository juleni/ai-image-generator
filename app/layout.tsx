import ClientProvider from "@/components/ClientProvider";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Image Generator",
  description: "DALL-E Image Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          {/** Header */}
          <Header />
          {/** Prompt Input */}
          <PromptInput />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
