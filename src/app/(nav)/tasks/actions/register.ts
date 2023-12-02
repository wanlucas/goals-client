'use server';

import api from '@/services/api';
import { TaskRecord } from '@/services/api/task';

export default async function register(id: string, record: Partial<TaskRecord>) {
  try {
    await api.task.register(id, record);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
