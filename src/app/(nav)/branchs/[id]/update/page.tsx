'use client';

import React from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { Branch, UpdateBranchPayload } from '@/services/api/branch';
import useRequest from '@/hooks/useRequest';
import BranchForm from '../../components/BranchForm';
import updateBranch from '../../actions/update-branch';
import findBranch from '../../actions/find-branch';

interface UpdateBranchProps {
  params: {
    id: string;
  };
} 

export default function UpdateBranch({ params: { id } }: UpdateBranchProps) {
  const router = useRouter();

  const { data: branch, isLoading } = useRequest<Branch>({
    getData: async () => findBranch(id),
    defaultData: {},
  });

  const handleSubmit = async (payload: UpdateBranchPayload) => {
    const { success } = await updateBranch(id, payload);
    if (!success) throw new Error('Não foi possível atualizar a branch');
    router.push('/branchs');
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className='flex flex-col h-full'>
      <Header title='Editar branch' previousPath='/branchs' />
      <BranchForm
        update
        onSubmit={handleSubmit}
        defaultValues={{
          icon: branch.icon,
          name: branch.name,
        }}
      />
    </div>
  );
}
