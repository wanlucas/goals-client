'use client';

import { Task, TaskWithRecord } from '@/services/api/task';
import React from 'react';
import moment from 'moment';
import Divider from '@/components/Divider';
import TaskBtn from './TaskBtn';

interface TaskListProps {
  tasks: TaskWithRecord[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [time, setTime] = React.useState(moment().format('HH:mm'));
  const [{ done, undone }, setTasks] = React.useState({
    done: tasks.filter((task) => task.record?.done),
    undone: tasks.filter((task) => !task.record?.done),
  });

  const sortByTime = (arr: TaskWithRecord[]) => arr.sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;
    if (a.time === b.time) return 0;
    return a.time > b.time ? 1 : -1;
  });

  const complete = (id: string) => setTasks((current) => {
    const target = current.undone.find((task: Task) => task.id === id);

    if (!target) return current;

    target.record = {
      done: true,
      quantity: target.quantity,
      duration: target.duration,
    };

    return {
      undone: current.undone.filter((task) => !task.record?.done),
      done: sortByTime([...current.done, target!]),
    };
  });

  const uncomplete = (id: string) => setTasks((current) => {
    const target = current.done.find((task) => task.id === id);

    if (!target) return current;

    target!.record = undefined;

    return {
      done: current.done.filter((task) => task.record?.done),
      undone: sortByTime([...current.undone, target!]),
    };
  });

  const toggle = (id: string, to: boolean) => {
    if (to) complete(id);
    else uncomplete(id);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('HH:mm'));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <ul className='flex-col'>
        {undone?.map((task) => (
          <TaskBtn
            key={task.id}
            task={task}
            toggle={toggle}
            currentTime={time}
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
