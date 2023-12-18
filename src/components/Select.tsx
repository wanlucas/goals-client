'use client';

import React from 'react';
import text from '@/utils/text';
import UiIcon from './UiIcon';
import Divider from './Divider';

export interface OnChangeProps<Value = string> {
  name: string;
  value: Value;
}

interface SelectProps {
  name: string;
  label: string;
  defaultLabel?: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange?: (event: OnChangeProps) => void;
}

export default function Select({
  name,
  label,
  options,
  defaultLabel,
  onChange = () => {},
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(() => {
    if (defaultLabel) {
      const found = options.find((option) => option.label === defaultLabel);

      if (!found) return '';

      onChange({ name, value: found.value });
      return found.label;
    }

    return '';
  });

  const handleSelect = (option: { label: string; value: string }) => {
    setIsOpen(false);
    setSelected(option.label);
    onChange({ name, value: option.value });
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={text.join(
          'w-full p-4 bg-bg text-sm relative hover:bg-bg-100 active:bg-bg-100',
          isOpen ? 'rounded-t-lg' : 'rounded-lg',
        )}
      >
        <div className="flex-between text-base w-full">
          {selected && !isOpen ? (
            <p className="">{selected}</p>
          ) : (
            <p className="text-white/60">{label}</p>
          )}

          <UiIcon
            id="arrowRight"
            size={18}
            className={text.join('transition-all', isOpen && 'rotate-90')}
          />
        </div>
      </button>

      <div
        className={text.join(
          'bg-bg-100 rounded-b-lg text-left overflow-y-scroll transition-all',
          isOpen ? 'max-h-32' : 'max-h-0',
        )}
      >
        {options.map((option, i) => (
          <React.Fragment key={option.value}>
            {i > 0 && <Divider margin="none" />}

            <button
              onClick={() => handleSelect(option)}
              className="flex-between hover:bg-bg-300 w-full px-4 py-3"
            >
              <p className="text-sm">{text.firstUpper(option.label)}</p>
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
