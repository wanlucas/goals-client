'use client';

import { TaskWithRecord } from '@/services/api/task';
import React from 'react';
import Checkbox from '@/components/Checkbox';
import text from '@/utils/text';
import undone from '../actions/undone';

interface TaskBtnProps {
  task: TaskWithRecord;
  className?: string;
  toggle: (id: string, to: boolean) => {
    undo: () => void
  };
}

export default function TaskBtn({
  task,
  toggle,
  className,
}: TaskBtnProps) {
  const handleClick = async () => {
    const { undo } = toggle(task.id, false);

    const { success } = await undone(task.id);

    if (!success) undo();
  };

  return (
    <li className='my-2 rounded-lg'>
      <button
        onClick={handleClick}
        className={text.join(
          'p-4 h-16 rounded-lg w-full flex-between bg-bg-100',
          className,
        )}
      >
        <Checkbox checked={true} />

        <div className='text-right text-sm'>
          <p>{text.firstUpper(task.description)}</p>

          <div className='text-xs text-gray-400 flex justify-end gap-2'>
            {task.duration && <p>{`${task.duration} minutos`}</p>}
            {task.quantity && <p>{`${task.quantity} vezes`}</p>}
          </div>
        </div>
      </button>
    </li>
  );
}
