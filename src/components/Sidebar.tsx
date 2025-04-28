import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const menuItems = [
    { path: '/home', icon: 'ri-home-line', label: t('sidebar.home') },
    { path: '/devices', icon: 'ri-device-line', label: t('sidebar.deviceManagement') },
    { path: '/reports', icon: 'ri-file-chart-line', label: t('sidebar.reports') },
    { path: '/settings', icon: 'ri-settings-3-line', label: t('sidebar.settings') },
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
      <aside className={`hidden md:block w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg fixed h-full`}>
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
              <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {currentUser?.displayName || t('sidebar.user')}
              </h3>
            </div>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                } ${
                  location.pathname === item.path
                    ? theme === 'dark'
                      ? 'bg-gray-700 text-white border-l-4 border-primary'
                      : 'bg-gray-100 text-gray-900 border-l-4 border-primary'
                    : ''
                }`}
              >
                <i className={`${item.icon} text-xl`}></i>
                <span className="font-medium">{t(item.label)}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-t z-40`}>
        <div className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className={`flex flex-col items-center justify-center p-2 ${
                location.pathname === item.path 
                  ? theme === 'dark' 
                    ? 'text-primary' 
                    : 'text-primary'
                  : theme === 'dark'
                  ? 'text-gray-300'
                  : 'text-gray-600'
              }`}
            >
              <i className={`${item.icon} text-xl mb-1`}></i>
              <span className="text-xs">{t(item.label)}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar; 