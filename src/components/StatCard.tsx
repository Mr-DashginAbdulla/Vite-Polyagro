import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeType } from '../contexts/ThemeContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconColor: string;
  description?: string;
  progress?: {
    value: number;
    color: string;
  };
  minMax?: {
    min: string;
    max: string;
  };
  change?: {
    value: string;
    type: 'increase' | 'decrease';
  };
  subtitle?: string;
  theme: ThemeType;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor,
  description,
  progress,
  minMax,
  change,
  subtitle,
  theme
}) => {
  const { theme: contextTheme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 md:p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
            <i className={`${icon} ${iconColor} text-xl`}></i>
          </div>
          <div>
            <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
            <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          </div>
        </div>
        {progress && (
          <div className="text-right">
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {progress.value}%
            </p>
            {description && <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>}
          </div>
        )}
        {minMax && (
          <div className="text-right">
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {minMax.min} - {minMax.max}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard; 