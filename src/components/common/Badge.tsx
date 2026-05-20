import React from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';

export type BadgeType = 'LIVE' | 'WAITING' | 'DONE' | 'LOCKED' | 'CANCELLED';

interface BadgeProps {
  type: BadgeType;
  customText?: string;
  style?: StyleProp<ViewStyle>;
}

export const Badge: React.FC<BadgeProps> = ({ type, customText, style }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'LIVE':
        return { container: styles.liveBg, text: styles.liveText, label: '● LIVE' };
      case 'WAITING':
        return { container: styles.waitingBg, text: styles.waitingText, label: '⏱ WAITING' };
      case 'DONE':
        return { container: styles.liveBg, text: styles.liveText, label: '✓ DONE' };
      case 'LOCKED':
        return { container: styles.lockedBg, text: styles.lockedText, label: '🔒 LOCKED' };
      case 'CANCELLED':
        return { container: styles.cancelledBg, text: styles.cancelledText, label: '✕ CANCELLED' };
      default:
        return { container: styles.defaultBg, text: styles.defaultText, label: '' };
    }
  };

  const badgeConfig = getBadgeStyle();

  return (
    <View style={[styles.container, badgeConfig.container, style]}>
      <Text style={[styles.text, badgeConfig.text]}>
        {customText || badgeConfig.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveBg: {
    backgroundColor: colors.liveLight,
  },
  liveText: {
    color: colors.live,
  },
  waitingBg: {
    backgroundColor: colors.waitingLight,
  },
  waitingText: {
    color: colors.waiting,
  },
  lockedBg: {
    backgroundColor: colors.primaryLight,
  },
  lockedText: {
    color: colors.primary,
  },
  cancelledBg: {
    backgroundColor: colors.errorLight,
  },
  cancelledText: {
    color: colors.error,
  },
  defaultBg: {
    backgroundColor: colors.border,
  },
  defaultText: {
    color: colors.textSecondary,
  },
});
