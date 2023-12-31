import ButtonGrid from '@/components/ButtonGrid';
import OptionsGrid from '@/components/OptionGrid';
import React from 'react';

function Monthly({
  onChange,
}: {
  onChange: (runAt: number[]) => void;
}) {
  return (
    <OptionsGrid
      type='number'
      max={31}
      min={1}
      name="runAt"
      placeholder="Dia"
      onChange={onChange}
      minW={100}
    />
  );
}

function Weekly({
  onChance,
}: {
  onChance: (frequency: number[]) => void;
}) {
  return (
    <ButtonGrid
      multiple
      name="runAt"
      onChange={({ value }) => onChance(value as number[])}
      options={[
        { label: 'Dom', value: 0 },
        { label: 'Seg', value: 1 },
        { label: 'Ter', value: 2 },
        { label: 'Qua', value: 3 },
        { label: 'Qui', value: 4 },
        { label: 'Sex', value: 5 },
        { label: 'Sab', value: 6 },
      ]}
    />
  );
}

interface FrequencyInputProps {
  frequency?: 'daily' | 'weekly' | 'monthly';
  onChange: (runAt: number[] | null) => void;
}

export default function FrequencyInput({
  onChange,
  frequency = 'daily',
}: FrequencyInputProps) {
  React.useEffect(() => {
    onChange(null);
  }, [frequency]);

  switch (frequency) {
    case 'weekly':
      return <Weekly onChance={onChange} />;
    case 'monthly':
      return <Monthly onChange={onChange} />;
    default:
      return null;
  }
}
