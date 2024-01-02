'use client';

import Select from '@/components/Select';
import TextField from '@/components/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { Goal } from '@/services/api/goal';
import Skeleton from '@/components/Skeleton';
import { TaskType } from '@/services/api/type';
import FrequencyInput from './FrequencyInput';

const createTaskSchema = z
  .object({
    description: z.string().min(3).max(200),
    duration: z.number().optional(),
    quantity: z.number().optional(),
    frequency: z.enum(['daily', 'weekly', 'monthly']),
    time: z.string().length(5).optional(),
    runAt: z.array(z.number()).min(0).max(31).nullable(),
    type: z.number().min(0).max(2),
    increment: z.number().nullable(),
    value: z.number().nullable(),
    goalId: z.string(),
  })
  .refine((data) => data.type !== TaskType.crescent || data.increment, {
    message: 'Incremento é obrigatório em tarefas crescentes',
  })
  .refine((data) => data.type === TaskType.infinite || data.value, {
    message: 'Valor é obrigatório em tarefas não infinitas',
  });

const updateTaskSchema = z.object({
  description: z.string().min(3).max(200),
  duration: z.number().optional(),
  quantity: z.number().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  time: z.string().length(5).optional(),
  type: z.number().min(0).max(2),
  runAt: z.array(z.number()).min(0).max(31).nullable(),
  increment: z.number().nullable(),
  value: z.number().optional().nullable(),
  goalId: z.string(),
});

interface CreateTaskProps {
  onSubmit: (payload: any) => void;
  update?: false;
  defaultValues?: z.infer<typeof updateTaskSchema>;
  goals: Goal[];
  goal: undefined;
}

interface UpdateTaskFormProps {
  onSubmit: (payload: any) => void;
  update: true;
  defaultValues?: z.infer<typeof updateTaskSchema>;
  goals: undefined;
  goal: Goal;
}

type TaskFormProps = CreateTaskProps | UpdateTaskFormProps;

export default function TaskForm({
  onSubmit,
  defaultValues,
  update,
  goals,
  goal,
}: TaskFormProps) {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = React.useState<Goal | undefined>(goal);
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(update ? updateTaskSchema : createTaskSchema),
    defaultValues,
  });
  console.log(errors);
  const handleChange = ({
    name,
    value,
  }: {
    name: any;
    value: string | number;
  }) => setValue(name, value);

  const getTaskTypeOptions = () => {
    const options = [] as { label: string; value: TaskType }[];

    if (!selectedGoal) return options;

    if (selectedGoal.target) {
      options.push(
        { label: 'Acumulativa', value: TaskType.cumulative },
        { label: 'Crescente', value: TaskType.crescent },
      );
    } else {
      options.push({ label: 'Infinita', value: TaskType.infinite });
    }

    return options;
  };

  React.useEffect(() => {
    if (watch('goalId')) {
      const found = goals?.find(({ id }) => id === watch('goalId'));
      if (found) setSelectedGoal(found);
    }
  }, [watch('goalId')]);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-2 w-full">
        {!update && (
          <Select
            label="Meta"
            name="goal"
            options={goals.map(({ description, id }) => ({
              label: description,
              value: id,
            }))}
            onChange={({ value }) => setValue('goalId', value as string)}
          />
        )}

        <Select
          label="Tipo"
          name="type"
          onChange={handleChange}
          options={getTaskTypeOptions()}
        />

        <Skeleton
          open={watch('type') === TaskType.crescent}
          onClose={() => setValue('increment', null)}
        >
          <TextField
            name="increment"
            placeholder="Incremento"
            onChange={handleChange}
            value={watch('increment')}
            type="number"
          />
        </Skeleton>

        <Skeleton
          open={watch('type') !== TaskType.infinite}
          onClose={() => setValue('value', null)}
        >
          <TextField
            name="value"
            placeholder="Valor"
            onChange={handleChange}
            value={watch('value')}
            type="number"
          />
        </Skeleton>

        <Select
          label="Frequência"
          name="frequency"
          onChange={handleChange}
          defaultLabel="Todos os dias"
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
          name="description"
          placeholder="Descrição"
          onChange={handleChange}
          value={watch('description')}
        />

        <div className="flex w-full gap-2">
          <TextField
            name="time"
            placeholder="Horário"
            maxLength={5}
            onChange={handleChange}
            value={watch('time')}
          />

          <TextField
            name="duration"
            placeholder="Duração"
            onChange={handleChange}
            value={watch('duration')}
            type="number"
          />

          <TextField
            name="quantity"
            placeholder="Repetições"
            onChange={handleChange}
            value={watch('quantity')}
            type="number"
          />
        </div>
      </div>

      <div className="flex-between gap-6 w-full mt-auto">
        <Button onClick={() => router.back()} className="w-1/2">
          Cancelar
        </Button>

        <Button
          onClick={handleSubmit(onSubmit)}
          bg="secondary"
          className="w-1/2"
        >
          {update ? 'Salvar' : 'Criar'}
        </Button>
      </div>
    </React.Fragment>
  );
}
