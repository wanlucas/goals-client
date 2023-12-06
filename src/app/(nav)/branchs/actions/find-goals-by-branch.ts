'use server';

import api from '@/services/api';

export default async function findBranch(branchId: string) {
  try {
    const { data } = await api.goal.findAllByBranch(branchId);
    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
}
