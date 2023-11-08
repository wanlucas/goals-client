import moment from 'moment';
import React from 'react';
import 'moment/locale/pt-br';

type RunAt = string[] | null;

interface FrequencyProps {
  frequency: string;
  runAt: RunAt;
}

function Weekly({ runAt }: { runAt: RunAt }) {
  return (
    <ul className='flex justify-end gap-2'>
      {runAt?.map((day) => (
        <li key={day} className='text-sm text-gray-500'>
          {moment().day(day).locale('pt-br').format('ddd')}
        </li>
      ))}
    </ul>
  );
}

function Monthly({ runAt }: { runAt: RunAt }) {
  const { length } = (runAt!);
  const label = React.useMemo(() => {
    if (length === 1) return `Dia ${runAt![0]}`;
    if (length < 6) return `Dias ${runAt!.slice(0, length - 1).join(', ')} e ${runAt![length - 1]}`;
    return 'Vários dias';
  }, [length]);

  return <p className='text-sm text-gray-500'>{label}</p>;
}

export default function Frequency({ frequency, runAt }: FrequencyProps) {
  switch (frequency) {
    case 'weekly':
      return Weekly({ runAt });
    case 'monthly':
      return Monthly({ runAt });
    default:
      return <p className='text-sm text-gray-500'>Todos os dias</p>;
  }
}
