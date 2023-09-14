import './globals.css';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Goals',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg p-3">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
