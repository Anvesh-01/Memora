import type { Metadata } from 'next';
import { Libre_Caslon_Text, Hanken_Grotesk, Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AppShell } from '@/components/AppShell';

const caslon = Libre_Caslon_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-caslon',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'Mnemosyne - AI Video Knowledge',
  description: 'AI Video Knowledge Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${caslon.variable} ${hanken.variable} ${geist.variable}`}>
      <body className="font-sans antialiased bg-background text-on-background min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
