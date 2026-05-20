import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { OTPScreen } from '../screens/auth/OTPScreen';
import { OnboardingCityScreen } from '../screens/auth/OnboardingCityScreen';
import { OnboardingBrandsScreen } from '../screens/auth/OnboardingBrandsScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="OnboardingCity" component={OnboardingCityScreen} />
      <Stack.Screen name="OnboardingBrands" component={OnboardingBrandsScreen} />
    </Stack.Navigator>
  );
};
