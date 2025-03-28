import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
  isEmailRegistered: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // E-posta doğrulama
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Şifre doğrulama
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // E-posta kayıtlı mı kontrolü
  const isEmailRegistered = (email: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((user: User) => user.email === email);
  };

  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      setCurrentUser(JSON.parse(userJSON));
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    if (!validateEmail(email)) {
      throw new Error('emailInvalid');
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email);

    if (!user || user.password !== password) {
      throw new Error('invalidCredentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setCurrentUser(userWithoutPassword);
  }

  async function register(email: string, password: string, name: string) {
    if (!validateEmail(email)) {
      throw new Error('emailInvalid');
    }

    if (!validatePassword(password)) {
      throw new Error('passwordInvalid');
    }

    if (isEmailRegistered(email)) {
      throw new Error('emailExists');
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
      uid: Date.now().toString(),
      email,
      password,
      displayName: name
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setCurrentUser(userWithoutPassword);
  }

  async function logout() {
    localStorage.removeItem('user');
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    validateEmail,
    validatePassword,
    isEmailRegistered
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 