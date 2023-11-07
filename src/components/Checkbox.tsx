import text from '@/utils/text';
import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      onChange={() => onChange && onChange(!checked)}
      className='bg-white border-gray-500 rounded-full w-3 h-3 relative'
    >
      <div
        className={text.join(
          'bg-gray-500 w-[10px] h-[10px] rounded-full transition-all absolute-centralized',
          checked ? 'w-2 h-2' : 'w-0 h-0',
        )}
      />
    </button>
  );
}
