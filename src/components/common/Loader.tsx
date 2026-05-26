import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { colors } from '../../constants/colors';

interface LoaderProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'large';
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = false,
  message,
  size = 'large',
}) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator size={size} color={colors.primary} />
        {message && <Text style={styles.messageText}>{message}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.inlineContainer}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={styles.inlineMessageText}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  inlineContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  inlineMessageText: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textSecondary,
  },
});
