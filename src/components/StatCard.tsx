import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconColor: string;
  change?: {
    value: string;
    type: 'increase' | 'decrease';
  };
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor,
  change,
  subtitle
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-full ${iconColor} flex items-center justify-center`}>
            <i className={`${icon} text-xl`}></i>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        {change && (
          <div className="text-right">
            <p className={`text-sm font-medium ${change.type === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {change.value}
            </p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard; 