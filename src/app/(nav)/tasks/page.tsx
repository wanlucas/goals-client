import React from 'react';
import api from '@/services/api';
import TasksPage from './components/TasksPage';

export default async function Home() {
  const { data: tasks } = await api.task.findCurrent();

  return (
    <React.Fragment>
      <TasksPage tasks={tasks} />
    </React.Fragment>
  );
}
