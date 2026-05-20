import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { NotificationCard } from '../../components/cards/NotificationCard';
import { useNotificationStore } from '../../store/notificationStore';

export const NotificationCenterScreen: React.FC = () => {
  const { notifications, initializeNotifications, markAllAsRead, markAsRead } = useNotificationStore();

  useEffect(() => {
    initializeNotifications();
  }, [initializeNotifications]);

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header
        title="Notification Center"
        rightAction={
          <TouchableOpacity onPress={handleMarkAllRead}>
            <Text style={styles.markReadText}>Read All</Text>
          </TouchableOpacity>
        }
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onPress={() => markAsRead(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔔</Text>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySub}>
              No new alerts or bid updates at the moment.
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 48,
  },
  emptyEmoji: {
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
    marginTop: 4,
  },
});
