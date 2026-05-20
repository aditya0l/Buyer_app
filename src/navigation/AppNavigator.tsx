import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/authStore';
import { AuthStackNavigator } from './AuthStackNavigator';
import { MainStackNavigator } from './MainStackNavigator';

export const AppNavigator: React.FC = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default AppNavigator;
