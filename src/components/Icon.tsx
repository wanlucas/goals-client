import icons from '@/utils/icons';
import Image from 'next/image';
import React from 'react';

interface IconProps {
  id?: string;
  size?: number;
  className?: string;
  alt?: string;
}

const defaultIcon = icons[0];

export default function Icon({
  id, className, alt = 'icon', size = 40,
}: IconProps) {
  const icon = React.useMemo(() => {
    if (!id) return defaultIcon;

    return icons[id] || defaultIcon;
  }, [id, alt]);

  return (
    <Image
      src={icon.value}
      alt={icon.alt}
      width={size}
      height={size}
      className={className}
    />
  );
}
