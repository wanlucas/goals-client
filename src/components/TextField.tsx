import { ChangeEvent } from 'react';
import text from '@/utils/text';
import UiIcon from './UiIcon';

type Value<T> = T extends 'number' ? number : string;

interface OnChangeProps<T> {
  name: any;
  value: Value<T>;
}

type TextFieldType = 'text' | 'number' | 'password';

interface TextFieldProps<T> {
  type?: T;
  maxLength?: number;
  name: string;
  placeholder?: string;
  value?: string | number | null;
  max?: number;
  min?: number;
  onChange: (event: OnChangeProps<T>) => void;
  className?: string;
}

export default function TextField<T extends TextFieldType>({
  name,
  placeholder,
  className,
  maxLength = 100,
  value,
  onChange = () => {},
  type,
  max = Infinity,
  min = 0,
}: TextFieldProps<T>) {
  const inputIsValid = (input: string) => !(
    type === 'number' && input !== '' && /\D/.test(input)
  );

  const treatInput = (input: string) => (type === 'number' && input
    ? Math.max(min, Math.min(max, Number(input)))
    : input
  );

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!inputIsValid(target.value)) return;

    onChange({
      name,
      value: treatInput(target.value) as Value<T>,
    });
  };

  return (
    <div
      className={text.join(
        'relative z-10 bg-bg rounded-md hover:bg-bg-100 w-full',
        className,
      )}
    >
      <input
        type={type === 'number' ? 'text' : type}
        name={name}
        value={value!}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
        autoComplete="off"
        className="outline-none h-full text-white w-full bg-transparent px-4 py-2"
        max={max}
        min={min}
      />

      <UiIcon
        id={type === 'number' ? 'quantity' : 'edit'}
        className="absolute-right"
        size={18}
      />
    </div>
  );
}
