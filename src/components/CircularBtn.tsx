'use client';

import React from 'react';
import text from '@/utils/text';
import uiIcons from '@/utils/ui-Icons';
import UiIcon from './UiIcon';

interface CircularBtnProps {
  onClick?: () => void;
  icon?: keyof typeof uiIcons;
  className?: string;
  children?: React.ReactNode;
  size?: keyof typeof sizes;
  bg?: keyof typeof bgColors;
}

const sizes = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-9 h-9',
  lg: 'w-12 h-12',
};

const bgColors = {
  primary: 'bg-secondary',
  secondary: 'bg-color3',
  tertiary: 'bg-color5',
  bg: 'bg-bg',
  black: 'bg-black',
};

export default function CircularBtn({
  children,
  onClick,
  icon,
  size = 'md',
  bg = 'primary',
  className = '',
}: CircularBtnProps) {
  const handleClick = () => onClick && onClick();

  return (
    <button
      onClick={handleClick}
      className={text.join(
        'rounded-full flex-centralized active:scale-110 hover:scale-110',
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