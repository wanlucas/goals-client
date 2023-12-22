'use client';

import Select from '@/components/Select';
import TextField from '@/components/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { Goal } from '@/services/api/goal';
import { Branch } from '@/services/api/branch';
import FrequencyInput from './FrequencyInput';

const createTaskSchema = z.object({
  description: z.string().min(3).max(200),
  duration: z.number().nullable(),
  quantity: z.number().nullable(),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  time: z.string().length(5).nullable(),
  runAt: z.array(z.number()).min(0).max(31).nullable(),
  goalId: z.string(),
});

const updateTaskSchema = createTaskSchema.deepPartial();

interface CreateTaskProps {
  onSubmit: (payload: any) => void;
  update?: false;
  defaultValues?: z.infer<typeof updateTaskSchema>;
  goals: Goal[];
}

interface UpdateTaskFormProps {
  onSubmit: (payload: any) => void;
  update: true;
  defaultValues?: z.infer<typeof updateTaskSchema>;
  goals: undefined;
}

type TaskFormProps = CreateTaskProps | UpdateTaskFormProps;

export default function TaskForm({
  onSubmit,
  defaultValues,
  update,
  goals,
}: TaskFormProps) {
  const router = useRouter();
  const { handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(update ? updateTaskSchema : createTaskSchema),
    defaultValues,
  });
  const handleChange = ({
    name,
    value,
  }: {
    name: any;
    value: string | number;
  }) => setValue(name, value);

  return (
    <React.Fragment>
      <div className='flex flex-col gap-2'>
        {!update && (
          <Select
            label='Meta'
            name='goal'
            options={goals.map((goal) => ({
              label: goal.description,
              value: goal.id,
            }))}
            onChange={({ value }) => setValue('goalId', value)}
          />
        )}

        <Select
          label='Frequência'
          name='frequency'
          onChange={handleChange}
          defaultLabel='Todos os dias'
          options={[
            { label: 'Todos os dias', value: 'daily' },
            { label: 'Semanal', value: 'weekly' },
            { label: 'Mensal', value: 'monthly' },
          ]}
        />

        <FrequencyInput
          frequency={watch('frequency')}
          onChange={(value) => setValue('runAt', value)}
        />

        <TextField
          name='description'
          placeholder='Descrição'
          onChange={handleChange}
          value={watch('description')}
        />

        <div className='flex w-full gap-2'>
          <TextField
            name='time'
            placeholder='Horário'
            maxLength={5}
            onChange={handleChange}
            value={watch('time')}
          />

          <TextField
            name='duration'
            placeholder='Duração'
            onChange={handleChange}
            value={watch('duration')}
            type='number'
          />

          <TextField
            name='quantity'
            placeholder='Quantidade'
            onChange={handleChange}
            value={watch('quantity')}
            type='number'
          />
        </div>
      </div>

      <div className='flex-between gap-6 w-full mt-auto'>
        <Button onClick={() => router.back()} className='w-1/2'>
          Cancelar
        </Button>

        <Button
          onClick={handleSubmit(onSubmit)}
          bg='secondary'
          className='w-1/2'
        >
          {update ? 'Salvar' : 'Criar'}
        </Button>
      </div>
    </React.Fragment>
  );
}
