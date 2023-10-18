import { get, post } from '@/utils/requests';
import { revalidatePath } from 'next/cache';

export interface Branch {
  id: string;
  userId: string;
  name: string;
  xp: number;
  icon: string;
}

const findAll = () => get<Branch[]>('branch');

export type CreateBranch = Omit<Branch, 'xp' | 'id'>;

const create = (payload: CreateBranch) => {
  revalidatePath('/branchs');
  return post('branch', { body: payload });
};

export default {
  findAll,
  create,
};
