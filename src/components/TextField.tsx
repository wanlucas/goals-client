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
  value?: string | number | null;
  max?: number;
  min?: number;
  onChange: (event: OnChangeProps) => void;
  className?: string;
}

export default function TextField({
  onChange,
  name,
  placeholder,
  className,
  maxLength = 100,
  value,
  type = 'text',
  ...props
}: TextFieldProps) {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const treatedValue = type === 'number' ? Number(target.value) : target.value;
    if (onChange) onChange({ name: target.name, value: treatedValue });
  };

  return (
    <div className={text.join(
      'relative z-10 bg-bg rounded-md hover:bg-bg-100',
      className,
    )}>
      <input
        type={type}
        name={name}
        value={value!}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
        autoComplete='off'
        className='outline-none h-full text-white w-full bg-transparent px-4 py-2 max-w-[80%]'
        {...props}
      />

      <UiIcon id={type === 'number' ? 'quantity' : 'edit'} className='absolute-right' size={18} />
    </div>
  );
}
