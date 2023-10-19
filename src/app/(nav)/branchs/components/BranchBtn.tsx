'use client';

import ActionsBar from '@/components/ActionsBar';
import CircularProgress from '@/components/CircularProgress';
import { Branch } from '@/services/api/branch';
import text from '@/utils/text';
import xp from '@/utils/xp';
import Link from 'next/link';
import removeBranch from '../actions/remove-branch';

interface BranchButtonProps {
  branch: Branch;
}

export default function BranchBtn({ branch }: BranchButtonProps) {
  const handleDelete = async (id: string) => {
    const { success } = await removeBranch(id);
    if (!success) throw new Error('Não foi possível remover a branch');
  };

  return (
    <li className='flex items-stretch my-4 w-full cursor-pointer'>
      <Link
        href={`/branchs/${branch.id}`}
        className='flex-between bg-bg rounded-l-full hover:bg-bg-100 w-full p-2'
      >
        <CircularProgress
          percentage={xp.percentageToNextLevel(branch.xp)}
          level={xp.calculateLevel(branch.xp)}
          icon={branch.icon}
        />

        <div className='text-right'>
          <p className='text-lg'>{text.firstUpper(branch.name)}</p>
          <p className='text-sm text-gray-400'>{branch.xp}</p>
        </div>
      </Link>

      <ActionsBar
        className='bg-bg rounded-r-lg p-2 hover:scale-105 hover:bg-bg-100'
        actions={[
          {
            title: 'Editar',
            icon: 'edit',
            onClick: () => {},
          },
          {
            title: 'Excluir',
            icon: 'delete',
            className: 'text-secondary',
            onClick: () => handleDelete(branch.id),
          },
        ]}
      />
    </li>
  );
}
