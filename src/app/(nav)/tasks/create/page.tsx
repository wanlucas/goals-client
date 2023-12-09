'use client';

import Header from '@/components/Header';
import Select from '@/components/Select';
import useRequest from '@/hooks/useRequest';
import { Branch } from '@/services/api/branch';
import { Goal } from '@/services/api/goal';
import React from 'react';
import findBranchs from '../../branchs/actions/find-branchs';
import findGoals from '../actions/find-goals';
import findGoalsByBranch from '../../branchs/actions/find-goals-by-branch';
import TaskForm from './components/TaskForm';

export default function CreateTask() {
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

  return (
    <div className="flex flex-col h-full">
      <Header title="Criar nova task" previousPath="/tasks" />

      <div className="h-full bg-bg-200 p-4 rounded-t-3xl">
        <div className="flex flex-col gap-2">
          <Select
            label="Branch"
            name="branch"
            defaultLabel="Todas"
            onChange={({ value }) => setBranchId(value)}
            options={getBranchOptions()}
          />

          <Select
            label="Meta"
            name="goal"
            options={goals.map((goal) => ({
              label: goal.description,
              value: goal.id,
            }))}
          />

          <TaskForm />
        </div>
      </div>
    </div>
  );
}
