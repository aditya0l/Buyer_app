import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Avatar } from '../../components/common/Avatar';
import { useAuthStore } from '../../store/authStore';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of CarBounty?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="My Account" showBack={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.profileCard}>
          <Avatar name={user?.name || 'User'} sourceUrl={user?.avatarUrl} size={64} />
          <Text style={styles.userName}>{user?.name || 'CarBounty User'}</Text>
          <Text style={styles.userPhone}>+91 {user?.phone || '9876543210'}</Text>
          <Text style={styles.userCity}>📍 {user?.city || 'Delhi NCR'} • {user?.searchRadius || 25} km radius</Text>
        </View>

        {/* Option rows list */}
        <View style={styles.optionsList}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.optionRow}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>✏️</Text>
              <Text style={styles.optionLabel}>Edit Profile</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PurchaseHistory')}
            style={styles.optionRow}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>📜</Text>
              <Text style={styles.optionLabel}>Purchase History</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Wallet')}
            style={styles.optionRow}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>💵</Text>
              <Text style={styles.optionLabel}>Wallet & Deal Credits</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('DocumentsVault')}
            style={styles.optionRow}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>📁</Text>
              <Text style={styles.optionLabel}>Documents Vault</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Support')}
            style={styles.optionRow}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🎫</Text>
              <Text style={styles.optionLabel}>Support</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PrivacySettings')}
            style={styles.optionRow}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🔏</Text>
              <Text style={styles.optionLabel}>Privacy & Visibility</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Security')}
            style={styles.optionRow}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🔒</Text>
              <Text style={styles.optionLabel}>Security & Sessions</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Sign out button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogout}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutBtnText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  profileCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 24,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 12,
  },
  userPhone: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  userCity: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 6,
  },
  optionsList: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
    marginBottom: 32,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  arrow: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  signOutBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: radius.md,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutBtnText: {
    color: colors.error,
    fontWeight: '700',
    fontSize: 14,
  },
});
