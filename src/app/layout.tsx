import './globals.css';
import './animations.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <body className='flex justify-center bg-black h-screen overflow-hidden'>
        <div className='bg-bg h-screen overflow-hidden w-full max-w-[1000px] relative'>
          <main className='h-full flex flex-col justify-between'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
