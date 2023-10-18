import React from 'react';
import Nav from '@/components/Nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <React.Fragment>
      <div className='flex-grow'>{children}</div>
      <Nav />
    </React.Fragment>
  );
}
