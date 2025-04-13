import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  lastSeen: string;
  arduinoId: string;
  data: {
    temperature: number;
    humidity: number;
    co2: number;
    soilMoisture: number;
  };
}

interface DeviceContextType {
  devices: Device[];
  addDevice: (device: Omit<Device, 'id'>) => void;
  deleteDevice: (id: string) => void;
  updateDeviceName: (id: string, name: string) => void;
  updateDeviceStatus: (id: string) => void;
  updateDeviceData: (id: string, data: Partial<Device['data']>) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
};

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Arduino UNO',
      type: 'Arduino',
      status: 'active',
      lastSeen: new Date().toLocaleString('tr-TR'),
      arduinoId: 'ARD001',
      data: {
        temperature: 25,
        humidity: 65,
        co2: 800,
        soilMoisture: 70
      }
    }
  ]);

  const addDevice = (device: Omit<Device, 'id'>) => {
    const newDevice: Device = {
      ...device,
      id: Date.now().toString()
    };
    setDevices(prev => [...prev, newDevice]);
  };

  const deleteDevice = (id: string) => {
    setDevices(prev => prev.filter(device => device.id !== id));
  };

  const updateDeviceName = (id: string, name: string) => {
    setDevices(prev =>
      prev.map(device =>
        device.id === id ? { ...device, name } : device
      )
    );
  };

  const updateDeviceStatus = (id: string) => {
    setDevices(prev =>
      prev.map(device =>
        device.id === id
          ? { ...device, status: device.status === 'active' ? 'inactive' : 'active' }
          : device
      )
    );
  };

  const updateDeviceData = (id: string, data: Partial<Device['data']>) => {
    setDevices(prev =>
      prev.map(device =>
        device.id === id
          ? { ...device, data: { ...device.data, ...data }, lastSeen: new Date().toLocaleString('tr-TR') }
          : device
      )
    );
  };

  return (
    <DeviceContext.Provider
      value={{
        devices,
        addDevice,
        deleteDevice,
        updateDeviceName,
        updateDeviceStatus,
        updateDeviceData
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}; 