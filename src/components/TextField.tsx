import { ChangeEvent } from 'react';

export interface OnChangeProps {
  name: string;
  value: string
}

interface TextFieldProps {
  label?: string;
  type?: 'text' | 'number' | 'password';
  name: string;
  placeholder?: string;
  onChange: (event: OnChangeProps) => void;
}

export default function TextField({
  onChange,
  label,
  name,
  placeholder,
  type = 'text',
}: TextFieldProps) {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="relative h-9 mb-4">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className='h-full text-white w-full rounded-t outline-none z-10 border-b border-white bg-transparent'
      />
      <label
        className='absolute left-0 transition'
      >
        {label}
      </label>
    </div>
  );
}
