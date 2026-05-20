import React from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';

type TagType = 'Best Price' | 'Fastest' | 'Best Perks';

interface TagProps {
  type: TagType;
  style?: StyleProp<ViewStyle>;
}

export const Tag: React.FC<TagProps> = ({ type, style }) => {
  const getTagStyle = () => {
    switch (type) {
      case 'Best Price':
        return {
          container: styles.priceBg,
          text: styles.priceText,
          label: '🔥 Best Price',
        };
      case 'Fastest':
        return {
          container: styles.fastBg,
          text: styles.fastText,
          label: '⚡ Fastest Delivery',
        };
      case 'Best Perks':
        return {
          container: styles.perksBg,
          text: styles.perksText,
          label: '🎁 Best Perks',
        };
      default:
        return {
          container: styles.defaultBg,
          text: styles.defaultText,
          label: type,
        };
    }
  };

  const tagConfig = getTagStyle();

  return (
    <View style={[styles.container, tagConfig.container, style]}>
      <Text style={[styles.text, tagConfig.text]}>{tagConfig.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    marginRight: 6,
    marginBottom: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
  priceBg: {
    backgroundColor: colors.liveLight,
  },
  priceText: {
    color: colors.live,
  },
  fastBg: {
    backgroundColor: colors.waitingLight,
  },
  fastText: {
    color: colors.waiting,
  },
  perksBg: {
    backgroundColor: colors.primaryLight,
  },
  perksText: {
    color: colors.primary,
  },
  defaultBg: {
    backgroundColor: colors.borderLight,
  },
  defaultText: {
    color: colors.textSecondary,
  },
});
