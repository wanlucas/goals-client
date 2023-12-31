'use client';

import React from 'react';
import text from '@/utils/text';
import uiIcons from '@/utils/ui-Icons';
import UiIcon from './UiIcon';

const sizes = {
  xs: 'w-4 h-4 min-w-[1rem] min-h-[1rem]',
  sm: 'w-5 h-5 min-w-[1.25rem] min-h-[1.25rem]',
  md: 'w-7 h-7 min-w-[1.75rem] min-h-[1.75rem]',
  lg: 'w-9 h-9 min-w-[2.25rem] min-h-[2.25rem]',
};

const bgColors = {
  primary: 'bg-secondary',
  secondary: 'bg-color3',
  tertiary: 'bg-color5',
  bg: 'bg-bg',
  black: 'bg-black',
  transparent: 'bg-transparent',
};

export type BgColor = keyof typeof bgColors;

interface CircularBtnProps {
  onClick?: () => void;
  icon?: keyof typeof uiIcons;
  className?: string;
  children?: React.ReactNode;
  size?: keyof typeof sizes;
  bg?: BgColor;
  type?: 'button' | 'submit' | 'reset';
}

export default function CircularBtn({
  children,
  onClick,
  icon,
  size = 'lg',
  bg = 'primary',
  className = '',
  type = 'button',
}: CircularBtnProps) {
  const handleClick = () => onClick && onClick();

  return (
    <button
      onClick={handleClick}
      type={type}
      className={text.join(
        'active:scale-110 hover:scale-110',
        bg !== 'transparent' && 'rounded-full flex-centralized',
        bgColors[bg],
        sizes[size],
        className,
      )}
    >
      {icon && <UiIcon id={icon} />}
      {children}
    </button>
  );
}
