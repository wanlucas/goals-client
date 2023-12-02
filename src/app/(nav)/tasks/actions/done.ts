'use server';

import api from '@/services/api';

export default async function done(id: string) {
  try {
    await api.task.complete(id);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
