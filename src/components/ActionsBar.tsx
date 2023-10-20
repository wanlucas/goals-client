import uiIcons from '@/utils/ui-Icons';
import React from 'react';
import text from '@/utils/text';
import UiIcon from './UiIcon';
import BottomBar from './BottomBar';

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

      <BottomBar isOpen={isOpen} onClose={handleClose}>
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
      </BottomBar>
    </React.Fragment>
  );
}
