import React from 'react';
import { TaskWithRecord } from '@/services/api/task';
import QuantityController from './QuantityController';
import register from '../actions/register';

interface TaskControllerProps {
  task: TaskWithRecord;
  isOpen: boolean;
  toggle: (id: string, to: boolean) => {
    undo: () => void
  };
}

export default function TaskController({
  task,
  toggle,
  isOpen = false,
}: TaskControllerProps) {
  const [quantity, setQuantity] = React.useState(task.record?.quantity || 0);
  const [duration, setDuration] = React.useState(task.record?.duration || 0);

  const handleQuantityChange = async (newQuantity: number) => {
    const prev = quantity;
    let undoToggle = () => {};

    setQuantity(newQuantity);

    if (newQuantity === task.quantity && !task.record?.done) {
      undoToggle = toggle(task.id, true).undo;
    }

    const { success } = await register(task.id, { quantity: newQuantity });

    if (!success) {
      undoToggle();
      setQuantity(prev);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='px-4 py-1 flex bg-bg-100 rounded-b-lg justify-end grow-vertically'>
      {task.quantity && (
        <QuantityController
          quantity={quantity}
          target={task.quantity}
          onChange={handleQuantityChange}
        />
      )}
    </div>
  );
}
