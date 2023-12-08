'use client';

import React from 'react';
import Link from 'next/link';
import uiIcons from '@/utils/ui-Icons';
import CircularBtn, { BgColor } from './CircularBtn';

interface NavigationBtnProps {
  to: string;
  onClick?: () => void;
  icon?: keyof typeof uiIcons;
  className?: string;
  children?: React.ReactNode;
  bg?: BgColor;
}

export default function NavigationBtn({
  children,
  onClick,
  icon,
  to,
  bg,
  className = '',
}: NavigationBtnProps) {
  const handleClick = () => onClick && onClick();

  return (
    <Link href={to} onClick={handleClick}>
      <CircularBtn icon={icon} bg={bg} className={className}>
        {children}
      </CircularBtn>
    </Link>
  );
}
