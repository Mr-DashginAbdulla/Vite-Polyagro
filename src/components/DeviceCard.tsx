import React from 'react';
import { Device } from '../contexts/DeviceContext';
import Button from './Button';
import Switch from './Switch';
import { ThemeType } from '../contexts/ThemeContext';

interface DeviceCardProps {
  device: Device;
  onEdit: (device: Device) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  theme: ThemeType;
  children?: React.ReactNode;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onEdit,
  onToggleStatus,
  onDelete,
  theme
}) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${
      theme === 'dark' 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-800'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-full flex items-center justify-center ${
            device.status === 'active' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <i className={`ri-device-line text-xl ${
              device.status === 'active' ? 'text-green-500' : 'text-red-500'
            }`}></i>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {device.name}
            </h3>
            <p className={`text-sm mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              ID: {device.arduinoId}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="icon"
            onClick={() => onEdit(device)}
            className={`${theme === 'dark' ? 'text-white hover:text-blue-300 hover:bg-blue-700' : 'text-gray-800 hover:text-blue-500 hover:bg-blue-100'}`}
          >
            <i className="ri-edit-line"></i>
          </Button>
          <Button
            variant="icon"
            onClick={() => onDelete(device.id)}
            className={`text-${theme === 'dark' ? 'white' : 'gray-800'} hover:text-${theme === 'dark' ? 'red-300' : 'red-500'} hover:bg-${theme === 'dark' ? 'red-700' : 'red-100'}`}
          >
            <i className="ri-delete-bin-line"></i>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Cihaz Durumu:</span>
          <span className={`text-sm font-medium ${
            device.status === 'active' ? 'text-green-600' : 'text-red-600'
          }`}>
            {device.status === 'active' ? 'Aktif' : 'Pasif'}
          </span>
        </div>
        <Switch
          checked={device.status === 'active'}
          onChange={() => onToggleStatus(device.id)}
          size="md"
          color="green"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Son Görülme:</span>
        <span className="font-medium">{device.lastSeen}</span>
      </div>
    </div>
  );
};

export default DeviceCard; 