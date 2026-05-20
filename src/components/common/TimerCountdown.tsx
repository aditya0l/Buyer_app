import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useTimer } from '../../hooks/useTimer';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';

interface TimerCountdownProps {
  initialSeconds: number;
  onTimeUp?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const TimerCountdown: React.FC<TimerCountdownProps> = ({
  initialSeconds,
  onTimeUp,
  style,
  textStyle,
}) => {
  const { formattedTime, isCritical } = useTimer(initialSeconds, onTimeUp);

  return (
    <View style={[styles.container, isCritical && styles.criticalContainer, style]}>
      <Text style={[styles.text, isCritical && styles.criticalText, textStyle]}>
        {isCritical ? '⏱ ' : '⏱ '}
        {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    backgroundColor: colors.borderLight,
    alignSelf: 'flex-start',
  },
  criticalContainer: {
    backgroundColor: colors.waitingLight,
    borderColor: colors.waiting,
    borderWidth: 0.5,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  criticalText: {
    color: colors.waiting,
  },
});
