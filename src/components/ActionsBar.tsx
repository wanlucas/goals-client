import uiIcons from '@/utils/ui-Icons';
import React from 'react';
import text from '@/utils/text';
import UiIcon from './UiIcon';

interface ActionsBarProps {
  icon?: keyof typeof uiIcons;
  size?: number;
  className?: string;
  actions: {
    title: string;
    onClick: () => void;
    icon: keyof typeof uiIcons;
    className?: string;
  }[];
}

export default function ActionsBar({
  actions,
  className,
  icon = 'options',
  size = 26,
}: ActionsBarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const handleAction = (action: () => void) => {
    handleClose();
    action();
  };

  // TODO - REMOVER CAMADA BTN
  return (
    <React.Fragment>
      <button onClick={handleOpen} className={className}>
        <UiIcon id={icon} size={size} />
      </button>

      {isOpen && (
        <div className='fixed inset-0 w-full h-full m-auto z-50 bg-slate-600/40'>
          <div className='absolute w-full inset-x-0 bottom-0 fade-to-top'>
            <div className='rounded-t-3xl flex justify-end px-5 py-2'>
              <button onClick={handleClose} className='hover:scale-105'>
                <UiIcon id='close' size={20} bg='primary' />
              </button>
            </div>

            <div className='bg-bg rounded-t-3xl overflow-hidden'>
              {actions.map((action) => (
                <button
                  key={action.title}
                  onClick={() => handleAction(action.onClick)}
                  className={text.join(
                    'w-full py-4 flex items-center justify-between px-5 hover:bg-bg-100 active:scale-95',
                    action.className,
                  )}
                >
                  <p>{action.title}</p>
                  <UiIcon id={action.icon} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
