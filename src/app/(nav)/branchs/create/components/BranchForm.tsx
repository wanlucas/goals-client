'use client';

import { z } from 'zod';
import Form from '@/components/Form';
import Button from '@/components/Button';
import TextField from '@/components/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import IconPicker from '@/components/IconPicker';
import { useForm } from 'react-hook-form';
import { CreateGoalPayload } from '@/services/api/goal';
import React from 'react';
import { OnChangeProps } from '@/components/Select';
import GoalsForm, { createGoalSchema } from './GoalsForm';

const createBranchSchema = z.object({
  name: z.string().min(3).max(25),
  icon: z.string().optional(),
  class: z.string().min(3).max(25).optional(),
  goals: z.array(createGoalSchema).optional(),
});

const updateBranchSchema = createBranchSchema.partial();

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
  const [showGoalsForm, setShowGoalsForm] = React.useState(
    defaultValues.goals?.length! > 0,
  );
  const router = useRouter();

  const navigateToBranchs = () => router.push('/branchs');

  const {
    handleSubmit, setValue, watch,
  } = useForm({
    resolver: zodResolver(update ? updateBranchSchema : createBranchSchema),
    defaultValues,
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 py-6 bg-bg-200 gap-2 rounded-t-3xl flex flex-col h-full w-full"
    >
      <IconPicker
        onChange={(icon: string) => setValue('icon', icon)}
        value={watch('icon')}
      />

      <TextField
        name="class"
        placeholder="Classe"
        maxLength={25}
        onChange={({ value }: OnChangeProps<any>) => setValue('class', value)}
        value={watch('class')}
      />

      <TextField
        name="name"
        placeholder="Nome da branch"
        maxLength={25}
        onChange={({ value }: OnChangeProps<any>) => setValue('name', value)}
        value={watch('name')}
      />

      {showGoalsForm ? (
        <GoalsForm
          onChange={(goals: CreateGoalPayload[]) => setValue('goals', goals)}
          goals={watch('goals')}
          currentGoals={defaultValues.goals}
        />
      ) : (
        <Button
          bg="tertiary"
          onClick={() => setShowGoalsForm(true)}
          className="flex-centralized gap-1 w-1/2"
        >
          <p className="ml-1">Nova meta</p>
        </Button>
      )}

      <div className="flex-between gap-6 w-full mt-auto">
        <Button onClick={navigateToBranchs} className="w-1/2">
          Cancelar
        </Button>

        <Button type="submit" bg="secondary" className="w-1/2">
          {update ? 'Salvar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
}
