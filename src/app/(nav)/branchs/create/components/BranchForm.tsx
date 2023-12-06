'use client';

import { z } from 'zod';
import Form from '@/components/Form';
import Button from '@/components/Button';
import TextField, { OnChangeProps } from '@/components/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import IconPicker from '@/components/IconPicker';
import { useForm } from 'react-hook-form';
import { CreateGoalPayload } from '@/services/api/goal';
import React from 'react';
import UiIcon from '@/components/UiIcon';
import GoalsForm, { createGoalSchema } from './GoalsForm';

const createBranchSchema = z.object({
  name: z.string().min(3).max(25),
  icon: z.string(),
  goals: z.array(createGoalSchema).optional(),
});

const updateBranchSchema = z.object({
  name: z.string().min(3).max(25).optional(),
  icon: z.string().optional(),
  goals: z.array(createGoalSchema).optional(),
});

interface BranchFormProps {
  onSubmit: (payload: any) => void;
  update?: boolean;
  defaultValues?: z.infer<typeof updateBranchSchema>;
}

export default function BranchForm({
  onSubmit,
  defaultValues = {},
  update = false,
}: BranchFormProps) {
  const [showGoalsForm, setShowGoalsForm] = React.useState(false);
  const router = useRouter();

  const navigateToBranchs = () => router.push('/branchs');

  const { handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(update ? updateBranchSchema : createBranchSchema),
    defaultValues,
  });

  const handleChange = ({ name, value }: OnChangeProps<any>) => setValue(name, value);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='p-4 bg-bg-200 rounded-t-3xl flex flex-col flex-grow w-full'
    >
      <div className='w-full mb-5'>
        <IconPicker
          onChange={(icon: string) => setValue('icon', icon)}
          className='mb-4'
          value={watch('icon')}
        />

        <TextField
          name='name'
          placeholder='Nome da branch'
          maxLength={25}
          onChange={handleChange}
          value={watch('name')}
        />
      </div>

      {showGoalsForm ? (
        <GoalsForm
          onAdd={(goal: CreateGoalPayload) => setValue('goals', [...watch('goals'), goal])}
        />
      ) : (
        <Button bg='tertiary' onClick={() => setShowGoalsForm(true)} className='flex-between w-28'>
          <p className='ml-1'>Meta</p>
          <UiIcon id='plus' />
        </Button>
      )}

      <div className='flex-between gap-6 w-full mt-auto'>
        <Button onClick={navigateToBranchs} className='w-1/2'>
          Cancelar
        </Button>

        <Button type='submit' bg='secondary' className='w-1/2'>
          {update ? 'Salvar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
}
