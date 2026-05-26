import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const storageKeys = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  PREFERRED_BRANDS: 'preferred_brands',
  USER_CITY: 'user_city',
};

export const getStorageItem = <T>(key: string): T | null => {
  try {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting storage item:', error);
  }
};

export const removeStorageItem = (key: string): void => {
  storage.remove(key);
};
