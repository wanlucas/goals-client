'use server';

import api from '@/services/api';
import { CreateBranchPayload } from '@/services/api/branch';
import { cookies } from 'next/headers';

export default async function createBranch(payload: Omit<CreateBranchPayload, 'userId'>) {
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
