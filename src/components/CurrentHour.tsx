'use client';

import React from 'react';
import moment from 'moment';
import text from '@/utils/text';

interface CurrentHourProps {
  format?: string;
  className?: string;
  onChange?: (hour: string) => void;
  int?: number;
}

export default function CurrentHour({
  className,
  int = 1000,
  format = 'H:mm:ss',
  onChange = () => {},
}: CurrentHourProps) {
  const [hour, setHour] = React.useState(moment().format(format));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setHour(moment().format(format));
      onChange(hour);
    }, int);

    return () => clearInterval(interval);
  }, []);

  return <p className={text.join('tracking-wider', className)}>{hour}</p>;
}
