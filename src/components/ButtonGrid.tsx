import React from 'react';
import { OnChangeProps } from './Select';
import text from '@/utils/text';

interface ButtonGridProps {
  defaultLabel?: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange?: (event: OnChangeProps) => void;
}

export default function ButtonGrid({
  options,
  name,
  defaultLabel,
  onChange = () => {},
}: ButtonGridProps) {
  const [selected, setSelected] = React.useState(() => {
    if (defaultLabel) {
      const found = options.find((option) => option.label === defaultLabel);

      if (!found) return '';

      onChange({ name: '', value: found.value });
      return found.label;
    }

    return '';
  });

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            setSelected(option.label);
            onChange({ name, value: option.value });
          }}
          className={text.join(
            'bg-bg p-4 rounded-md hover:bg-color3 active:bg-color3',
            selected === option.label ? 'bg-color3' : 'bg-bg',
          )}
        >
          <span className="text-white text-base font-bold">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
