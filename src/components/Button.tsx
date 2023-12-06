import React from 'react';
import text from '@/utils/text';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  bg?: keyof typeof bgColors;
  onClick?: () => void;
}

const bgColors = {
  primary: 'bg-secondary',
  secondary: 'bg-color3',
  tertiary: 'bg-color5',
};

export default function Button({
  children, onClick, type = 'button', className = '', bg = 'primary',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={text.join(
        'text-white rounded-md py-[3px] px-4 hover:brightness-110 active:scale-95',
        className,
        bgColors[bg],
      )}
    >
      {children}
    </button>
  );
}
