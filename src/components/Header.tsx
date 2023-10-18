import CircularBtn from './NavigationBtn';
import UiIcon from './UiIcon';

interface HeaderProps {
  previousPath?: string;
  title: string;
}

export default function Header({ title, previousPath }: HeaderProps) {
  return (
    <header className='bg-bg flex-between p-3'>
      {previousPath ? (
       <CircularBtn to='/branchs'>
          <UiIcon id="arrowLeft" size={20} />
       </CircularBtn>
      ) : (
        <CircularBtn to='/' icon='home' />
      )}

      <p className='font-bold text-xl'>{ title }</p>
    </header>
  );
}
