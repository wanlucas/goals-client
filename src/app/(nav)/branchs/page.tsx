import api from '@/services/api';
import BranchButton from './components/branchButton';

export default async function Branchs() {
  const { data: branchs } = await api.branch.findAll();

  return (
    <ul className='flex-centralized-column'>
      {branchs?.reduce((arr, cur) => [...arr, cur, cur, cur, cur], []).map((branch) => <BranchButton key={branch.id} branch={branch} />)}
    </ul>
  );
}
