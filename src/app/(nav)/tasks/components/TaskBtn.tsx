'use client';

import { TaskWithStatus } from '@/services/api/task';
import React from 'react';
import Checkbox from '@/components/Checkbox';
import toggleTask from '../actions/toggle-task';

interface TaskBtnProps {
  task: TaskWithStatus;
}

export default function TaskBtn({ task }: TaskBtnProps) {
  const [done, setDone] = React.useState(task.done);

  const toggleDone = async () => {
    const to = !done;
    setDone(to);
    const { success } = await toggleTask(task.id, to);
    if (!success) setDone(!to);
  };

  return (
    <li className='my-2'>
      <button onClick={toggleDone} className='p-4 bg-bg rounded-lg w-full flex-between'>
        <Checkbox checked={done} />

        <p>{task.description}</p>
      </button>
    </li>
  );
}
