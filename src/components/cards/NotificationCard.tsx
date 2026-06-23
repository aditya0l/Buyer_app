import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppNotification } from '../../mocks/mockNotifications';

interface Props {
  notification: AppNotification;
  onPress?: () => void;
}

export const NotificationCard: React.FC<Props> = ({ notification, onPress }) => {
  const getIconProps = () => {
    switch (notification.type) {
      case 'ROOM_CLOSES':
      case 'ROOM_EXPIRING':
        return { emoji: '⏰', bg: '#F3F4F6' };
      case 'NEW_BID':
        return { emoji: '🏆', bg: '#EFF6FF' };
      case 'DEALERS_JOINED':
        return { emoji: '⚡', bg: '#FFF7ED' };
      case 'ROOM_LIVE':
        return { emoji: '🔴', bg: '#FEF2F2' };
      case 'FINANCE':
        return { emoji: '🏦', bg: '#EFF6FF' };
      case 'REFUND':
        return { emoji: '✔️', bg: '#F0FDF4' };
      case 'SAVINGS':
        return { emoji: '🎉', bg: '#FEFCE8' };
      default:
        return { emoji: '🔔', bg: '#F8FAFC' };
    }
  };

  const { emoji, bg } = getIconProps();
  const isUnread = !notification.isRead;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={[styles.card, isUnread && styles.unreadCard]}>
        <View style={styles.topRow}>
          <View style={[styles.iconBox, { backgroundColor: bg }]}>
            <Text style={styles.icon}>{emoji}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.desc}>{notification.description}</Text>
            
            {notification.hasProgressBar && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '45%' }]} />
                </View>
                {notification.progressText && (
                  <Text style={styles.progressText}>{notification.progressText}</Text>
                )}
              </View>
            )}

            {!notification.hasProgressBar && (
              <Text style={styles.timeLabel}>{notification.timeLabel}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  unreadCard: {
    backgroundColor: '#EEF2FF',
    borderColor: '#E0E7FF',
  },
  topRow: {
    flexDirection: 'row',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: '#0F172A',
    fontFamily: 'Outfit-Bold',
    marginBottom: 2,
  },
  desc: {
    fontSize: 13,
    color: '#64748B',
    fontFamily: 'Outfit-Regular',
    lineHeight: 18,
    marginBottom: 6,
  },
  timeLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Outfit-Regular',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    width: '100%',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#EA580C',
    fontFamily: 'Outfit-Medium',
  },
});
