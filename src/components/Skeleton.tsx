import React from 'react';

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
        <p>Carregando...</p>
      </div>
    );
  }

  return children;
}
