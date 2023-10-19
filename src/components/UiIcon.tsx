import text from '@/utils/text';
import uiIcons from '@/utils/ui-Icons';
import Image from 'next/image';
import { useMemo } from 'react';

interface UiIconProps {
  id: keyof typeof uiIcons;
  size?: number;
  className?: string;
  bg?: keyof typeof bgColors;
}

const bgColors = {
  default: 'bg-transparent',
  primary: 'bg-secondary',
  secondary: 'bg-color3',
};

export default function UiIcon({
  id,
  className = '',
  size = 22,
  bg = 'default',
}: UiIconProps) {
  const icon = useMemo(() => uiIcons[id], [id]);

  return (
    <div className={text.join(className, bgColors[bg], 'rounded-full p-1')}>
      <Image
        src={icon.url}
        alt={icon.alt}
        width={size}
        height={size}
        className='text-red-700'
      />
    </div>
  );
}
