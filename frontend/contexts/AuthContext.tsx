import { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUsers } from '../data';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (email: string, password: string, name: string) => boolean;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
  isClient: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser && foundUser.status === 'active') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (email: string, password: string, name: string): boolean => {
    // Vérifier si l'email existe déjà
    if (users.find(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: `u${users.length + 1}`,
      email,
      password,
      name,
      role: 'client',
      status: 'active',
      createdAt: new Date()
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const isAdmin = () => user?.role === 'admin';
  const isEmployee = () => user?.role === 'employee' || user?.role === 'admin';
  const isClient = () => user?.role === 'client';

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAdmin, isEmployee, isClient }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
