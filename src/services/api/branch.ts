import requests from '@/utils/requests';
import { revalidatePath } from 'next/cache';
import { Goal } from './goal';

export interface Branch {
  id: string;
  userId: string;
  name: string;
  xp: number;
  icon: string;
}

export interface BranchWithGoals extends Branch {
  goals: Goal[];
}

export type CreateBranchPayload = Omit<Branch, 'xp' | 'id'>;

export type UpdateBranchPayload = Partial<Branch>;

const findAll = () => requests.get<Branch[]>('branch');

const findById = (id: string) => requests.get<BranchWithGoals>(`branch/${id}`);

const create = (payload: CreateBranchPayload) => {
  revalidatePath('/branchs');
  return requests.post<Branch>('branch', { body: payload });
};

const remove = (id: string) => {
  revalidatePath('/branchs');
  return requests.remove(`branch/${id}`);
};

const update = (id: string, payload: UpdateBranchPayload) => {
  revalidatePath('/branchs');
  return requests.put(`branch/${id}`, { body: payload });
};

export default {
  findAll,
  findById,
  create,
  remove,
  update,
};
