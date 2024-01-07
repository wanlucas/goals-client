'use client';

import React from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import {
  BranchWithGoalsAndTasks,
  UpdateBranchPayload,
} from '@/services/api/branch';
import useRequest from '@/hooks/useRequest';
import { CreateGoalPayload } from '@/services/api/goal';
import BranchForm from '../../create/components/BranchForm';
import updateBranch from '../../actions/update-branch';
import findBranch from '../../actions/find-branch';
import createGoals from '../../actions/create-goals';
import deleteGoals from '../../actions/deleteGoals';

interface UpdateBranchProps {
  params: {
    id: string;
  };
}

interface UpdateBranchAndGoalsPayload extends UpdateBranchPayload {
  goals?: CreateGoalPayload[];
}

export default function UpdateBranch({ params: { id } }: UpdateBranchProps) {
  const router = useRouter();

  const { data: branch, isLoading } = useRequest<BranchWithGoalsAndTasks>({
    getData: async () => findBranch(id),
    defaultData: {},
  });

  const handleSubmit = async ({ goals, ...payload }: UpdateBranchAndGoalsPayload) => {
    const { success } = await updateBranch(id, payload);

    if (!success) throw new Error('Não foi possível atualizar a branch');

    if (goals && goals.length) {
      const createdGoals = goals.filter(
        (goas: CreateGoalPayload) => !branch.goals
          .find((goal) => goal.description === goas.description),
      );

      if (createdGoals.length) {
        const { success: createGoalsSuccess } = await createGoals({
          branchId: id,
          goals: createdGoals,
        });

        if (!createGoalsSuccess) throw new Error('Não foi possível criar as metas');
      }

      const deletedGoalIds = branch.goals.filter((currentGoal) => !goals.find((goal) => (
        goal.description === currentGoal.description
      ))).map((goal) => goal.id);

      if (deletedGoalIds.length) {
        const { success: deleteGoalsSuccess } = await deleteGoals(deletedGoalIds);

        if (!deleteGoalsSuccess) throw new Error('Não foi possível remover as metas');
      }
    }

    router.push('/branchs');
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="flex flex-col h-full">
      <Header title="Editar branch" previousPath="/branchs" />

      <BranchForm
        update
        onSubmit={handleSubmit}
        defaultValues={{
          icon: branch.icon,
          name: branch.name,
          goals: branch.goals.map(({ tasks, ...goal }) => (goal)),
        }}
        />
    </div>
  );
  // TODO - refactor goals
}
