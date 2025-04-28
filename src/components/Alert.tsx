import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeType } from '../contexts/ThemeContext';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  theme: ThemeType;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose, theme, duration = 5000 }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`p-4 rounded-lg shadow-lg flex items-center gap-3 ${
          theme === 'dark'
            ? type === 'success'
              ? 'bg-green-900 text-green-100'
              : 'bg-red-900 text-red-100'
            : type === 'success'
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }`}
      >
        <i
          className={`ri-${type === 'success' ? 'check' : 'close'}-circle-fill text-xl`}
        ></i>
        <span>{message}</span>
        <button
          onClick={onClose}
          className={`ml-2 p-1 rounded-full hover:bg-opacity-20 ${
            theme === 'dark'
              ? type === 'success'
                ? 'hover:bg-green-100'
                : 'hover:bg-red-100'
              : type === 'success'
              ? 'hover:bg-green-800'
              : 'hover:bg-red-800'
          }`}
          aria-label={t('components.alert.close')}
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Alert; 