import { CreateGoal } from '@/services/api/goal';
import React from 'react';

interface GoalsFormProps {
  onChange: (goals: CreateGoal[]) => void;
}

export default function GoalsForm({ onChange }: GoalsFormProps) {
  return (
    <div>GoalsForm</div>
  );
}
