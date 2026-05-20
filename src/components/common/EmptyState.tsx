import React from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../constants/colors';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  illustration?: string; // Emoji or shorthand string representation
  ctaText?: string;
  onCtaPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  illustration = '🔍',
  ctaText,
  onCtaPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.illustration}>{illustration}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {ctaText && onCtaPress && (
        <Button
          style={styles.button}
          title={ctaText}
          onPress={onCtaPress}
          variant="primary"
          size="md"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    fontSize: 64,
    marginBottom: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    minWidth: 160,
  },
});
