'use server';

import api from '@/services/api';

export default async function findCurrentTasks() {
  try {
    const { data } = await api.task.findCurrent();

    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
}
