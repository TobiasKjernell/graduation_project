import type { Metadata } from "next";
import { Jura, Asimovian } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClientProvider } from "@/providers/query-client-provider";

const jura = Jura({
  variable:'--jura',
  subsets: ['latin']
})
const asimovian = Asimovian({
  variable: '--asimovian',
  subsets: ['latin'],
  weight: '400',
  fallback: ['sans']
})

export const metadata = {
  title: {
    template: "%s / Polarbear Sandbox Production",
    default: 'Welcome / Polarbear Sandbox Production'
  },
  description: 'Polarbear Sandbox Production, funny studio making games!'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jura.variable} ${asimovian.variable} antialiased`}
      >

        <ThemeProvider attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <QueryClientProvider>
            {children}
          </QueryClientProvider>
        </ThemeProvider>  
      </body>
    </html>
  );
}
