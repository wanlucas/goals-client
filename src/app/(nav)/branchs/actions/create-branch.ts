'use server';

import api from '@/services/api';
import { CreateBranch } from '@/services/api/branch';
import { cookies } from 'next/headers';

export default async function createBranch(payload: Omit<CreateBranch, 'userId'>) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) return { success: false };

    await api.branch.create({ ...payload, userId });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
