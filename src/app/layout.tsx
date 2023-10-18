import './globals.css';
import './animations.css';
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
      <body className="bg-bg h-screen overflow-hidden">
        <main className="h-full flex flex-col justify-between">{children}</main>
      </body>
    </html>
  );
}
