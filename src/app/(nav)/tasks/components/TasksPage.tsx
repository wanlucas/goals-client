'use client';

import { TaskWithRecord } from '@/services/api/task';
import NavigationBtn from '@/components/NavigationBtn';
import React from 'react';
import CurrentHour from '@/components/CurrentHour';
import moment from 'moment';
import TaskList from './TaskList';

interface TasksPageProps {
  tasks: TaskWithRecord[];
}

export default function TasksPage({ tasks }: TasksPageProps) {
  const [currentTime, setCurrentTime] = React.useState(moment().format('H:mm:ss'));

  return (
    <React.Fragment>
      <div className='flex-between p-4'>
        <div>
          <h1 className='font-bold text-xl'>Tarefas de hoje</h1>
          <p className='text-sm'>{moment().locale('pt-br').format('D [de] MMMM')}</p>

          <CurrentHour className='text-color3-200 text-xs' onChange={setCurrentTime} />
        </div>

        <NavigationBtn to='/tasks/create' icon='plus' />
      </div>

      <div className='h-full bg-bg-200 p-4 rounded-t-3xl'>
        <TaskList tasks={tasks} currentTime={currentTime} />
      </div>
    </React.Fragment>
  );
}
