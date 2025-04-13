import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'blue' | 'red';
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  color = 'green'
}) => {
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-14'
  };

  const dotSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const colorClasses = {
    green: checked ? 'bg-green-600' : 'bg-gray-200',
    blue: checked ? 'bg-blue-600' : 'bg-gray-200',
    red: checked ? 'bg-red-600' : 'bg-gray-200'
  };

  const dotPositionClasses = {
    sm: checked ? 'translate-x-4' : 'translate-x-1',
    md: checked ? 'translate-x-6' : 'translate-x-1',
    lg: checked ? 'translate-x-8' : 'translate-x-1'
  };

  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`
        relative inline-flex items-center rounded-full transition-colors
        focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          inline-block bg-white rounded-full transition-transform
          ${dotSizeClasses[size]}
          ${dotPositionClasses[size]}
        `}
      />
    </button>
  );
};

export default Switch; 