import { ChangeEvent } from 'react';
import UiIcon from './UiIcon';

export interface OnChangeProps<Name = string> {
  name: Name;
  value: string
}

interface TextFieldProps {
  type?: 'text' | 'number' | 'password';
  maxLength?: number;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (event: OnChangeProps) => void;
}

export default function TextField({
  onChange,
  name,
  value,
  placeholder,
  maxLength = 100,
  type = 'text',
}: TextFieldProps) {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="relative h-9">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
        autoComplete='off'
        className='h-full text-white w-full outline-none z-10 bg-bg rounded-md p-4 hover:bg-bg-100'
      />

      <UiIcon id="edit" className='absolute-right' size={18} />
    </div>
  );
}
