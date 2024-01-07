'use client';

import useCustomState from '@/hooks/useCustomState';
import React from 'react';
import { Task, TaskWithRecord } from '@/services/api/task';
import Divider from '@/components/Divider';
import TaskBtn from './TaskBtn';
import ActiveTaskBtn from './ActiveTaskBtn';

interface TaskListProps {
  tasks: TaskWithRecord[];
  currentTime: string;
  refresh: () => void;
}

export default function TaskList({ tasks, currentTime, refresh }: TaskListProps) {
  const [{ done, undone }, setTasks] = useCustomState({
    done: tasks.filter((task) => task.record?.done),
    undone: tasks.filter((task) => !task.record?.done),
  });

  const sortByTime = (arr: TaskWithRecord[]) => arr.sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;
    if (a.time === b.time) return 0;
    return a.time > b.time ? 1 : -1;
  });

  const complete = (id: string) => {
    const target = undone.find((task: Task) => task.id === id);

    if (!target) throw new Error('Task not found');

    const record = {
      done: true,
      quantity: target.quantity,
      duration: target.duration,
      value: target.value,
    };

    return setTasks({
      undone: undone.filter((task) => task.id !== id),
      done: sortByTime([...done, { ...target, record }]),
    });
  };

  const uncomplete = (id: string) => {
    const target = done.find((task) => task.id === id);

    if (!target) throw new Error('Task not found');

    const record = {
      done: false,
      quantity: 0,
      duration: 0,
    };

    return setTasks({
      done: done.filter((task) => task.id !== id),
      undone: sortByTime([...undone, { ...target, record }]),
    });
  };

  const toggle = (id: string, to: boolean) => {
    if (to) return complete(id);
    return uncomplete(id);
  };

  return (
    <React.Fragment>
      <ul className='flex-col'>
        {undone?.map((task) => (
          <ActiveTaskBtn
            key={task.id}
            task={task}
            toggle={toggle}
            currentTime={currentTime}
            refresh={refresh}
          />
        ))}
      </ul>

      {done.length > 0 && undone.length > 0 && <Divider />}

      <ul className='flex-col'>
        {done?.map((task) => (
          <TaskBtn
            key={task.id}
            task={task}
            toggle={toggle}
            className='fade-to-top-alt'
          />
        ))}
      </ul>
    </React.Fragment>
  );
}
