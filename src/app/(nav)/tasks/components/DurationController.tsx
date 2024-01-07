import CircularBtn from '@/components/CircularBtn';
import Timer from '@/components/Timer';
import React from 'react';

interface DurationControllerProps {
  duration: number;
  title: string;
  onChange: (duration: number) => void;
  onFinish?: () => void;
}

export default function DurationController({
  duration,
  onChange,
  onFinish,
  title,
}: DurationControllerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <CircularBtn
        icon="clock"
        size="sm"
        className="p-[1px]"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Timer
          title={title}
          onClose={() => setIsOpen(false)}
          onChange={onChange}
          target={duration}
          onFinish={onFinish}
        />
      )}
    </React.Fragment>
  );
}
