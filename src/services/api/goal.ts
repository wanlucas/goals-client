import { Task } from './task';

export interface Goal {
  id: string;
  description: string;
  target: number;
  score: number;
  difficulty: number;
  tasks: Task[];
}
