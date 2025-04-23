import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useDevices, Device } from '../contexts/DeviceContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import DeviceCard from '../components/DeviceCard';
import { useTheme } from '../contexts/ThemeContext';

const Devices: React.FC = () => {
  const { devices, addDevice, deleteDevice, updateDeviceStatus, updateDeviceName } = useDevices();
  const { theme } = useTheme();
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showEditDevice, setShowEditDevice] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceId, setNewDeviceId] = useState('');
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);

  const handleAddDevice = () => {
    if (newDeviceName && newDeviceId) {
      addDevice({
        name: newDeviceName,
        type: 'Arduino',
        status: 'active',
        lastSeen: new Date().toLocaleString('tr-TR'),
        arduinoId: newDeviceId,
        data: {
          temperature: 0,
          humidity: 0,
          co2: 0,
          soilMoisture: 0
        }
      });
      setNewDeviceName('');
      setNewDeviceId('');
      setShowAddDevice(false);
    }
  };

  const handleEditDevice = () => {
    if (editingDevice && newDeviceName) {
      updateDeviceName(editingDevice.id, newDeviceName);
      setShowEditDevice(false);
      setEditingDevice(null);
      setNewDeviceName('');
    }
  };

  const handleDeleteDevice = () => {
    if (deviceToDelete) {
      deleteDevice(deviceToDelete);
      setShowDeleteConfirm(false);
      setDeviceToDelete(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    updateDeviceStatus(id);
  };

  const openEditModal = (device: Device) => {
    setEditingDevice(device);
    setNewDeviceName(device.name);
    setShowEditDevice(true);
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className={`size-12 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-200'} flex items-center justify-center`}>
                <i className="ri-device-line text-primary text-2xl"></i>
              </div>
              <div>
                <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Cihaz Yönetimi</h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Arduino cihazlarınızı buradan yönetebilirsiniz</p>
              </div>
            </div>
            <Button onClick={() => setShowAddDevice(true)}>
              <i className="ri-add-line mr-2"></i>
              <span>Yeni Cihaz Ekle</span>
            </Button>
          </div>
        </div>

        <Modal
          isOpen={showAddDevice}
          onClose={() => setShowAddDevice(false)}
          title="Yeni Arduino Cihazı Ekle"
          footer={{
            onCancel: () => setShowAddDevice(false),
            onConfirm: handleAddDevice
          }}
          theme={theme}
        >
          <div className="space-y-4">
            <Input
              label="Cihaz Adı"
              placeholder="Örn: Sera 1"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              theme={theme}
            />
            <Input
              label="Arduino ID"
              placeholder="Örn: ARD001"
              value={newDeviceId}
              onChange={(e) => setNewDeviceId(e.target.value)}
              theme={theme}
            />
          </div>
        </Modal>

        <Modal
          isOpen={showEditDevice}
          onClose={() => {
            setShowEditDevice(false);
            setEditingDevice(null);
          }}
          title="Cihaz Düzenle"
          footer={{
            onCancel: () => {
              setShowEditDevice(false);
              setEditingDevice(null);
            },
            onConfirm: handleEditDevice
          }}
          theme={theme}
        >
          <div className="space-y-4">
            <Input
              label="Cihaz Adı"
              placeholder="Örn: Sera 1"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              theme={theme}
            />
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Arduino ID: {editingDevice?.arduinoId}
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false);
            setDeviceToDelete(null);
          }}
          title="Cihazı Sil"
          footer={{
            onCancel: () => {
              setShowDeleteConfirm(false);
              setDeviceToDelete(null);
            },
            onConfirm: handleDeleteDevice,
            variant: 'danger'
          }}
          theme={theme}
        >
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Bu cihazı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </p>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onEdit={openEditModal}
              onToggleStatus={handleToggleStatus}
              onDelete={(id) => {
                setDeviceToDelete(id);
                setShowDeleteConfirm(true);
              }}
              theme={theme}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(device)}
                  className={`p-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  } transition-colors`}
                >
                  <i className="ri-edit-line text-xl"></i>
                </button>
                <button
                  onClick={() => {
                    setDeviceToDelete(device.id);
                    setShowDeleteConfirm(true);
                  }}
                  className={`p-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'text-red-400 hover:text-white hover:bg-red-900' 
                      : 'text-red-500 hover:text-white hover:bg-red-500'
                  } transition-colors`}
                >
                  <i className="ri-delete-bin-line text-xl"></i>
                </button>
                <button
                  onClick={() => {
                    // Implement view functionality
                  }}
                  className={`p-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'text-blue-400 hover:text-white hover:bg-blue-900' 
                      : 'text-blue-500 hover:text-white hover:bg-blue-500'
                  } transition-colors`}
                >
                  <i className="ri-eye-line text-xl"></i>
                </button>
              </div>
            </DeviceCard>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Devices; 