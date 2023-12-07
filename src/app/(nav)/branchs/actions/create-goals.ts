'use server';

import api from '@/services/api';
import { BulkCreateGoalPayload } from '@/services/api/goal';

export default async function createGoals(payload: BulkCreateGoalPayload) {
  try {
    await api.goal.bulkCreate(payload);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
