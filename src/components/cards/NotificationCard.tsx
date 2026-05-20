import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { Card } from '../common/Card';

interface NotificationCardProps {
  notification: {
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
    isRead: boolean;
  };
  onPress: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onPress }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'ROOM_LIVE':
        return '⚡';
      case 'NEW_QUOTE':
        return '💰';
      case 'WINNER_SELECTED':
        return '🎉';
      case 'LOCK_CONFIRMED':
        return '🔒';
      case 'VIN_ASSIGNED':
        return '🚙';
      case 'PDI_SCHEDULED':
        return '⏱';
      case 'DELIVERY_UPDATE':
        return '🚚';
      case 'REFUND_PROCESSED':
        return '💵';
      default:
        return '🔔';
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Card style={[styles.card, !notification.isRead && styles.unreadCard]}>
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>{getIcon()}</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={[styles.title, !notification.isRead && styles.unreadText]}>
                {notification.title}
              </Text>
              {!notification.isRead && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.description}>{notification.description}</Text>
            <Text style={styles.date}>{notification.date}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  unreadCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  container: {
    flexDirection: 'row',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  unreadText: {
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  date: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 6,
  },
});
