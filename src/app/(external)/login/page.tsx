'use client';

import { z } from 'zod';
import Form from '@/components/Form';
import TextField, { OnChangeProps } from '@/components/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import submitLogin from './actions/submitLogin';

const LoginSchema = z.object({
  name: z.string().min(3).max(30),
  password: z.string().min(8).max(30),
});

export default function Login() {
  const router = useRouter();

  const onSubmit = async (formData: any) => {
    try {
      const { success } = await submitLogin(formData);

      if (!success) throw new Error('Login inválido');

      router.push('/tasks');
    } catch (error) {
      console.log(error);
    }
  };

  const { handleSubmit, setValue } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleChange = ({ name, value }: OnChangeProps) => setValue(name, value);

  return (
    <div className="flex-centralized h-full">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-bg p-4 rounded-md border-primary border-2 w-72"
      >
        <TextField name="name" placeholder="Nome" onChange={handleChange} />

        <TextField
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleChange}
        />

        <button type="submit" className="text-white">
          Login
        </button>
      </Form>
    </div>
  );
}
