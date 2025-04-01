import React from 'react';

interface ControlCardProps {
  title: string;
  isEnabled: boolean;
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valueLabel?: string;
  valueUnit?: string;
  buttonText: string;
  onButtonClick: () => void;
  buttonDisabled?: boolean;
}

const ControlCard: React.FC<ControlCardProps> = ({
  title,
  isEnabled,
  onToggle,
  value,
  onValueChange,
  valueLabel,
  valueUnit,
  buttonText,
  onButtonClick,
  buttonDisabled
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-medium mb-4">{title}</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600">Otomatik Mod</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isEnabled} 
            onChange={onToggle} 
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22c55e]"></div>
        </label>
      </div>
      {value !== undefined && onValueChange && (
        <div className={`mb-4 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <label className="block text-sm text-gray-600 mb-2">
            {valueLabel}: {value}{valueUnit}
          </label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={value} 
            onChange={onValueChange} 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={!isEnabled}
          />
        </div>
      )}
      <button 
        className={`w-full px-4 py-2 bg-green-200 text-green-700 rounded-lg font-medium transition-all active:scale-95 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-300'}`}
        onClick={onButtonClick}
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ControlCard; 