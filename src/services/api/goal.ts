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

const bulkCreate = (payload: CreateGoalPayload) => requests.post('goal', { body: payload });

const findAllByBranch = (branchId: string) => requests.get<Goal[]>(`goal/branch/${branchId}`);

export default {
  bulkCreate,
  findAllByBranch,
};
