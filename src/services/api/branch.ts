import requests from '@/utils/requests';
import { revalidatePath } from 'next/cache';
import { GoalWithTasks } from './goal';

export interface Branch {
  id: string;
  userId: string;
  name: string;
  icon: string;
  class: number;
}

export interface BranchWithGoalsAndTasks extends Branch {
  goals?: GoalWithTasks[];
}

export interface BranchWithSummary extends Branch {
  completedGoals: number;
  completedTasks: number;
}

export type CreateBranchPayload = Omit<Branch, 'xp' | 'id'>;

export type UpdateBranchPayload = Partial<Branch>;

const findAll = () => requests.get<BranchWithSummary[]>('branch');

const findById = (id: string) => requests.get<BranchWithGoalsAndTasks>(`branch/${id}`);

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
