import requests from '@/utils/requests';

export interface Task {
  id: string;
  description: string;
  goalId: string;
  duration: number | null;
  quantity: number | null;
  time: string | null;
  frequency: string;
  runAt: any;
}

export interface TaskWithStatus extends Task {
  done: boolean;
}

const findCurrent = () => requests.get<TaskWithStatus[]>('task/current');

const complete = (id: string) => requests.put(`task/${id}/done`);

const uncomplete = (id: string) => requests.put(`task/${id}/undone`);

export default {
  findCurrent,
  complete,
  uncomplete,
};
