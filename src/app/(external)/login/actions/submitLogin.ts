'use server';

import api from '@/services/api';
import { cookies } from 'next/headers';

export default async function submitLogin(formData: any) {
  try {
    const { data } = await api.public.login(formData);

    const cookieStore = cookies();

    cookieStore.set('token', data.token);
    cookieStore.set('userId', data.id);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
