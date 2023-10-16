import React from 'react';
import { CircularProgress as MuiCircularProgress } from '@mui/material';
import Icon from './Icon';

export interface CircularProgressProps {
  percentage: number;
  size?: number;
  thickness?: number;
  icon?: string;
  level?: string | number;
  color?: string;
}

export default function CircularProgress({
  level,
  size = 60,
  thickness = 10,
  color = 'white',
  icon,
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

      <Icon
        value={icon}
        width={size - thickness}
        height={size - thickness}
        className='rounded-full absolute-centralized brightness-50'
      />

      <p className="text-white font-bold text-xl absolute-centralized flex-centralized">{level}</p>
    </div>
  );
}
