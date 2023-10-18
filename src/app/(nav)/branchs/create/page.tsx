'use client';

import { z } from 'zod';
import Form from '@/components/Form';
import Header from '@/components/Header';
import Button from '@/components/Button';
import TextField, { OnChangeProps } from '@/components/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import IconPicker from '@/components/IconPicker';
import { useForm } from 'react-hook-form';
import createBranch from '../actions/create-branch';

const createBranchSchema = z.object({
  name: z.string().min(3).max(30),
  icon: z.string(),
});

export default function CreateBranch() {
  const router = useRouter();

  const navigateToBranchs = () => router.push('/branchs');

  const onSubmit = async (payload: any) => {
    const { success } = await createBranch(payload);
    if (!success) throw new Error('Não foi possível criar a branch');
    navigateToBranchs();
  };

  const { handleSubmit, setValue } = useForm({
    resolver: zodResolver(createBranchSchema),
  });

  const handleChange = ({ name, value }: OnChangeProps) => setValue(name, value);

  return (
    <div className='flex flex-col h-full'>
      <Header title='Criar nova branch' previousPath='/branchs' />

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className='p-4 bg-bg-200 rounded-t-3xl flex-between-column flex-grow w-full'
      >
        <div className='w-full'>
          <IconPicker
            onChange={(icon: string) => setValue('icon', icon)}
            className='mb-4'
          />

          <TextField
            name='name'
            placeholder='Nome da branch'
            onChange={handleChange}
          />
        </div>

        <div className='flex-between gap-6 w-full mt-auto'>
          <Button onClick={navigateToBranchs} title='Cancelar' className='w-1/2' />
          <Button type='submit' title='Criar' color='secondary' className='w-1/2' />
        </div>
      </Form>
    </div>
  );
}
