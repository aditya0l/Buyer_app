import React from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { formatPrice } from '../../utils/formatPrice';

interface SavingsChipProps {
  amount: number;
  style?: StyleProp<ViewStyle>;
}

export const SavingsChip: React.FC<SavingsChipProps> = ({ amount, style }) => {
  if (amount <= 0) return null;
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>Saved {formatPrice(amount, true)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.liveLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.live,
  },
  text: {
    color: colors.live,
    fontWeight: '700',
    fontSize: 12,
  },
});
