import React from 'react';
import text from '@/utils/text';

interface ButtonProps {
  title: string;
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
  title, onClick, type = 'button', className = '', color = 'primary',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={text.join(
        'text-white rounded-full py-2 px-6 hover:brightness-110 active:scale-95 uppercase',
        className,
        bgColors[color],
      )}
    >
      {title}
    </button>
  );
}
