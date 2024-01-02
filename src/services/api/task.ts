import requests from '@/utils/requests';

export interface Task {
  id: string;
  description: string;
  goalId: string;
  duration: number | null;
  quantity: number | null;
  time: string | null;
  frequency: string;
  runAt: number[] | null;
}

export interface TaskRecord {
  duration: number | null;
  quantity: number | null;
  done: boolean
}

export interface TaskWithRecord extends Task {
  record?: TaskRecord;
}

export type CreateTaskPayload = Omit<Task, 'id'>;

const findCurrent = () => requests.get<TaskWithRecord[]>('task/current');

const register = (taskId: string, record: Partial<TaskRecord>) => requests.put(`task/${taskId}/register`, { body: record });

const complete = (id: string) => requests.put(`task/${id}/done`);

const uncomplete = (id: string) => requests.put(`task/${id}/undone`);

const create = (payload: CreateTaskPayload) => requests.post('task', { body: payload });

export default {
  findCurrent,
  register,
  complete,
  uncomplete,
  create,
};
