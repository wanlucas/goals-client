import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-bg p-3 h-screen">
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
