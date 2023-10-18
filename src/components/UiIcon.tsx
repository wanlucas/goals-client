import uiIcons from '@/utils/ui-Icons';
import Image from 'next/image';
import { useMemo } from 'react';

interface UiIconProps {
  id: keyof typeof uiIcons;
  size?: number;
  className?: string;
}

export default function UiIcon({
  id, className, size = 22,
}: UiIconProps) {
  const icon = useMemo(() => uiIcons[id], [id]);

  return (
      <Image
        src={icon.url}
        alt={icon.alt}
        width={size}
        height={size}
        className={className}
      />
  );
}
