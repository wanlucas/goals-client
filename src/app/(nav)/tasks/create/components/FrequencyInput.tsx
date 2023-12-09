import ButtonGrid from '@/components/ButtonGrid';
import React from 'react';

function Daily() {
  return <div>daily</div>;
}

function Monthly() {
  return <div>Monthly</div>;
}

function Weekly() {
  return (
    <ButtonGrid
      options={[
        { label: 'Dom', value: '0' },
        { label: 'Seg', value: '1' },
        { label: 'Ter', value: '2' },
        { label: 'Qua', value: '3' },
        { label: 'Qui', value: '4' },
        { label: 'Sex', value: '5' },
        { label: 'Sab', value: '6' },
      ]}
    />
  );
}

interface FrequencyInputProps {
  frequency: 'daily' | 'weekly' | 'monthly';
  onChange: (frequency: string) => void;
}

export default function FrequencyInput({
  frequency,
  onChange,
}: FrequencyInputProps) {
  switch (frequency) {
    case 'daily':
      return <Daily />;
    case 'weekly':
      return <Weekly />;
    case 'monthly':
      return <Monthly />;
    default:
      return null;
  }
}
