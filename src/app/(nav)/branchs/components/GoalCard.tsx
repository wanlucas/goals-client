'use client';

import UiIcon from '@/components/UiIcon';
import text from '@/utils/text';
import { LinearProgress } from '@mui/material';
import { Goal } from '@/services/api/goal';
import React from 'react';

interface GoalCardProps {
  goal: Goal;
}

// TODO - desativar botão caso não existam tasks

export default function GoalCard({ goal }: GoalCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <li className='my-3'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex-between w-full p-4 min-h-[70px] rounded-t-lg bg-bg text-sm relative hover:bg-bg-100 active:bg-bg-100'
      >
        <p className='font-bold whitespace-nowrap'>{`${goal.score} / ${goal.target}`}</p>

        <div className='flex justify-end items-center max-w-[60%] gap-2'>
          <p className='text-right'>{goal.description}</p>

          <UiIcon
            id='arrowRight'
            size={18}
            className={text.join('transition-all', isOpen && 'rotate-90')}
          />
        </div>

        <LinearProgress
          value={(goal.score / goal.target) * 100}
          variant='determinate'
          color='inherit'
          className='absolute bottom-0 left-0 right-0 h-[5px] text-color3'
        />
      </button>

      <ul
        className={text.join(
          'bg-bg-100 rounded-b-lg px-4 text-left overflow-y-scroll transition-all',
          isOpen ? 'max-h-40 py-2' : 'max-h-0',
        )}
      >
        {goal.tasks.map((task) => (
          <li key={task.id} className='flex-between'>
            <p key={task.id} className='text-xs my-3'>
              {text.firstUpper(task.description)}
            </p>

            <div className='text-xs flex gap-2 text-gray-400'>
              {task.duration && <p>{`${task.duration} minutos`}</p>}
              {task.quantity && <p>{`${task.quantity} vezes`}</p>}
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}
