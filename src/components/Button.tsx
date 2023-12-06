import React from 'react';
import text from '@/utils/text';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  color?: keyof typeof bgColors;
  onClick?: () => void;
}

const bgColors = {
  primary: 'bg-secondary',
  secondary: 'bg-color3',
};

export default function Button({
  children, onClick, type = 'button', className = '', color = 'primary',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={text.join(
        'text-white rounded-full py-2 px-4 hover:brightness-110 active:scale-95',
        className,
        bgColors[color],
      )}
    >
      {children}
    </button>
  );
}
