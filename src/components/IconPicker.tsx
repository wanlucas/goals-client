import icons from '@/utils/icons';
import React from 'react';
import text from '@/utils/text';
import Icon from './Icon';
import UiIcon from './UiIcon';

interface IconPaletteProps {
  onChange: (icon: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const allIcons = Object.keys(icons);
const iconSize = 35;

export function IconPalette({ onChange, onClose, isOpen }: IconPaletteProps) {
  const handleSelect = (icon: string) => {
    onChange(icon);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ul className='flex flex-wrap h-2/5 rounded-3xl bg-bg p-4 fixed bottom-0 left-0 right-0 z-50 overflow-auto fade-to-top'>
      {allIcons.map((icon: string) => (
          <li
            key={icon}
            onClick={() => handleSelect(icon)}
            className='justify-center flex w-[20%] sm:w-[10%] md:w-[6.66%] h-[50px] active:scale-110 hover:scale-110'
          >
            <Icon id={icon} size={iconSize} />
          </li>
      ))}
    </ul>
  );
}

interface IconPickerProps {
  onChange: (icon: string) => void;
  className?: string;
}

export default function IconPicker({ onChange, className = '' }: IconPickerProps) {
  const [paletteIsOpen, setPaletteIsOpen] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState('');

  const handleChange = (icon: string) => {
    setSelectedIcon(icon);
    onChange(icon);
  };

  return (
    <React.Fragment>
      <button
        onClick={() => setPaletteIsOpen(true)}
        className={text.join('bg-bg p-4 rounded-2xl flex-between hover:bg-bg-100 w-full', className)}
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
