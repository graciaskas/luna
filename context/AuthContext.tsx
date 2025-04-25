import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Platform } from 'react-native';

interface User {
  id: string;
  phone: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (phone: string, password: string) => Promise<void>;
  signUp: (phone: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function setSecureItem(key: string, value: string) {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function getSecureItem(key: string) {
  if (Platform.OS === 'web') {
    return await AsyncStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

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

  async function signIn(phone: string, password: string) {
    try {
      setIsLoading(true);
      const safeKey = phone.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storedPassword = await getSecureItem(`password_${safeKey}`);
      if (!storedPassword || storedPassword !== password) {
        throw new Error('Invalid credentials');
      }

      const userJson = await AsyncStorage.getItem(`user_${safeKey}`);
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

  async function signUp(phone: string, password: string, name: string) {
    try {
      setIsLoading(true);
      const safeKey = phone.replace(/[^a-zA-Z0-9._-]/g, '_');
      const existingPassword = await getSecureItem(`password_${safeKey}`);
      if (existingPassword) {
        throw new Error('Phone number already exists');
      }

      const userId = Math.random().toString(36).substring(7);
      const user = { id: userId, phone, name };

      await setSecureItem(`password_${safeKey}`, password);
      await AsyncStorage.setItem(`user_${safeKey}`, JSON.stringify(user));
      await AsyncStorage.setItem('@user', JSON.stringify(user));

      setUser(user);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfile(data: Partial<User>) {
    try {
      if (!user) throw new Error('No user logged in');
      const updatedUser = { ...user, ...data };
      const safeKey = user.phone.replace(/[^a-zA-Z0-9._-]/g, '_');
      await AsyncStorage.setItem(`user_${safeKey}`, JSON.stringify(updatedUser));
      await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    try {
      if (!user) throw new Error('No user logged in');
      const safeKey = user.phone.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storedPassword = await getSecureItem(`password_${safeKey}`);
      if (!storedPassword || storedPassword !== currentPassword) {
        throw new Error('Current password is incorrect');
      }
      await setSecureItem(`password_${safeKey}`, newPassword);
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
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
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signOut, 
      updateProfile, 
      changePassword, 
      isLoading 
    }}>
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