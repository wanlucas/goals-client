import React from 'react';
import text from '@/utils/text';
import { OnChangeProps } from './Select';

type Value = string | number;

interface ButtonGridProps {
  name: string;
  className?: string;
  multiple?: boolean;
  onChange: (event: OnChangeProps<Value | Value[]>) => void;
  options: {
    label: string;
    value: Value;
  }[];
}

export default function ButtonGrid({
  options,
  name,
  className,
  multiple = false,
  onChange = () => {},
}: ButtonGridProps) {
  const [selecteds, setSelecteds] = React.useState<Value[]>([]);

  const isSelected = (value: Value) => selecteds.includes(value);

  const handleRemove = (value: Value) => setSelecteds(
    selecteds.filter((selected) => selected !== value),
  );

  const handleChange = (option: { label: string, value: Value }) => {
    if (multiple) {
      if (isSelected(option.value)) handleRemove(option.value);
      else setSelecteds([...selecteds, option.value]);
    } else if (isSelected(option.value)) setSelecteds([]);
    else setSelecteds([option.value]);
  };

  React.useEffect(() => {
    onChange({ name, value: multiple ? selecteds : selecteds[0] });
  }, [selecteds]);

  return (
    <div className="flex w-full justify-between rounded-md overflow-hidden">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleChange(option)}
          className={text.join(
            'bg-bg py-2 flex-1 hover:scale-105 active:scale-100 transition-all duration-75',
            isSelected(option.value) ? 'bg-color5' : 'bg-bg',
            className,
          )}
        >
          <span className="text-white text-base font-bold">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
