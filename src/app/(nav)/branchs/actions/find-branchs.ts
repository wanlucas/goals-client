'use server';

import api from '@/services/api';

export default async function findBranchs() {
  try {
    const { data } = await api.branch.findAll();
    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
}
