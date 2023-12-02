'use client';

import { TaskWithRecord } from '@/services/api/task';
import React from 'react';
import Checkbox from '@/components/Checkbox';
import text from '@/utils/text';
import moment from 'moment';
import TaskController from './TaskController';

const timeStates = {
  late: 'text-secondary-100',
  current: 'text-color4',
  done: 'text-bg-100',
  undone: 'text-color3-100',
};

type State = keyof typeof timeStates;

interface TaskBtnProps {
  task: TaskWithRecord;
  toggle: (id: string, to: boolean) => void;
  currentTime?: string;
  className?: string;
}

export default function TaskBtn({
  task,
  toggle,
  currentTime,
  className,
}: TaskBtnProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [state, setState] = React.useState<State>('undone');

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const getState = ({ record, time }: TaskWithRecord): State => {
    const diff = moment(time, 'hh:mm').diff(moment(), 'minutes');
    const tolerance = 20;

    if (record?.done) return 'done';
    if (!time || diff > tolerance) return 'undone';
    if (diff < -tolerance) return 'late';
    return 'current';
  };

  React.useEffect(() => {
    setState(getState(task));
  }, [currentTime]);

  return (
    <li className='my-2 rounded-lg'>
      <button
        onClick={handleClick}
        className={text.join(
          'p-4 h-16 rounded-t-lg w-full flex-between',
          task.record?.done ? 'bg-bg-100' : 'bg-bg',
          className,
        )}
      >
        <Checkbox checked={Boolean(task.record?.done)} />

        <div className='text-right text-sm'>
          <p>{text.firstUpper(task.description)}</p>

          <div className='text-xs text-gray-400 flex justify-end gap-2'>
            {task.duration && <p>{`${task.duration} minutos`}</p>}
            {task.quantity && <p>{`${task.quantity} vezes`}</p>}
            {!task.done && task.time && (
              <p className={text.join('text-color3-200', timeStates[state])}>
                {task.time}
              </p>
            )}
          </div>
        </div>
      </button>

      <TaskController
        isOpen={isOpen}
        task={task}
        toggle={toggle}
        />
    </li>
  );
}
