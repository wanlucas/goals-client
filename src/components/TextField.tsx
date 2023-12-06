import { ChangeEvent } from 'react';
import text from '@/utils/text';
import UiIcon from './UiIcon';

export interface OnChangeProps<Name = string> {
  name: Name;
  value: string | number;
}

interface TextFieldProps {
  type?: 'text' | 'number' | 'password';
  maxLength?: number;
  name: string;
  placeholder?: string;
  value?: string | number;
  max?: number;
  min?: number;
  onChange: (event: OnChangeProps) => void;
  className?: string;
}

export default function TextField({
  onChange,
  name,
  value,
  placeholder,
  className,
  maxLength = 100,
  type = 'text',
  ...props
}: TextFieldProps) {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const treatedValue = type === 'number' ? Number(target.value) : target.value;
    if (onChange) onChange({ name: target.name, value: treatedValue });
  };

  return (
    <div className={text.join(
      'relative h-9 z-10 bg-bg rounded-md hover:bg-bg-100',
      className,
    )}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
        autoComplete='off'
        className='outline-none h-full text-white w-full bg-transparent p-4 max-w-[80%]'
        {...props}
      />

      <UiIcon id={type === 'number' ? 'quantity' : 'edit'} className='absolute-right' size={18} />
    </div>
  );
}
