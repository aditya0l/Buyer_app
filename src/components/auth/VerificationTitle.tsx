import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';

interface VerificationTitleProps {
  style?: ViewStyle;
}

export const VerificationTitle: React.FC<VerificationTitleProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>
        <Text style={styles.dark}>Verify Your </Text>
        <Text style={styles.blue}>Number</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: 'Outfit',
    fontWeight: '800',
    fontSize: 26,
    lineHeight: 34,
  },
  dark: {
    color: '#00162E',
  },
  blue: {
    color: '#2563EB',
  },
});
