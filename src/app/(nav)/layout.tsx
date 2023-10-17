import Nav from '@/components/Nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className='mb-[55px]'>{children}</div>
      <Nav />
    </div>
  );
}
