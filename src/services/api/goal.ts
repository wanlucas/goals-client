import requests from '@/utils/requests';
import { Task } from './task';

export interface Goal {
  id: string;
  description: string;
  target: number;
  score: number;
  difficulty: number;
  tasks: Task[];
}

export type CreateGoalPayload = Omit<Goal, 'id' | 'score' | 'tasks'>;

export interface BulkCreateGoalPayload {
  goals: CreateGoalPayload[];
  branchId: string;
}

const bulkCreate = (payload: BulkCreateGoalPayload) => requests.post('goal/bulk', { body: payload });

const bulkDelete = (ids: string[]) => requests.remove('goal/bulk', { body: ids });

const findAllByBranch = (branchId: string) => requests.get<Goal[]>(`goal/branch/${branchId}`);

export default {
  bulkCreate,
  bulkDelete,
  findAllByBranch,
};
