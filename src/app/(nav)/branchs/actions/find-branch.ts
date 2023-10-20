'use server';

import api from '@/services/api';

export default async function findBranch(id: string) {
  try {
    const { data } = await api.branch.findById(id);
    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
}
