import Select from '@/components/Select';
import TextField, { OnChangeProps } from '@/components/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { DraftModeProvider } from 'next/dist/server/async-storage/draft-mode-provider';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FrequencyInput from './FrequencyInput';

const createTaskSchema = z.object({
  description: z.string().min(3).max(200),
  goalId: z.string().uuid(),
  duration: z.number().nullable(),
  quantity: z.number().nullable(),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  time: z.string().length(5).nullable(),
  runAt: z.array(z.number()).min(0).max(31).nullable(),
});

const updateTaskSchema = createTaskSchema.deepPartial();

interface TaskFormProps {
  onSubmit: (payload: any) => void;
  update?: boolean;
  defaultValues?: z.infer<typeof updateTaskSchema>;
}

export default function TaskForm({
  onSubmit,
  defaultValues,
  update,
}: TaskFormProps) {
  const {
    handleSubmit, setValue, watch, reset,
  } = useForm({
    resolver: zodResolver(update ? updateTaskSchema : createTaskSchema),
    defaultValues,
  });

  const handleChange = ({ name, value }: OnChangeProps<any>) => setValue(name, value);

  return (
    <React.Fragment>
      <div>
        <Select
          label="Frequência"
          name="frequency"
          onChange={handleChange}
          options={[
            { label: 'Diário', value: 'daily' },
            { label: 'Semanal', value: 'weekly' },
            { label: 'Mensal', value: 'monthly' },
          ]}
        />

        <FrequencyInput
          frequency='weekly'
          onChange={() => {}}
        />
      </div>

      <TextField
        name="description"
        placeholder="Descrição"
        onChange={handleChange}
        value={watch('description')}
      />

      <TextField
        name="duration"
        placeholder="Duração"
        onChange={handleChange}
        value={watch('duration')}
      />

      <TextField
        name="quantity"
        placeholder="Quantidade"
        onChange={handleChange}
        value={watch('quantity')}
      />

      <TextField
        name="time"
        placeholder="Horário"
        onChange={handleChange}
        value={watch('time')}
      />
    </React.Fragment>
  );
}
