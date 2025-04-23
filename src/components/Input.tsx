import React, { useState } from 'react';
import { ThemeType } from '../contexts/ThemeContext';

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  className?: string;
  error?: string;
  theme?: ThemeType;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  label,
  placeholder,
  className = '',
  error,
  theme
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : theme === 'dark'
              ? 'border-gray-600 bg-gray-700 text-white focus:ring-primary focus:border-primary'
              : 'border-gray-300 focus:ring-primary focus:border-primary'
          } ${className}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <i className={`ri-eye${showPassword ? '-line' : '-off-line'} text-xl`}></i>
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input; 