import config from '@/constants/config';
import icons from '@/utils/icons';
import Image from 'next/image';
import React from 'react';

interface IconProps {
  value?: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

const defaultIcon = icons[0];

export default function Icon({
  value, className, alt = 'icon', height = 10, width = 10,
}: IconProps) {
  const icon = React.useMemo(() => {
    if (!value) return defaultIcon;
    if (!value.startsWith(config.iconPrefix)) return { data: value, alt };

    const id = Number(value.replace(config.iconPrefix, ''));

    return icons[id] || defaultIcon;
  }, [value, alt]);

  return (
    <Image
      src={icon.value}
      alt={icon.alt}
      loader={() => icon.value}
      width={width}
      height={height}
      className={className}
    />
  );
}
