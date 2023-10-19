'use server';

import api from '@/services/api';

export default async function removeBranch(id: string) {
  try {
    await api.branch.remove(id);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
