import { create } from 'zustand';
import { getStorageItem, setStorageItem, removeStorageItem, storageKeys } from '../utils/storage';
import { User, mockUser } from '../mocks/mockUser';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setCityAndRadius: (city: string, radius: number) => void;
  setPreferredBrands: (brands: string[]) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initial state retrieved from MMKV
  const token = getStorageItem<string>(storageKeys.AUTH_TOKEN);
  const user = getStorageItem<User>(storageKeys.USER_DATA);

  return {
    user,
    token,
    isLoggedIn: !!token,
    login: (token, user) => {
      setStorageItem(storageKeys.AUTH_TOKEN, token);
      setStorageItem(storageKeys.USER_DATA, user);
      set({ token, user, isLoggedIn: true });
    },
    logout: () => {
      removeStorageItem(storageKeys.AUTH_TOKEN);
      removeStorageItem(storageKeys.USER_DATA);
      set({ token: null, user: null, isLoggedIn: false });
    },
    setCityAndRadius: (city, radius) => {
      set((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, city, radius };
        setStorageItem(storageKeys.USER_DATA, updatedUser);
        return { user: updatedUser };
      });
    },
    setPreferredBrands: (brands) => {
      setStorageItem(storageKeys.PREFERRED_BRANDS, brands);
    },
  };
});
