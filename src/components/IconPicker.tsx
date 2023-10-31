import icons from '@/utils/icons';
import React from 'react';
import text from '@/utils/text';
import Icon from './Icon';
import UiIcon from './UiIcon';
import BottomBar from './BottomBar';

interface IconPaletteProps {
  onChange: (icon: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const allIcons = Object.keys(icons);

export function IconPalette({ onChange, onClose, isOpen }: IconPaletteProps) {
  const handleSelect = (icon: string) => {
    onChange(icon);
    onClose();
  };

  return (
    <BottomBar isOpen={isOpen} onClose={onClose}>
      <ul className='flex flex-wrap px-4 py-8'>
        {allIcons.map((icon: string) => (
          <li
            key={icon}
            onClick={() => handleSelect(icon)}
            className='justify-center flex w-[20%] sm:w-[10%] md:w-[6.66%] h-[50px] active:scale-110 hover:scale-110'
          >
            <Icon id={icon} size={35} />
          </li>
        ))}
      </ul>
    </BottomBar>
  );
}

interface IconPickerProps {
  onChange: (icon: string) => void;
  className?: string;
  value?: string;
}

export default function IconPicker({
  onChange,
  value = '',
  className = '',
}: IconPickerProps) {
  const [paletteIsOpen, setPaletteIsOpen] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState(value);

  const handleChange = (icon: string) => {
    setSelectedIcon(icon);
    onChange(icon);
  };

  return (
    <React.Fragment>
      <button
        type='button'
        onClick={() => setPaletteIsOpen(true)}
        className={text.join(
          'bg-bg p-4 rounded-2xl flex-between hover:bg-bg-100 w-full',
          className,
        )}
      >
        <Icon id={selectedIcon} />
        <UiIcon id='arrowRight' />
      </button>

      <IconPalette
        isOpen={paletteIsOpen}
        onChange={handleChange}
        onClose={() => setPaletteIsOpen(false)}
      />
    </React.Fragment>
  );
}
