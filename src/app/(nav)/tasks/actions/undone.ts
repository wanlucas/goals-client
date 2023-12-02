'use server';

import api from '@/services/api';

export default async function undone(id: string) {
  try {
    await api.task.uncomplete(id);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
