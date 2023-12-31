'use client';

import NavigationBtn from '@/components/NavigationBtn';
import React from 'react';
import CurrentHour from '@/components/CurrentHour';
import moment from 'moment';
import useRequest from '@/hooks/useRequest';
import Skeleton from '@/components/Skeleton';
import { TaskWithRecord } from '@/services/api/task';
import TaskList from './components/TaskList';
import findCurrentTasks from './actions/find-current-tasks';

export default function TasksPage() {
  const [currentTime, setCurrentTime] = React.useState(
    moment().format('H:mm:ss'),
  );

  const {
    data: tasks,
    refetch: updateTasks,
    isLoading,
  } = useRequest<TaskWithRecord[]>({
    getData: findCurrentTasks,
    defaultData: [],
  });

  return (
    <React.Fragment>
      <div className="flex-between p-4">
        <div>
          <h1 className="font-bold text-xl">Tarefas de hoje</h1>
          <p className="text-sm">
            {moment().locale('pt-br').format('D [de] MMMM')}
          </p>

          <CurrentHour
            className="text-color3-200 text-xs"
            onChange={setCurrentTime}
          />
        </div>

        <NavigationBtn to="/tasks/create" icon="plus" />
      </div>

      <div className="h-full bg-bg-200 p-4 rounded-t-3xl">
        <Skeleton isLoading={isLoading}>
          <TaskList
            tasks={tasks}
            currentTime={currentTime}
            refresh={updateTasks}
          />
        </Skeleton>
      </div>
    </React.Fragment>
  );
}
