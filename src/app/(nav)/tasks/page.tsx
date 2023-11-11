import React from 'react';
import api from '@/services/api';
import moment from 'moment';
import NavigationBtn from '@/components/NavigationBtn';
import TaskList from './components/TaskList';
import CurrentHour from '../../../components/CurrentHour';

export default async function Home() {
  const { data: tasks } = await api.task.findCurrent();

  return (
    <React.Fragment>
      <div className='flex-between p-4'>
        <div>
          <h1 className='font-bold text-xl'>Tarefas de hoje</h1>
          <p className='text-sm'>{moment().locale('pt-br').format('D [de] MMMM')}</p>
          <CurrentHour className='text-color3-200 text-xs' />
        </div>

        <NavigationBtn to='/tasks/create' icon='plus' />
      </div>

      <div className='h-full bg-bg-200 p-4 rounded-t-3xl'>
        <TaskList tasks={tasks} />
      </div>
    </React.Fragment>
  );
}
