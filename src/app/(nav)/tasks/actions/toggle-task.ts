'use server';

import api from '@/services/api';

export default async function toggleTask(id: string, done: boolean) {
  try {
    if (done) await api.task.complete(id);
    else await api.task.uncomplete(id);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
