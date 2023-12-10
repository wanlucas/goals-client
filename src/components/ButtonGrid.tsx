import React from 'react';
import text from '@/utils/text';
import { OnChangeProps } from './Select';

interface ButtonGridProps {
  defaultLabel?: string;
  name: string;
  className?: string;
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
  className,
  onChange = () => {},
}: ButtonGridProps) {
  const [selected, setSelected] = React.useState(() => {
    if (!defaultLabel) return '';

    const found = options.find((option) => option.label === defaultLabel);

    if (!found) return '';

    onChange({ name, value: found.value });
    return found.label;
  });

  return (
    <div className="flex w-full rounded-md overflow-hidden">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            setSelected(option.label);
            onChange({ name, value: option.value });
          }}
          className={text.join(
            'bg-bg py-2 px-4 grow hover:bg-color3',
            selected === option.label ? 'bg-color3' : 'bg-bg',
            className,
          )}
        >
          <span className="text-white text-base font-bold">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
