import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { mockNotifications } from '../../mocks/mockNotifications';
import { formatDate } from '../../utils/formatDate';
import { NotificationCard } from '../../components/cards/NotificationCard';
import { useNotificationStore } from '../../store/notificationStore';

type Props = NativeStackScreenProps<MainStackParamList, 'NotificationCenter'>;

export const NotificationCenterScreen: React.FC<Props> = ({ navigation }) => {
  const { notifications, markAllRead } = useNotificationStore();
  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <ScreenWrapper>
      <Header
        title="Notifications"
        rightAction={
          unread > 0 ? (
            <TouchableOpacity onPress={markAllRead}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySub}>
              You'll get updates on bid rooms, quotes, and order milestones here.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <NotificationCard notification={item} />
        )}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  markAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
});
