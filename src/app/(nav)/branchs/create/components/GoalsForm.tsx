import React from 'react';
import TextField from '@/components/TextField';
import { CreateGoalPayload } from '@/services/api/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import CircularBtn from '@/components/CircularBtn';
import Table from '@/components/Table';
import { OnChangeProps } from '@/components/Select';

export const createGoalSchema = z.object({
  description: z.string().min(3).max(200),
  target: z.number().min(1),
});

interface GoalsFormProps {
  onChange: (goals: CreateGoalPayload[]) => void;
  goals?: CreateGoalPayload[];
  currentGoals?: CreateGoalPayload[];
}

const defaultValues = {
  description: '',
  target: 0,
};

export default function GoalsForm({ onChange, goals = [], currentGoals }: GoalsFormProps) {
  const {
    handleSubmit, setValue, watch, reset,
  } = useForm({
    resolver: zodResolver(createGoalSchema),
    defaultValues,
  });

  const handleAdd = (goal: CreateGoalPayload) => {
    onChange([...goals, goal]);
    reset();
  };

  const handleRemove = (index: number) => {
    onChange(goals.filter((_, i) => i !== index));
  };

  const handleChange = ({ name, value }: OnChangeProps<any>) => setValue(name as any, value);

  React.useEffect(() => {
    if (currentGoals) onChange(currentGoals);
  }, []);

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex-between gap-3">
          <TextField
            placeholder="Meta"
            name="description"
            onChange={handleChange}
            value={watch('description')}
          />

          <TextField
            placeholder="Alvo"
            type="number"
            name="target"
            onChange={handleChange}
            value={watch('target') || ''}
            min={1}
          />

          <CircularBtn
            icon="plus"
            size="md"
            bg="tertiary"
            onClick={handleSubmit(handleAdd)}
          />
        </div>

        <Table
          headers={[
            {
              key: 'description',
              label: 'Meta',
            },
            {
              key: 'target',
              label: 'Alvo',
            },
          ]}
          data={goals}
          actions={[
            {
              icon: 'delete',
              onClick: handleRemove,
            },
          ]}
          className="mt-4"
          bg="tertiary"
        />
      </div>
    </React.Fragment>
  );
}
