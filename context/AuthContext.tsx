import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const userJson = await AsyncStorage.getItem('@user');
      if (userJson) {
        setUser(JSON.parse(userJson));
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/sign-in');
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      // In a real app, validate against stored credentials
      const storedHash = await SecureStore.getItemAsync(email);
      if (!storedHash) {
        throw new Error('Invalid credentials');
      }

      const userJson = await AsyncStorage.getItem(email);
      if (!userJson) {
        throw new Error('User not found');
      }

      const user = JSON.parse(userJson);
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUser(user);
      router.replace('/(tabs)');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(email: string, password: string, name: string) {
    try {
      setIsLoading(true);

      const existingUser = await SecureStore.getItemAsync('email');
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const userId = Math.random().toString(36).substring(7);
      const user = { id: userId, email, name };

      // Store password hash securely
      //await SecureStore.setItemAsync(email, password);
      console.log
      (email, password)
      // Store user data
      await AsyncStorage.setItem(email, JSON.stringify(user));
      await AsyncStorage.setItem('@user', JSON.stringify(user));

      setUser(user);
      router.replace('/(tabs)');
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('@user');
      setUser(null);
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}