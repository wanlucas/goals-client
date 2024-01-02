'use server';

import api from '@/services/api';
import { CreateTaskPayload } from '@/services/api/task';

export default async function createTask(payload: CreateTaskPayload) {
  try {
    await api.task.create(payload);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
