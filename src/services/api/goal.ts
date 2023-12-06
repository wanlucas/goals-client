import { Task } from './task';

export interface Goal {
  id: string;
  description: string;
  target: number;
  score: number;
  difficulty: number;
  tasks: Task[];
}

export type CreateGoal = Omit<Goal, 'id' | 'score' | 'tasks'>;
