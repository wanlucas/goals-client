import requests from '@/utils/requests';
import { revalidatePath } from 'next/cache';

export interface Branch {
  id: string;
  userId: string;
  name: string;
  xp: number;
  icon: string;
}

const findAll = () => requests.get<Branch[]>('branch');

export type CreateBranch = Omit<Branch, 'xp' | 'id'>;

const create = (payload: CreateBranch) => {
  revalidatePath('/branchs');
  return requests.post('branch', { body: payload });
};

const remove = (id: string) => {
  revalidatePath('/branchs');
  return requests.remove(`branch/${id}`);
};

export default {
  findAll,
  create,
  remove,
};
