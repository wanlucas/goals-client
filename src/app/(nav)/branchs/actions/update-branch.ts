'use server';

import api from '@/services/api';
import { UpdateBranchPayload } from '@/services/api/branch';

export default async function updateBranch(id: string, payload: UpdateBranchPayload) {
  try {
    await api.branch.update(id, payload);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
