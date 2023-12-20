import React from 'react';
import text from '@/utils/text';
import TextField from './TextField';
import CircularBtn from './CircularBtn';
import Form from './Form';

type Selected<T> = T extends 'text' ? string : number;

interface OptionGridProps<T> {
  type: T;
  name: string;
  max?: number;
  min?: number;
  placeholder: string;
  minW?: number;
  onChange?: (selecteds: Selected<T>[]) => void;
}

export default function OptionGrid<T extends 'text' | 'number'>({
  name,
  placeholder,
  type,
  max = Infinity,
  min = 0,
  minW = 150,
  onChange = () => {},
}: OptionGridProps<T>) {
  const [selecteds, setSelecteds] = React.useState<Selected<T>[]>([]);
  const [value, setValue] = React.useState<Selected<T> | ''>('');

  const handleAdd = () => {
    if (!value) return;

    setSelecteds((prev) => (
      prev.filter((v) => v !== value).concat(value)
    ));
    setValue('');
  };

  React.useEffect(() => {
    onChange(selecteds);
  }, [selecteds]);

  return (
    <div className="flex-between gap-2 flex-wrap">
      <Form onSubmit={handleAdd} className="flex items-center grow gap-2">
        <CircularBtn
          className="ml-2"
          icon="plus"
          size="md"
          type='submit'
          onClick={handleAdd}
        />

        <TextField
          type={type}
          className={text.join(
            'w-full',
            `min-w-[${minW}px]`,
          )}
          placeholder={placeholder}
          onChange={(e) => setValue(e.value as Selected<T>)}
          value={value}
          name={name}
          max={max}
          min={min}
        />
      </Form>

      {selecteds.length > 0 && (
        <div className="flex items-center gap-2 grow flex-wrap">
          {selecteds.map((selected) => (
            <div
              key={selected}
              className='bg-bg min-w-[40px] rounded-md p-2 text-center flex-1 max-w-[150px]'
            >
              <span className="text-white text-base font-bold">{selected}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
