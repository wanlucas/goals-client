import CircularBtn from '@/components/CircularBtn';
import { CircularProgress } from '@mui/material';
import React from 'react';

interface TimerProps {
  title: string;
  duration: number;
  onClose: () => void;
  onChange?: (duration: number) => void;
  onFinish?: () => void;
}

function Timer({
  onClose,
  duration,
  onChange = () => {},
  onFinish = () => {},
}: TimerProps) {
  const [int, setInt] = React.useState<NodeJS.Timeout | null>(null);
  const [minutes, setMinutes] = React.useState(duration);
  const [seconds, setSeconds] = React.useState(0);
  const percentage = React.useMemo(
    () => (minutes * 60 + seconds / (duration * 60)) * 100,
    [seconds],
  );

  const clearInt = () => {
    if (int) clearInterval(int);
  };

  const handleFinish = () => {
    onFinish();
    onClose();
    clearInt();
  };

  const handleTick = () => {
    setSeconds((ps) => {
      if (ps === 0) {
        setMinutes((pm) => {
          if (pm === 0) {
            handleFinish();
            return 0;
          }

          return pm - 1;
        });
        return 59;
      }

      return ps - 1;
    });
  };

  const start = () => {
    clearInt();
    setInt(setInterval(handleTick, 1000));
  };

  const pause = () => {
    clearInt();
    setInt(null);
  };

  const restart = () => {
    clearInt();
    setMinutes(duration);
    setSeconds(0);
    setInt(null);
  };

  React.useEffect(() => {
    onChange(minutes);
  }, [minutes]);

  return (
    <div className='absolute-centralized flex-centralized-column gap-10 bg-color5 md:w-[400px] md:h-[600px] rounded-2xl sm:w-full sm:h-full text-white z-50'>
      <CircularBtn
        onClick={onClose}
        className='absolute right-4 top-4'
        icon='close'
        size='md'
        bg='bg'
      />

      <div className='relative w-[300px] h-[300px] bg-bg rounded-full'>
        <CircularProgress
          variant='determinate'
          color='inherit'
          size={300}
          thickness={2}
          value={percentage}
        />

        <div className='absolute-centralized flex-centralized text-[50px]'>
          {`${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`}
        </div>
      </div>

      <div className='flex gap-3'>
        <CircularBtn icon='refresh' size='lg' bg='bg' onClick={restart} />

        {int ? (
          <CircularBtn icon='pause' size='lg' bg='secondary' onClick={pause} />
        ) : (
          <CircularBtn icon='play' size='lg' bg='secondary' onClick={start} />
        )}

        <CircularBtn
          icon='check'
          size='lg'
          bg='primary'
          onClick={handleFinish}
        />
      </div>
    </div>
  );
}

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
        icon='clock'
        size='sm'
        className='p-[1px]'
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Timer
          title={title}
          onClose={() => setIsOpen(false)}
          onChange={onChange}
          duration={duration}
          onFinish={onFinish}
        />
      )}
    </React.Fragment>
  );
}
