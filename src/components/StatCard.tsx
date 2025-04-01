import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  iconColor: string;
  description?: string;
  minMax?: {
    min: string;
    max: string;
  };
  progress?: {
    value: number;
    color: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor,
  description,
  minMax,
  progress
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <i className={`${icon} ${iconColor}`}></i>
      </div>
      <div className="text-3xl font-medium mb-2">{value}</div>
      {progress && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full`} 
            style={{ 
              width: `${progress.value}%`,
              backgroundColor: progress.color
            }}
          ></div>
        </div>
      )}
      {minMax && (
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500">Min: {minMax.min}</span>
          <span className="text-gray-500">Max: {minMax.max}</span>
        </div>
      )}
      {description && (
        <p className={`text-sm ${progress ? 'text-gray-500 mt-2' : 'text-green-500'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard; 