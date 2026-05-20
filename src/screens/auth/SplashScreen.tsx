import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';
import { colors } from '../../constants/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    const checkAuth = setTimeout(() => {
      if (isLoggedIn) {
        // Logged in, go to MainTabs (which is configured in Root navigator)
        // Root navigator will automatically switch from AuthStack to MainStack based on token presence
      } else {
        navigation.replace('OTP');
      }
    }, 1500);

    return () => clearTimeout(checkAuth);
  }, [isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Text style={styles.logoEmoji}>🚙</Text>
        <Text style={styles.logoText}>CarBounty</Text>
        <Text style={styles.tagline}>Dealer bids. You save.</Text>
      </View>
      <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 72,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: colors.primaryLight,
    marginTop: 6,
    fontWeight: '500',
  },
  loader: {
    position: 'absolute',
    bottom: 64,
  },
});
