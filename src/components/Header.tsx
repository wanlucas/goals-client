import CircularBtn from './NavigationBtn';
import UiIcon from './UiIcon';

interface HeaderProps {
  previousPath?: string;
  title?: string;
  children?: React.ReactNode;
}

export default function Header({ title, previousPath, children }: HeaderProps) {
  return (
    <header className='bg-bg flex-between p-4 w-full'>
      {previousPath ? (
        <CircularBtn to='/branchs'>
          <UiIcon id='arrowLeft' size={20} />
        </CircularBtn>
      ) : (
        <CircularBtn to='/' icon='home' />
      )}

      <div className='flex gap-4'>
        {children}
        {title && <p className='font-bold text-xl'>{title}</p>}
      </div>
    </header>
  );
}
