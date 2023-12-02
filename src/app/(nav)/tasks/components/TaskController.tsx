import React from 'react';
import { TaskWithRecord } from '@/services/api/task';
import QuantityController from './QuantityController';
import toggleTask from '../actions/toggle-task';
import register from '../actions/register';

interface TaskControllerProps {
  task: TaskWithRecord;
  toggle: (id: string, to: boolean) => void;
  isOpen: boolean;
}

export default function TaskController({
  task,
  toggle,
  isOpen = false,
}: TaskControllerProps) {
  const [quantity, setQuantity] = React.useState(task.record?.quantity || 0);
  const [duration, setDuration] = React.useState(task.record?.duration || 0);

  const handleConfirm = async () => {
    const to = !task.record?.done;

    toggle(task.id, to);
    const { success } = await toggleTask(task.id, to);
    if (!success) toggle(task.id, !to);
  };

  const handleQuantityChange = async (newQuantity: number) => {
    const prev = quantity;
    setQuantity(newQuantity);

    const { success } = await register(task.id, { quantity: newQuantity });
    if (!success) setQuantity(prev);
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
