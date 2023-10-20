import requests from '@/utils/requests';
import { revalidatePath } from 'next/cache';

export interface Branch {
  id: string;
  userId: string;
  name: string;
  xp: number;
  icon: string;
}

export type CreateBranchPayload = Omit<Branch, 'xp' | 'id'>;

export type UpdateBranchPayload = Partial<Branch>;

const findAll = () => requests.get<Branch[]>('branch');

const findById = (id: string) => requests.get<Branch>(`branch/${id}`);

const create = (payload: CreateBranchPayload) => {
  revalidatePath('/branchs');
  return requests.post('branch', { body: payload });
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
