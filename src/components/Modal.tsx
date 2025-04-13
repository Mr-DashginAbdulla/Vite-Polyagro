import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: {
    cancelText?: string;
    confirmText?: string;
    onCancel?: () => void;
    onConfirm: () => void;
    variant?: 'primary' | 'danger';
  };
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
        {footer && (
          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="secondary"
              onClick={footer.onCancel || onClose}
            >
              {footer.cancelText || 'İptal'}
            </Button>
            <Button
              variant={footer.variant || 'primary'}
              onClick={footer.onConfirm}
            >
              {footer.confirmText || 'Onayla'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 