import { createContext, useContext, useState, ReactNode } from 'react';
import userData from '../data/users.json';

interface User {
  id: number;
  username: string;
  email: string;
  todos: any[];
  workouts: any[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const foundUser = userData.users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const register = async (username: string, password: string, email: string) => {
    const userExists = userData.users.some(
      u => u.username === username || u.email === email
    );

    if (userExists) {
      return false;
    }

    // 실제로는 서버에 저장해야 하지만, 테스트를 위해 임시로 처리
    const newUser = {
      id: userData.users.length + 1,
      username,
      email,
      todos: [],
      workouts: []
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 