import React from 'react';
import TextField, { OnChangeProps } from '@/components/TextField';
import { CreateGoalPayload } from '@/services/api/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import CircularBtn from '@/components/CircularBtn';
import QuantityController from '@/components/QuantityController';
import Table from '@/components/Table';

export const createGoalSchema = z.object({
  description: z.string().min(3).max(200),
  target: z.number().min(1),
  difficulty: z.number().min(1).max(10),
});

interface GoalsFormProps {
  onChange: (goals: CreateGoalPayload[]) => void;
  goals?: CreateGoalPayload[];
  currentGoals?: CreateGoalPayload[];
}

const defaultValues = {
  description: '',
  target: 0,
  difficulty: 5,
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

  const handleChange = ({ name, value }: OnChangeProps<any>) => setValue(name, value);

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

          <QuantityController
            max={10}
            min={1}
            quantity={watch('difficulty')}
            onChange={(quantity) => setValue('difficulty', quantity)}
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
            {
              key: 'difficulty',
              label: 'Nível',
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
