import text from '@/utils/text';
import CircularBtn from './NavigationBtn';
import UiIcon from './UiIcon';

interface HeaderProps {
  previousPath?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Header({
  title, previousPath, children, className,
}: HeaderProps) {
  return (
    <header className={text.join(
      'bg-bg flex-between p-4 w-full',
      className,
    )}>
      {previousPath ? (
        <CircularBtn to={previousPath}>
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
