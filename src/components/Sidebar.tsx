import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const menuItems = [
    { path: '/', icon: 'ri-dashboard-line', label: 'Kontrol Paneli' },
    { path: '/devices', icon: 'ri-device-line', label: 'Cihaz Yönetimi' },
    { path: '/reports', icon: 'ri-file-chart-line', label: 'Raporlar' },
    { path: '/settings', icon: 'ri-settings-3-line', label: 'Ayarlar' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="size-12 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://public.readdy.ai/ai/img_res/4caca88683cad389e7d4e705abf7409e.jpg"
                className="w-full h-full object-cover"
                alt="Profil"
              />
            </div>
            <div>
              <h3 className="font-medium">{currentUser?.displayName || 'Kullanıcı'}</h3>
              <p className="text-sm text-gray-500">Sera Yöneticisi</p>
            </div>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary bg-green-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="w-full mt-8 flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <i className="ri-logout-box-line"></i>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-2 ${
                location.pathname === item.path ? 'text-primary' : 'text-gray-600'
              }`}
            >
              <i className={`${item.icon} text-xl mb-1`}></i>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar; 