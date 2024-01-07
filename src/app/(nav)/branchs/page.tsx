import React from 'react';
import api from '@/services/api';
import NavigationBtn from '@/components/NavigationBtn';
import BranchBtn from './components/BranchBtn';

export default async function Branchs() {
  const { data: branchs } = await api.branch.findAll();

  return (
    <React.Fragment>
      <div className='flex-between p-4'>
        <div>
          <h1 className='font-bold text-xl'>Branchs</h1>
          <p className='text-sm'>{`Total: ${branchs.length}`}</p>
        </div>

        <NavigationBtn to='/branchs/create' icon='plus' />
      </div>

      <ul className='flex flex-col gap-2 bg-bg-200 py-6 px-4 rounded-t-3xl h-full'>
        {branchs?.map((branch) => (
          <BranchBtn key={branch.id} branch={branch} />
        ))}
      </ul>
    </React.Fragment>
  );
}
