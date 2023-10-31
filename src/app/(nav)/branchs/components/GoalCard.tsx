import { Goal } from '@/services/api/goals';
import text from '@/utils/text';
import { LinearProgress } from '@mui/material';

interface GoalCardProps {
  goal: Goal;
}

const colorsByDifficulty = [
  'text-green-600',
  'text-green-300',
  'text-blue-200',
  'text-blue-300',
  'text-blue-400',
  'text-purple-300',
  'text-purple-400',
  'text-purple-500',
  'text-red-400',
  'text-red-600',
];

export default function GoalCard({ goal }: GoalCardProps) {
  const color = colorsByDifficulty[goal.difficulty - 1] as any;

  return (
    <li className='flex-between p-4 min-h-[70px] my-3 rounded-t-lg bg-bg text-sm relative'>
      <p className='font-bold'>{`${goal.score} / ${goal.target}`}</p>
      <p className='max-w-[60%] text-right'>{goal.description}</p>

      <LinearProgress
        value={(goal.score / goal.target) * 100}
        variant='determinate'
        color='inherit'
        className={text.join(
          'absolute bottom-0 left-0 right-0 h-[3px]',
          color,
        )}
      />
    </li>
  );
}
