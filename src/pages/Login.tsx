import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, register, validateEmail, validatePassword, isEmailRegistered } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const validatePasswordStrength = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!minLength) return 'passwordMinLength';
    if (!hasUpperCase || !hasLowerCase) return 'passwordCase';
    if (!hasNumber) return 'passwordNumber';
    return null;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email) {
        throw new Error('emailRequired');
      }

      if (!password) {
        throw new Error('passwordRequired');
      }

      if (!isLogin) {
        if (!name) {
          throw new Error('nameRequired');
        }

        if (password !== confirmPassword) {
          throw new Error('passwordMismatch');
        }

        if (isEmailRegistered(email)) {
          throw new Error('emailExists');
        }

        if (!validateEmail(email)) {
          throw new Error('emailInvalid');
        }

        const passwordError = validatePasswordStrength(password);
        if (passwordError) {
          throw new Error(passwordError);
        }

        await register(email, password, name);
      } else {
        if (!validateEmail(email)) {
          throw new Error('emailInvalid');
        }

        try {
          await login(email, password);
        } catch (loginErr: any) {
          throw new Error('invalidCredentials');
        }
      }

      navigate('/dashboard');
    } catch (err: any) {
      setError(t(err.message));
    }

    setLoading(false);
  }

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://public.readdy.ai/ai/img_res/a5b9a49c768365ea163f7929b5d3aa13.jpg')" }}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'} rounded-lg shadow-xl p-8`}>
          <div className="flex justify-end space-x-4 mb-4">
            <div className="flex space-x-2">
              <button 
                onClick={() => changeLanguage('az')} 
                className={`px-3 py-1.5 text-xs rounded-full ${
                  language === 'az' 
                    ? 'bg-[#22c55e] text-white' 
                    : theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-[#f1f5f9] hover:bg-gray-200'
                }`}
              >
                AZ
              </button>
              <button 
                onClick={() => changeLanguage('en')} 
                className={`px-3 py-1.5 text-xs rounded-full ${
                  language === 'en' 
                    ? 'bg-[#22c55e] text-white' 
                    : theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-[#f1f5f9] hover:bg-gray-200'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => changeLanguage('ru')} 
                className={`px-3 py-1.5 text-xs rounded-full ${
                  language === 'ru' 
                    ? 'bg-[#22c55e] text-white' 
                    : theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-[#f1f5f9] hover:bg-gray-200'
                }`}
              >
                RU
              </button>
            </div>
            <button 
              onClick={toggleTheme}
              className="text-sm rounded-full hover:opacity-80"
            >
              {theme === 'dark' ? 
                <i className="ri-sun-line text-yellow-400 text-lg"></i> : 
                <i className="ri-moon-line text-gray-600 text-lg"></i>
              }
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-[pacifico] text-3xl text-[#22c55e]">PolyAgro</h1>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className={`inline-flex rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-[#f1f5f9]'} p-1`}>
              <button 
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-full ${
                  isLogin 
                    ? theme === 'dark'
                      ? 'bg-gray-600 text-white'
                      : 'bg-white shadow-sm'
                    : theme === 'dark'
                      ? 'text-gray-300'
                      : ''
                } text-sm font-medium whitespace-nowrap transition-colors`}
              >
                {t('login')}
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-full ${
                  !isLogin 
                    ? theme === 'dark'
                      ? 'bg-gray-600 text-white'
                      : 'bg-white shadow-sm'
                    : theme === 'dark'
                      ? 'text-gray-300'
                      : ''
                } text-sm font-medium whitespace-nowrap transition-colors`}
              >
                {t('register')}
              </button>
            </div>
          </div>

          {error && (
            <div 
              className={`${
                theme === 'dark'
                  ? 'bg-red-900/50 border-red-800 text-red-200'
                  : 'bg-red-50 border-red-400 text-red-700'
              } border px-4 py-3 rounded-md relative mb-4 flex items-center shadow-sm`}
              role="alert"
            >
              <i className={`ri-error-warning-line text-lg mr-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-500'}`}></i>
              <span className="block sm:inline font-medium">{error}</span>
              <button 
                onClick={() => setError('')}
                className="absolute top-0 bottom-0 right-0 px-4 py-3 hover:opacity-75"
                aria-label="Kapat"
              >
                <i className={`ri-close-line ${theme === 'dark' ? 'text-red-300' : 'text-red-500'}`}></i>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                  {t('fullName')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-user-line text-gray-400"></i>
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-[#f8fafc] border-gray-200 text-gray-900'
                    } rounded-button text-sm focus:ring-2 focus:ring-[#22c55e] focus:border-transparent`}
                    placeholder={t('fullName')}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                {t('email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-gray-400"></i>
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-[#f8fafc] border-gray-200 text-gray-900'
                  } rounded-button text-sm focus:ring-2 focus:ring-[#22c55e] focus:border-transparent`}
                  placeholder="nümunə@email.com" 
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-lock-line text-gray-400"></i>
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-[#f8fafc] border-gray-200 text-gray-900'
                  } rounded-button text-sm focus:ring-2 focus:ring-[#22c55e] focus:border-transparent cursor-text`}
                  placeholder="••••••••" 
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400`}></i>
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                  {t('confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-lock-line text-gray-400"></i>
                  </div>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2 border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-[#f8fafc] border-gray-200 text-gray-900'
                    } rounded-button text-sm focus:ring-2 focus:ring-[#22c55e] focus:border-transparent cursor-text`}
                    placeholder="••••••••" 
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <i className={`${showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400`}></i>
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className={`h-4 w-4 ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-gray-700'
                        : 'border-gray-300'
                    } text-[#22c55e] rounded-md cursor-pointer focus:ring-[#22c55e]`}
                  />
                  <label className={`ml-2 block text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} cursor-pointer`}>
                    {t('rememberMe')}
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-[#22c55e] hover:text-[#22c55e]/80 cursor-pointer">
                  {t('forgotPassword')}
                </a>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#22c55e] text-white py-2 rounded-button hover:bg-[#22c55e]/90 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLogin ? t('login') : t('register')}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-white text-gray-500'
                }`}>
                  {t('continueWith')}
                </span>
              </div>
            </div>

            <button 
              type="button" 
              className={`w-full flex items-center justify-center px-4 py-2 border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              } rounded-button transition-colors cursor-pointer`}
            >
              <i className="ri-google-fill text-[#4285F4] mr-2"></i>
              <span className={theme === 'dark' ? 'text-gray-200' : ''}>Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 