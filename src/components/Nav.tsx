import Link from 'next/link';
import UiIcon from './UiIcon';

export default function Nav() {
  return (
    <nav className='flex justify-between items-center py-2 px-4 bg-bg'>
      <Link href='/tasks'>
        <button type='button'>
          <UiIcon id='home' />
        </button>
      </Link>

      <Link href='/branchs'>
        <button type='button'>
          <UiIcon id='branch' />
        </button>
      </Link>

      <Link href='/statistics'>
        <button type='button'>
          <UiIcon id='statistics' />
        </button>
      </Link>
    </nav>
  );
}
