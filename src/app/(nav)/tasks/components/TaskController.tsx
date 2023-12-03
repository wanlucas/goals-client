import React from 'react';
import { TaskWithRecord } from '@/services/api/task';
import CircularBtn from '@/components/CircularBtn';
import register from '../actions/register';
import QuantityController from './QuantityController';
import done from '../actions/done';
import DurationController from './DurationController';

interface TaskControllerProps {
  task: TaskWithRecord;
  isOpen: boolean;
  toggle: (
    id: string,
    to: boolean,
  ) => {
    undo: () => void;
  };
}

export default function TaskController({
  task,
  toggle,
  isOpen = false,
}: TaskControllerProps) {
  const [quantity, setQuantity] = React.useState(task.record?.quantity || 0);
  const [duration, setDuration] = React.useState(task.record?.duration || task.duration);

  const handleDone = async () => {
    const { undo } = toggle(task.id, true);
    const { success } = await done(task.id);

    if (!success) undo();
  };

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
    <div className='px-4 py-1 flex bg-bg-100 gap-3 rounded-b-lg justify-end grow-vertically'>
      <CircularBtn onClick={handleDone} icon='check' size='sm' bg='tertiary' className='p-[3px]' />

      {task.duration && (
        <DurationController
          duration={duration!}
          target={task.duration}
          onChange={setDuration}
          title={task.description}
        />
      )}

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
