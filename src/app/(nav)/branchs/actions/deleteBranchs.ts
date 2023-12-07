'use server';

import api from '@/services/api';

export default async function deleteBranchs(ids: string[]) {
  try {
    await api.goal.bulkDelete(ids);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
