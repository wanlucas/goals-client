import React from 'react';
import TextField, { OnChangeProps } from '@/components/TextField';
import { CreateGoalPayload } from '@/services/api/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import CircularBtn from '@/components/CircularBtn';
import QuantityController from '@/components/QuantityController';
import useRequest from '@/hooks/useRequest';
import findBranch from '../../actions/find-branch';

export const createGoalSchema = z.object({
  description: z.string().min(3).max(200),
  target: z.number().min(1),
  difficulty: z.number().min(1).max(10),
});

interface GoalsFormProps {
  onAdd: (goals: CreateGoalPayload) => void;
  branchId?: string;
}

const defaultValues = {
  description: '',
  target: 0,
  difficulty: 5,
};

export default function GoalsForm({ onAdd, branchId }: GoalsFormProps) {
  const { data: branch } = useRequest({
    getData: branchId ? () => findBranch(branchId) : undefined,
    defaultData: [],
  });

  const {
    handleSubmit, setValue, watch, reset,
  } = useForm({
    resolver: zodResolver(createGoalSchema),
    defaultValues,
  });

  const handleAdd = (goal: CreateGoalPayload) => {
    onAdd(goal);
    reset();
  };

  const handleChange = ({ name, value }: OnChangeProps<any>) => setValue(name, value);

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

          <CircularBtn icon="plus" size="md" bg="tertiary" onClick={handleSubmit(onAdd)} />
        </div>
      </div>
    </React.Fragment>
  );
}
