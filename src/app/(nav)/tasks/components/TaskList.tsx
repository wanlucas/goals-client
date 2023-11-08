'use client';

import { TaskWithStatus } from '@/services/api/task';
import React from 'react';
import Divider from '@/components/Divider';
import TaskBtn from './TaskBtn';

interface TaskListProps {
  tasks: TaskWithStatus[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [{ done, undone }, setTasks] = React.useState({
    done: tasks.filter((task) => task.done),
    undone: tasks.filter((task) => !task.done),
  });

  const complete = (id: string) => setTasks((current) => {
    const target = current.undone.find((task) => task.id === id);

    target!.done = true;
    return {
      undone: current.undone.filter((task) => !task.done),
      done: [...current.done, target!],
    };
  });

  const uncomplete = (id: string) => setTasks((current) => {
    const target = current.done.find((task) => task.id === id);

    target!.done = false;
    return {
      done: current.done.filter((task) => task.done),
      undone: [...current.undone, target!],
    };
  });

  const toggle = (id: string, to: boolean) => {
    if (to) complete(id);
    else uncomplete(id);
  };

  return (
    <React.Fragment>
      <ul className='flex-col'>
        {undone?.map((task) => (
          <TaskBtn key={task.id} task={task} toggle={toggle} />
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
