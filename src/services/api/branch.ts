import { get } from '@/utils/requests';

export interface Branch {
  id: string;
  userId: string;
  name: string;
  xp: number;
}

type FindAllOutput = Branch[];

const findAll = () => get<FindAllOutput>('branch');

export default {
  findAll,
};
