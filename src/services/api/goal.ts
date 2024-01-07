import requests from '@/utils/requests';
import { Task } from './task';

export interface Goal {
  id: string;
  description: string;
  target: number;
  score: number;
}

export interface GoalWithTasks extends Goal {
  tasks: Task[];
}

export type CreateGoalPayload = Omit<Goal, 'id' | 'score' | 'tasks'>;

export interface BulkCreateGoalPayload {
  goals: CreateGoalPayload[];
  branchId: string;
}

const findAll = () => requests.get<Goal[]>('goal');

const bulkCreate = (payload: BulkCreateGoalPayload) => requests.post('goal/bulk', { body: payload });

const bulkDelete = (ids: string[]) => requests.remove('goal/bulk', { body: ids });

const findAllByBranch = (branchId: string) => requests.get<Goal[]>(`goal/branch/${branchId}`);

export default {
  findAll,
  bulkCreate,
  bulkDelete,
  findAllByBranch,
};
