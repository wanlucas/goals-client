'use client';

import CircularBtn from '@/components/CircularBtn';
import React from 'react';

interface QuantityControllerProps {
  max: number;
  min?: number;
  quantity: number;
  onChange?: (quantity: number) => void;
  largeScale?: boolean;
}

export default function QuantityController({
  max,
  quantity,
  onChange,
  largeScale,
  min = 0,
}: QuantityControllerProps) {
  const showLargeScale = !(largeScale === false || max <= 10);

  const handleClick = async (dif: number) => {
    const to = Math.min(max, Math.max(min, quantity + dif));
    if (onChange && to !== quantity) onChange(to);
  };

  return (
    <div className='flex-centralized text-xs gap-1 flex-nowrap'>
      {showLargeScale && <CircularBtn icon='minus' bg="secondary" size='sm' onClick={() => handleClick(-10)} />}
      <CircularBtn icon='minus' size='xs' onClick={() => handleClick(-1)} />

      <span className='px-1 min-w-[45px] text-center'>{`${quantity} | ${max}`}</span>

      <CircularBtn icon='plus' size='xs' onClick={() => handleClick(1)} />
      {showLargeScale && <CircularBtn icon='plus' bg="secondary" size='sm' onClick={() => handleClick(10)} />}
    </div>
  );
}
