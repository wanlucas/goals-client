import React from 'react';
import Header from '@/components/Header';
import api from '@/services/api';
import text from '@/utils/text';
import UiIcon from '@/components/UiIcon';
import xp from '@/utils/xp';
import GoalCard from '../components/GoalCard';
import CircularProgress from '@/components/CircularProgress';
import Link from 'next/link';

interface UpdateBranchProps {
  params: {
    id: string;
  };
}

export default async function UpdateBranch({
  params: { id },
}: UpdateBranchProps) {
  const { data: branch } = await api.branch.findById(id);

  return (
    <div className='flex flex-col items-start w-full h-full'>
      <Header previousPath='/branchs'>
        <Link href={`/branchs/${id}/update`}>
          <UiIcon id='edit' size={26} />
        </Link>
      </Header>

      <div className='w-full p-4 bg-bg-200 rounded-t-3xl h-full'>
        <div className='flex-between border-b-[1px] pb-3 border-white/30'>
          <CircularProgress
            percentage={xp.percentageToNextLevel(branch.xp)}
            level={xp.calculateLevel(branch.xp)}
            icon={branch.icon}
            size={90}
          />

          <div className='text-right max-w-[70%]'>
            <p className='font-bold text-xl mb-1'>
              {text.firstUpper(branch.name)}
            </p>

            <p className='text-base text-gray-400'>{branch.xp} xp</p>
          </div>
        </div>

        <div className='text-center'>
          <p className='my-3 font-bold'> Metas </p>
          <ul className='overflow-y-auto border-t-[1px] border-white/30'>
            {branch.goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
