import Link from 'next/link';

export default function Nav() {
  return (
    <nav className='flex justify-between items-center py-2 px-4 bg-bg'>
      <Link href='/'>
        <button type='button'>Home</button>
      </Link>

      <Link href='/branchs'>
        <button type='button'>Branchs</button>
      </Link>

      <Link href='/statistics'>
        <button type='button'>Statistics</button>
      </Link>
    </nav>
  );
}
