import React from 'react';
import CircularBtn from './CircularBtn';

interface BottomBarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function BottomBar({
  children,
  isOpen,
  onClose,
}: BottomBarProps) {
  return (
    <React.Fragment>
      {isOpen && (
        <div className="absolute inset-0 w-full h-full m-auto z-50 bg-slate-600/40">
          <div className="absolute w-full inset-x-0 bottom-0 fade-to-top">
            <div className="rounded-t-3xl flex justify-end px-5 py-2">
              <CircularBtn
                onClick={onClose}
                className="hover:scale-105"
                icon="close"
                size="lg"
              />
            </div>

            <div className="bg-bg rounded-t-3xl overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
