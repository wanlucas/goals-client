'use client';

import Header from '@/components/Header';
import Select from '@/components/Select';
import useRequest from '@/hooks/useRequest';
import { Branch } from '@/services/api/branch';
import { Goal } from '@/services/api/goal';
import React from 'react';
import { CreateTaskPayload } from '@/services/api/task';
import { useRouter } from 'next/navigation';
import findBranchs from '../../branchs/actions/find-branchs';
import findGoals from '../actions/find-goals';
import findGoalsByBranch from '../../branchs/actions/find-goals-by-branch';
import TaskForm from './components/TaskForm';
import createTask from '../actions/createTask';

export default function CreateTask() {
  const router = useRouter();
  const [branchId, setBranchId] = React.useState('');

  const { data: branchs } = useRequest<Branch[]>({
    defaultData: [],
    getData: findBranchs,
  });

  const { data: goals } = useRequest<Goal[]>({
    defaultData: [],
    getData: () => {
      if (branchId) return findGoalsByBranch(branchId);
      return findGoals();
    },
    listeners: [branchId],
  });

  const getBranchOptions = () => [
    {
      label: 'Todas',
      value: '',
    },
  ].concat(
    branchs.map((branch) => ({
      label: branch.name,
      value: branch.id,
    })),
  );

  const handleSubmit = async (data: CreateTaskPayload) => {
    const { success } = await createTask(data);

    if (!success) {
      throw new Error('Não foi possível criar a task');
    }

    router.push('/tasks');
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Criar nova task" previousPath="/tasks" />

      <div className="flex-between-column w-full h-full bg-bg-200 gap-2 p-4 rounded-t-3xl">
        <Select
          label="Branch"
          name="branch"
          defaultLabel="Todas"
          onChange={({ value }) => setBranchId(value)}
          options={getBranchOptions()}
        />

        <TaskForm onSubmit={handleSubmit} goals={goals} />
      </div>
    </div>
  );
}
