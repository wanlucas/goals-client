import React from 'react';
import { CircularProgress as MuiCircularProgress } from '@mui/material';
import Image from 'next/image';

export interface CircularProgressProps {
  percentage: number;
  size?: number;
  thickness?: number;
  src?: string;
  level?: string | number;
  color?: string;
}

export default function CircularProgress({
  level,
  size = 60,
  thickness = 12,
  color = 'white',
  src,
  percentage,
}: CircularProgressProps) {
  return (
    <div
      className='relative'
      style={{
        width: size,
        height: size,
        color,
      }}
    >
      <MuiCircularProgress
        variant='determinate'
        value={percentage}
        color='inherit'
        size={size}
        thickness={thickness}
        className='absolute-centralized'
      />

      <Image
        src={src}
        alt='icon'
        loader={() => src}
        width={size - thickness}
        height={size - thickness}
        className='rounded-full absolute-centralized brightness-50'
      />

      <p className="text-white font-bold text-xl absolute-centralized flex-centralized">{level}</p>
    </div>
  );
}
