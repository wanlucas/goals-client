import React from 'react';
import text from '@/utils/text';
import TextField from './TextField';
import CircularBtn from './CircularBtn';

interface OptionGridProps {
  type?: 'number' | 'text';
  name: string;
  max?: number;
  min?: number;
  placeholder: string;
  minW?: number;
}

export default function OptionGrid({
  name,
  placeholder,
  type = 'text',
  max = Infinity,
  min = 0,
  minW = 150,
}: OptionGridProps) {
  const [selecteds, setSelecteds] = React.useState<(string | number)[]>([]);
  const [value, setValue] = React.useState<string | number>('');

  const handleAdd = () => {
    if (!value) return;

    setSelecteds((prev) => prev.filter((v) => v !== value).concat(value));
    setValue('');
  };

  return (
    <div className="flex-between gap-2 flex-wrap">
      <div className="flex items-center grow gap-2">
        <CircularBtn
          className="ml-2"
          icon="plus"
          size="md"
          onClick={handleAdd}
        />

        <TextField
          type={type}
          className={text.join(
            'w-full',
            `min-w-[${minW}px]`,
          )}
          placeholder={placeholder}
          onChange={(e) => setValue(e.value)}
          value={value}
          name={name}
          max={max}
          min={min}
        />
      </div>

      {selecteds.length > 0 && (
        <div className="flex items-center gap-2 grow flex-wrap">
          {selecteds.map((selected) => (
            <div
              key={selected}
              className="bg-bg flex-1 min-w-[40px] max-w-[120px] rounded-md p-2 text-center"
            >
              <span className="text-white text-base font-bold">{selected}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
