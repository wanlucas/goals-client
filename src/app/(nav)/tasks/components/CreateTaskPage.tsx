export default function CreateTaskPage() {
  return (
      <div className='flex flex-col h-full'>
      <Header title='Criar nova task' previousPath='/tasks' />
      <BranchForm onSubmit={handleSubmit} />
    </div>
  );
}
