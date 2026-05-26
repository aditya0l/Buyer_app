import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';

type Props = NativeStackScreenProps<MainStackParamList, 'Security'>;

const mockSessions = [
  {
    id: 'sess-1',
    device: 'iPhone 15 Pro',
    os: 'iOS 17.4',
    location: 'Delhi, IN',
    lastActive: '2 minutes ago',
    current: true,
  },
  {
    id: 'sess-2',
    device: 'MacBook Pro',
    os: 'macOS 14.4',
    location: 'Delhi, IN',
    lastActive: '3 days ago',
    current: false,
  },
];

export const SecurityScreen: React.FC<Props> = () => {
  const handleRevokeSession = (sessionId: string) => {
    Alert.alert(
      'Revoke Session',
      'This will sign out the device from CarBounty. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Revoke', style: 'destructive', onPress: () => Alert.alert('Session revoked') },
      ]
    );
  };

  return (
    <ScreenWrapper>
      <Header title="Security & Sessions" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Security actions */}
        <View style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.8}
            onPress={() =>
              Alert.alert('OTP Sent', 'A one-time password has been sent to your registered number.')
            }
          >
            <Text style={styles.actionIcon}>📲</Text>
            <View style={styles.actionLeft}>
              <Text style={styles.actionTitle}>Verify via OTP</Text>
              <Text style={styles.actionDesc}>Authenticate sensitive actions with OTP</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Active sessions */}
        <Text style={styles.sectionTitle}>Active Sessions</Text>
        {mockSessions.map((session) => (
          <View key={session.id} style={styles.sessionCard}>
            <View style={styles.sessionTop}>
              <Text style={styles.sessionDevice}>
                {session.current ? '📱' : '💻'} {session.device}
              </Text>
              {session.current ? (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>This Device</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handleRevokeSession(session.id)}
                  style={styles.revokeBtn}
                >
                  <Text style={styles.revokeBtnText}>Revoke</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.sessionMeta}>
              {session.os} · {session.location}
            </Text>
            <Text style={styles.sessionTime}>Last active: {session.lastActive}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.revokeAllBtn}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              'Sign Out All Devices',
              'This will sign out all other devices. You will remain signed in on this device.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Proceed', style: 'destructive', onPress: () => {} },
              ]
            )
          }
        >
          <Text style={styles.revokeAllText}>Sign Out All Other Devices</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  actionsCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  actionIcon: {
    fontSize: 22,
  },
  actionLeft: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  actionDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  arrow: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  sessionCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  sessionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sessionDevice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  currentBadge: {
    backgroundColor: colors.liveLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  currentBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.live,
  },
  revokeBtn: {
    backgroundColor: colors.errorLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  revokeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.error,
  },
  sessionMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  sessionTime: {
    fontSize: 11,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  revokeAllBtn: {
    borderWidth: 1.5,
    borderColor: colors.error,
    borderRadius: radius.md,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  revokeAllText: {
    color: colors.error,
    fontWeight: '700',
    fontSize: 14,
  },
});
