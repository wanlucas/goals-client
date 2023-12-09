import text from '@/utils/text';
import React from 'react';

const margins = {
  none: 'my-0',
  small: 'my-2',
  medium: 'my-4',
  large: 'my-8',
};

interface DividerProps {
  margin?: keyof typeof margins;
}

export default function Divider({ margin = 'medium' }: DividerProps) {
  return (
    <hr className={text.join(
      'h-[1px] w-full border-white/10 rounded-md',
      margins[margin],
    )}/>
  );
}
