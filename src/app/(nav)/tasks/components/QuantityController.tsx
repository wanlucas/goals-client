'use client';

import CircularBtn from '@/components/CircularBtn';
import React from 'react';

interface QuantityControllerProps {
  target: number;
  quantity: number;
  onChange?: (quantity: number) => void;
}

export default function QuantityController({
  target,
  quantity,
  onChange,
}: QuantityControllerProps) {
  const handleClick = async (dif: number) => {
    const to = Math.min(target, Math.max(0, quantity + dif));
    if (onChange && to !== quantity) onChange(to);
  };

  return (
    <div className='flex items-center text-xs gap-1'>
      <CircularBtn icon='minus' bg="secondary" size='sm' onClick={() => handleClick(-10)} />
      <CircularBtn icon='minus' size='xs' onClick={() => handleClick(-1)} />

      <span className='px-1'>{`${quantity} | ${target}`}</span>

      <CircularBtn icon='plus' size='xs' onClick={() => handleClick(1)} />
      <CircularBtn icon='plus' bg="secondary" size='sm' onClick={() => handleClick(10)} />
    </div>
  );
}
