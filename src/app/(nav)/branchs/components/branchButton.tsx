'use client';

import CircularProgress from '@/components/CircularProgress';
import { Branch } from '@/services/api/branch';
import xp from '@/utils/xp';
import Link from 'next/link';
import React from 'react';

interface BranchButtonProps {
  branch: Branch;
}

export default function BranchButton({ branch }: BranchButtonProps) {
  return (
    <li className='flex-between items-center bg-gradient-to-r from-bg-300 to-bg-100 my-2 p-2 rounded-full w-full hover:brightness-125 cursor-pointer'>
      <Link
        href={`/branchs/${branch.id}`}
        className='flex-between w-full'
      >
        <CircularProgress
          percentage={xp.percentageToNextLevel(branch.xp)}
          level={xp.calculateLevel(branch.xp)}
        />

        <div className='mr-5'>{ branch.name }</div>
      </Link>
    </li>
  );
}
