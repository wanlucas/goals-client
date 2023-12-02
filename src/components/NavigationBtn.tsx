'use client';

import React from 'react';
import Link from 'next/link';
import uiIcons from '@/utils/ui-Icons';
import CircularBtn from './CircularBtn';

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
      <CircularBtn icon={icon} className={className}>{ children }</CircularBtn>
    </Link>
  );
}
