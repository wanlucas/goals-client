'use client';

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { CreateBranchPayload } from '@/services/api/branch';
import { CreateGoalPayload } from '@/services/api/goal';
import BranchForm from './components/BranchForm';
import createBranch from '../actions/create-branch';
import createGoals from '../actions/create-goals';

interface CreateBranchAndGoalsPayload extends CreateBranchPayload {
  goals: CreateGoalPayload[];
}

export default function CreateBranch() {
  const router = useRouter();

  const handleSubmit = async ({
    goals,
    ...branch
  }: CreateBranchAndGoalsPayload) => {
    const { success: createBranchSuccess, data: createdBranch } = await createBranch(branch);

    if (!createBranchSuccess) {
      throw new Error('Não foi possível criar a branch');
    }

    if (goals && goals.length) {
      const { success: createGoalsSuccess } = await createGoals({
        branchId: createdBranch!.id,
        goals,
      });

      if (!createGoalsSuccess) throw new Error('Não foi possível criar as metas');
    }

    router.push('/branchs');
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Criar nova branch" previousPath="/branchs" />
      <BranchForm onSubmit={handleSubmit} />
    </div>
  );
}
