import text from '@/utils/text';
import { CircularProgress } from '@mui/material';
import React from 'react';
import Skeleton from './Skeleton';
import CircularBtn from './CircularBtn';

interface TimerProps {
  title: string;
  target: number;
  onClose: () => void;
  onChange?: (duration: number) => void;
  onFinish?: () => void;
}

export default function Timer({
  onClose,
  target,
  onChange = () => {},
  onFinish = () => {},
}: TimerProps) {
  const [int, setInt] = React.useState<NodeJS.Timeout | null>(null);
  const [tick, setTick] = React.useState(0);
  const duration = React.useMemo(() => target, []);
  const [finished, setFinished] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(duration);
  const percentage = React.useMemo(
    () => Number((100 - ((minutes * 60 + seconds) / (duration * 60)) * 100).toFixed(2)),
    [seconds],
  );

  const clearInt = () => {
    if (int) clearInterval(int);
    setInt(null);
  };

  const handleTick = () => {
    setTick((prev) => prev + 1);
  };

  const start = () => {
    clearInt();
    setInt(setInterval(handleTick, 1000));
  };

  const pause = () => {
    clearInt();
  };

  const restart = () => {
    clearInt();
    setSeconds(0);
    setMinutes(duration);
    onChange(duration);
    setTick(0);
  };

  const stop = () => {
    clearInt();
    setFinished(true);
  };

  const handleFinish = () => {
    onChange(0);
    clearInt();
    onFinish();
  };

  React.useEffect(() => {
    if (tick > 0) {
      let newSeconds = Math.max(seconds - 1, -1);

      if (newSeconds === -1) {
        if (minutes !== duration && minutes > 0) {
          onChange(minutes);
        }

        if (minutes > 0) {
          const newMinutes = minutes - 1;
          setMinutes(newMinutes);

          newSeconds = 59;
        } else stop();
      }

      setSeconds(newSeconds);
    }
  }, [tick]);

  return (
      <div className="flex-centralized absolute-centralized bg-white/20 w-full h-full">
        <div className={text.join(
          'relative flex-centralized-column gap-10 md:w-[400px] md:h-[600px] rounded-2xl w-full h-full text-white z-50',
          finished ? 'bg-color4' : 'bg-color5',
        )}>
          <Skeleton open={!finished}>
            <CircularBtn
              onClick={onClose}
              className="absolute right-4 top-4"
              icon="close"
              size="md"
              bg="bg"
            />
          </Skeleton>

          <div className="relative w-[300px] h-[300px] bg-bg rounded-full">
            <CircularProgress
              variant="determinate"
              color="inherit"
              size={300}
              thickness={2}
              value={percentage}
            />

            <div className="absolute-centralized flex-centralized text-[50px]">
              {`${minutes < 10 ? `0${minutes}` : minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`}
            </div>
          </div>

          <div className="flex gap-3">
            <Skeleton open={!finished}>
              <CircularBtn icon="refresh" size="lg" bg="bg" onClick={restart} />

              {int ? (
                <CircularBtn
                  icon="pause"
                  size="lg"
                  bg="secondary"
                  onClick={pause}
                />
              ) : (
                <CircularBtn
                  icon="play"
                  size="lg"
                  bg="secondary"
                  onClick={start}
                />
              )}
            </Skeleton>

            <CircularBtn
              icon="check"
              size="lg"
              bg="primary"
              onClick={handleFinish}
              className={text.join(
                finished && 'animate-pulse-alt',
              )}
            />
          </div>
        </div>
      </div>
  );
}
