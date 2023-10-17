'use client';

import CircularProgress from '@/components/CircularProgress';
import { Branch } from '@/services/api/branch';
import text from '@/utils/text';
import xp from '@/utils/xp';
import Link from 'next/link';
import React from 'react';

interface BranchButtonProps {
  branch: Branch;
}

export default function BranchButton({ branch }: BranchButtonProps) {
  return (
    <li className='flex-between items-center bg-gradient-to-r from-bg-300 to-bg-100 my-2 p-2 rounded-l-[200px] rounded-r-3xl w-full hover:brightness-125 cursor-pointer'>
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
