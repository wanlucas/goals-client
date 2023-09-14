import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='fixed bottom-0 left-0 right-0 mr-auto'>
      <nav className='flex justify-between items-center px-5 py-2'>
        <Link href="/">
          <button type="button">Home</button>
        </Link>

        <Link href="/branchs">
          <button type="button">Branchs</button>
        </Link>

        <Link href="/statistics">
          <button type="button">Statistics</button>
        </Link>
      </nav>
    </footer>
  );
}
