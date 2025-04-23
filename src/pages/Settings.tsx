import React, { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import Input from '../components/Input';
import Alert from '../components/Alert';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string>(
    'https://public.readdy.ai/ai/img_res/4caca88683cad389e7d4e705abf7409e.jpg'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: currentUser?.displayName?.split(' ')[0] || '',
    lastName: currentUser?.displayName?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        // Burada resmi backend'e yükleme işlemi yapılabilir
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Kullanıcı bilgilerini güncelleme işlemi
      const updatedUser = {
        ...currentUser,
        displayName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone
      };
      
      // localStorage'a kaydet
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Şifre değişikliği varsa
      if (passwordData.newPassword && passwordData.newPassword === passwordData.confirmPassword) {
        // Şifre değiştirme işlemi burada yapılacak
        console.log('Password changed');
      }

      setAlert({
        type: 'success',
        message: t('settings.saveSuccess')
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: t('settings.saveError')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      setShowLogoutModal(false);
      navigate('/login');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  const logout = async () => {
    try {
      // API çağrısı yapılabilir
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Diğer temizlik işlemleri
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
      throw error;
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300 pb-20 md:pb-0">
        <div className="p-4 md:p-8">
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
              theme={theme}
            />
          )}
          
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-green-100'
                } flex items-center justify-center`}>
                  <i className="ri-settings-3-line text-primary text-xl"></i>
                </div>
                <div>
                  <h2 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {t('settings.title')}
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('settings.profile')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6`}>
            <h3 className={`text-lg font-medium mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('settings.profile')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className={`w-32 h-32 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                } overflow-hidden mb-4 relative group`}>
                  <img 
                    src={profileImage}
                    className="w-full h-full object-cover" 
                    alt="Profile"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-white text-sm flex flex-col items-center"
                    >
                      <i className="ri-camera-line text-xl mb-1"></i>
                      <span>{t('settings.changePhoto')}</span>
                    </button>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t('settings.changePhotoHint')}
                </p>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    label={t('settings.firstName')}
                    placeholder={t('settings.firstNamePlaceholder')}
                    theme={theme}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    label={t('settings.lastName')}
                    placeholder={t('settings.lastNamePlaceholder')}
                    theme={theme}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    label={t('settings.email')}
                    placeholder={t('settings.emailPlaceholder')}
                    theme={theme}
                  />
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    label={t('settings.phone')}
                    placeholder={t('settings.phonePlaceholder')}
                    theme={theme}
                  />
                </div>
              </div>
            </div>
            
            <div className={`mt-6 pt-6 border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h4 className={`text-md font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('settings.changePassword')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  label={t('settings.currentPassword')}
                  placeholder="••••••••"
                  theme={theme}
                />
                <Input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  label={t('settings.newPassword')}
                  placeholder="••••••••"
                  theme={theme}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  label={t('settings.confirmPassword')}
                  placeholder="••••••••"
                  theme={theme}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    {t('settings.saving')}
                  </>
                ) : (
                  t('settings.save')
                )}
              </button>
            </div>
          </form>
          
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <h3 className={`text-lg font-medium mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('settings.appearance')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className={`text-md font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('settings.theme')}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="radio"
                      id="lightTheme"
                      name="theme"
                      value="light"
                      className="sr-only"
                      checked={theme === 'light'}
                      onChange={() => toggleTheme()}
                    />
                    <label
                      htmlFor="lightTheme"
                      className={`flex items-center gap-3 p-4 h-24 rounded-xl cursor-pointer transition-all duration-200 ${
                        theme === 'dark' 
                          ? 'bg-[#f5f7fa] hover:bg-[#edf2f7]' 
                          : 'bg-white hover:bg-[#f5f7fa]'
                      } border-2 ${
                        theme === 'light' 
                          ? 'border-primary shadow-lg' 
                          : 'border-[#e2e8f0]'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg ${
                        theme === 'dark' ? 'bg-white' : 'bg-[#f5f7fa]'
                      } flex items-center justify-center`}>
                        <i className={`ri-sun-line text-2xl ${
                          theme === 'light' ? 'text-primary' : 'text-[#718096]'
                        }`}></i>
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-[#1a202c]' : 'text-[#1a202c]'
                        }`}>{t('settings.light')}</h4>
                      </div>
                      <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${
                        theme === 'light' ? 'bg-primary' : 'bg-transparent'
                      }`}>
                        {theme === 'light' && <i className="ri-check-line text-white text-sm"></i>}
                      </div>
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="radio"
                      id="darkTheme"
                      name="theme"
                      value="dark"
                      className="sr-only"
                      checked={theme === 'dark'}
                      onChange={() => toggleTheme()}
                    />
                    <label
                      htmlFor="darkTheme"
                      className={`flex items-center gap-3 p-4 h-24 rounded-xl cursor-pointer transition-all duration-200 ${
                        theme === 'dark' 
                          ? 'bg-gray-800 hover:bg-gray-700' 
                          : 'bg-[#1a202c] hover:bg-[#2d3748]'
                      } border-2 ${
                        theme === 'dark' 
                          ? 'border-primary shadow-lg' 
                          : 'border-[#2d3748]'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-[#2d3748]'
                      } flex items-center justify-center`}>
                        <i className={`ri-moon-line text-2xl ${
                          theme === 'dark' ? 'text-primary' : 'text-[#a0aec0]'
                        }`}></i>
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-[#a0aec0]'
                        }`}>{t('settings.dark')}</h4>
                      </div>
                      <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${
                        theme === 'dark' ? 'bg-primary' : 'bg-transparent'
                      }`}>
                        {theme === 'dark' && <i className="ri-check-line text-white text-sm"></i>}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className={`text-md font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('settings.language')}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      type="radio"
                      id="azLang"
                      name="language"
                      value="az"
                      className="sr-only"
                      checked={language === 'az'}
                      onChange={() => changeLanguage('az')}
                    />
                    <label
                      htmlFor="azLang"
                      className={`flex items-center justify-center gap-2 p-4 h-24 rounded-xl cursor-pointer transition-all duration-200 ${
                        theme === 'dark' 
                          ? 'bg-gray-800 hover:bg-gray-700' 
                          : 'bg-white hover:bg-gray-50'
                      } border-2 ${
                        language === 'az' 
                          ? 'border-primary shadow-lg' 
                          : 'border-gray-200'
                      }`}
                    >
                      <span className={`text-2xl font-bold ${
                        language === 'az' ? 'text-primary' : 'text-gray-500'
                      }`}>AZ</span>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Azərbaycan</span>
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="radio"
                      id="enLang"
                      name="language"
                      value="en"
                      className="sr-only"
                      checked={language === 'en'}
                      onChange={() => changeLanguage('en')}
                    />
                    <label
                      htmlFor="enLang"
                      className={`flex items-center justify-center gap-2 p-4 h-24 rounded-xl cursor-pointer transition-all duration-200 ${
                        theme === 'dark' 
                          ? 'bg-gray-800 hover:bg-gray-700' 
                          : 'bg-white hover:bg-gray-50'
                      } border-2 ${
                        language === 'en' 
                          ? 'border-primary shadow-lg' 
                          : 'border-gray-200'
                      }`}
                    >
                      <span className={`text-2xl font-bold ${
                        language === 'en' ? 'text-primary' : 'text-gray-500'
                      }`}>EN</span>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>English</span>
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="radio"
                      id="ruLang"
                      name="language"
                      value="ru"
                      className="sr-only"
                      checked={language === 'ru'}
                      onChange={() => changeLanguage('ru')}
                    />
                    <label
                      htmlFor="ruLang"
                      className={`flex items-center justify-center gap-2 p-4 h-24 rounded-xl cursor-pointer transition-all duration-200 ${
                        theme === 'dark' 
                          ? 'bg-gray-800 hover:bg-gray-700' 
                          : 'bg-white hover:bg-gray-50'
                      } border-2 ${
                        language === 'ru' 
                          ? 'border-primary shadow-lg' 
                          : 'border-gray-200'
                      }`}
                    >
                      <span className={`text-2xl font-bold ${
                        language === 'ru' ? 'text-primary' : 'text-gray-500'
                      }`}>RU</span>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Русский</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mt-6`}>
            <h3 className={`text-lg font-medium mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('settings.account')}
            </h3>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                theme === 'dark'
                  ? 'text-red-400 hover:bg-gray-700 hover:text-red-300'
                  : 'text-red-600 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              <i className="ri-logout-box-line text-xl"></i>
              <span className="font-medium">{t('settings.logout')}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title={t('settings.logout')}
        footer={{
          onCancel: () => setShowLogoutModal(false),
          onConfirm: handleConfirmLogout,
          variant: 'danger'
        }}
        theme={theme}
      >
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          {t('settings.logoutConfirm')}
        </p>
      </Modal>
    </div>
  );
};

export default Settings; 