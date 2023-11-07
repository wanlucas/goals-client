import React from 'react';
import api from '@/services/api';
import moment from 'moment';
import NavigationBtn from '@/components/NavigationBtn';
import TaskBtn from './components/TaskBtn';

export default async function Home() {
  const { data: tasks } = await api.task.findCurrent();

  return (
    <React.Fragment>
      <div className='flex-between p-4'>
        <div>
          <h1 className='font-bold text-xl'>Tarefas de hoje</h1>
          <p className='text-sm'>{moment().format('DD [de] MMM')}</p>
        </div>

        <NavigationBtn to='/tasks/create' icon='plus' />
      </div>

      <ul className='flex-col bg-bg-200 p-4 rounded-t-3xl h-full'>
        {tasks?.map((task) => (
          <TaskBtn key={task.id} task={task} />
        ))}
      </ul>
    </React.Fragment>
  );
}
