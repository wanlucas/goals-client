'use client';

import { z } from 'zod';
import Form from '@/components/Form';
import Button from '@/components/Button';
import TextField, { OnChangeProps } from '@/components/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import IconPicker from '@/components/IconPicker';
import { useForm } from 'react-hook-form';

const createBranchSchema = z.object({
  name: z.string().min(3).max(30),
  icon: z.string(),
});

const updateBranchSchema = z.object({
  name: z.string().min(3).max(30).optional(),
  icon: z.string().optional(),
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
      className='p-4 bg-bg-200 rounded-t-3xl flex-between-column flex-grow w-full'
    >
      <div className='w-full'>
        <IconPicker
          onChange={(icon: string) => setValue('icon', icon)}
          className='mb-4'
          value={watch('icon')}
        />

        <TextField
          name='name'
          placeholder='Nome da branch'
          onChange={handleChange}
          value={watch('name')}
        />
      </div>

      <div className='flex-between gap-6 w-full mt-auto'>
        <Button
          onClick={navigateToBranchs}
          title='Cancelar'
          className='w-1/2'
        />

        <Button
          type='submit'
          title={update ? 'Salvar' : 'Criar'}
          color='secondary'
          className='w-1/2'
        />
      </div>
    </Form>
  );
}
