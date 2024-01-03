import React from 'react';
import Loading from './Loading';

interface SkeletonProps {
  isLoading?: boolean;
  open?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Skeleton({
  children,
  isLoading = false,
  open = true,
  onClose = () => {},
}: SkeletonProps) {
  React.useEffect(() => {
    if (!open) onClose();
  }, [open]);

  if (!open) return null;

  if (isLoading) {
    return (
      <div className="flex-centralized w-full h-full">
        <Loading />
      </div>
    );
  }

  return children;
}
