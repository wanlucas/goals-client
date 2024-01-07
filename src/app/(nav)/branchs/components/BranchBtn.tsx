'use client';

import Link from 'next/link';
import text from '@/utils/text';
import { useRouter } from 'next/navigation';
import ActionsBar from '@/components/ActionsBar';
import CircularProgress from '@/components/CircularProgress';
import { BranchWithSummary } from '@/services/api/branch';
import React from 'react';
import xp from '@/utils/xp';
import removeBranch from '../actions/remove-branch';

interface BranchButtonProps {
  branch: BranchWithSummary;
}

export default function BranchBtn({ branch }: BranchButtonProps) {
  const xpData = React.useMemo(
    () => xp(branch.completedGoals * 3 + branch.completedTasks),
    [branch.completedGoals, branch.completedTasks],
  );

  const router = useRouter();

  const handleEdit = (id: string) => router.push(`/branchs/${id}/update`);

  const handleDelete = async (id: string) => {
    const { success } = await removeBranch(id);
    if (!success) throw new Error('Não foi possível remover a branch');
  };

  return (
    <li className="flex items-stretch w-full cursor-pointer">
      <Link
        href={`/branchs/${branch.id}`}
        className="flex-between bg-bg rounded-l-full hover:bg-bg-100 w-full p-2"
      >
        <div className="flex items-center gap-4">
          <CircularProgress
            percentage={xpData.percentage}
            level={xpData.level}
            icon={branch.icon}
          />

          <div className="text-center gap-3 items-center">
            <p className="text-xs text-gray-400">{branch.completedGoals}</p>
            <p className="text-xs text-gray-400">{branch.completedTasks}</p>
          </div>
        </div>

        <p className="text-base leading-5">{text.firstUpper(branch.name)}</p>
      </Link>

      <ActionsBar
        className="bg-bg rounded-r-lg p-2 hover:scale-105 hover:bg-bg-100"
        actions={[
          {
            title: 'Editar',
            icon: 'edit',
            onClick: () => handleEdit(branch.id),
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
