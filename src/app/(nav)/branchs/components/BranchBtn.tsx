'use client';

import CircularProgress from '@/components/CircularProgress';
import { Branch } from '@/services/api/branch';
import text from '@/utils/text';
import xp from '@/utils/xp';
import Link from 'next/link';

interface BranchButtonProps {
  branch: Branch;
}

export default function BranchBtn({ branch }: BranchButtonProps) {
  return (
    <li
      className='flex-between items-center bg-bg my-4 p-2 rounded-l-[100px] rounded-r-[20px]
      w-full hover:brightness-125 cursor-pointer'
    >
      <Link
        href={`/branchs/${branch.id}`}
        className='flex-between w-full'
      >
        <CircularProgress
          percentage={xp.percentageToNextLevel(branch.xp)}
          level={xp.calculateLevel(branch.xp)}
          icon={branch.icon}
        />

        <div className='mr-3 text-right'>
          <p className='text-lg'>{ text.firstUpper(branch.name) }</p>
          <p className='text-sm text-gray-400'>{ branch.xp }</p>
        </div>
      </Link>
    </li>
  );
}
