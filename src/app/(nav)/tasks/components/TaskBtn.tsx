'use client';

import { TaskWithStatus } from '@/services/api/task';
import React from 'react';
import Checkbox from '@/components/Checkbox';
import text from '@/utils/text';
import toggleTask from '../actions/toggle-task';

interface TaskBtnProps {
  task: TaskWithStatus;
  toggle: (id: string, to: boolean) => void;
  className?: string;
}

export default function TaskBtn({ task, toggle, className }: TaskBtnProps) {
  const handleClick = async () => {
    const to = !task.done;

    toggle(task.id, to);
    const { success } = await toggleTask(task.id, to);
    if (!success) toggle(task.id, !to);
  };

  return (
    <li className='my-2'>
      <button
        onClick={handleClick}
        className={text.join(
          'p-4 rounded-lg w-full flex-between',
          task.done ? 'bg-bg-100' : 'bg-bg',
          className,
        )}
      >
        <Checkbox checked={task.done} />

        <div className='text-right'>
          <p>{task.description}</p>

          <div className='text-sm flex justify-end gap-2 text-gray-400'>
            {task.duration && <p>{`${task.duration} minutos`}</p>}
            {task.quantity && <p>{`${task.quantity} vezes`}</p>}
          </div>
        </div>
      </button>
    </li>
  );
}
