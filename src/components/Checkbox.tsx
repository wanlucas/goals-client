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
      className='bg-white border-gray-500 rounded-full min-w-[13px] min-h-[13px] relative'
    >
      <div
        className={text.join(
          'w-0 h-0 bg-color3 rounded-full transition-all absolute-centralized',
          checked ? 'min-w-[9px] min-h-[9px]' : 'w-0 h-0',
        )}
      />
    </button>
  );
}
