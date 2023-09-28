'use server';

import api from '@/services/api';
import { cookies } from 'next/headers';

export async function submitLogin(formData: any) {
  const { data, status } = await api.public.login(formData);

  if (status === 200) {
    const cookieStore = cookies();

    cookieStore.set('token', data.token);
    cookieStore.set('userId', data.id);
  }

  return { data, status };
}
