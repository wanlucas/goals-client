import text from '@/utils/text';
import uiIcons from '@/utils/ui-Icons';
import Image from 'next/image';
import { useMemo } from 'react';

export type UiIconId = keyof typeof uiIcons;

interface UiIconProps {
  id: UiIconId;
  size?: number;
  className?: string;
}

export default function UiIcon({
  id,
  className = '',
  size = 22,
}: UiIconProps) {
  const icon = useMemo(() => uiIcons[id], [id]);

  return (
    <Image
      src={icon.url}
      alt={icon.alt}
      width={size}
      height={size}
      className={text.join(
        className,
        'text-red-700',
      )}
    />
  );
}
