import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';

interface ProgressBarProps {
  progress: number; // Percentage value (0 - 100)
  style?: StyleProp<ViewStyle>;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, style }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.fill, { width: `${clampedProgress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    width: '100%',
    backgroundColor: colors.border,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
});
