'use server';

import api from '@/services/api';

export default async function findGoals() {
  try {
    const { data } = await api.goal.findAll();
    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
}
