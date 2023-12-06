'use client';

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { CreateBranchPayload } from '@/services/api/branch';
import BranchForm from './components/BranchForm';
import createBranch from '../actions/create-branch';

export default function CreateBranch() {
  const router = useRouter();

  const handleSubmit = async (payload: CreateBranchPayload) => {
    const { success } = await createBranch(payload);
    if (!success) throw new Error('Não foi possível criar a branch');
    router.push('/branchs');
  };

  return (
    <div className='flex flex-col h-full'>
      <Header title='Criar nova branch' previousPath='/branchs' />
      <BranchForm onSubmit={handleSubmit} />
    </div>
  );
}
