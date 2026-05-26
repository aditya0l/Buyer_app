/**
 * DocumentListScreen — legacy screen, now redirects to DocumentsVault.
 * Kept for navigator compatibility; navigates to new vault screen.
 */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const DocumentListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Redirect immediately to the proper DocumentsVault screen
    navigation.replace('DocumentsVault');
  }, [navigation]);

  return <View />;
};
