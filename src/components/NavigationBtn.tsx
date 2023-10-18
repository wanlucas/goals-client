'use client';

import React from 'react';
import Link from 'next/link';
import text from '@/utils/text';
import uiIcons from '@/utils/ui-Icons';
import UiIcon from './UiIcon';

interface NavigationBtnProps {
  to: string;
  onClick?: () => void;
  icon?: keyof typeof uiIcons;
  className?: string;
  children?: React.ReactNode;
}

export default function NavigationBtn({
  children,
  onClick,
  icon,
  to,
  className = '',
}: NavigationBtnProps) {
  const handleClick = () => onClick && onClick();

  return (
    <Link href={to} onClick={handleClick}>
      <button className={text.join('bg-secondary rounded-full w-9 h-9 flex-centralized active:scale-110 hover:scale-110', className)}>
        {icon && <UiIcon id={icon} />}
        {children}
      </button>
    </Link>
  );
}
