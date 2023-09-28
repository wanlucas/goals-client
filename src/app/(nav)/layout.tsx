import Nav from '@/components/Nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <main>{children}</main>
      <Nav />
    </div>
  );
}
