import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';

interface WelcomeTitleProps {
  style?: ViewStyle;
}

export const WelcomeTitle: React.FC<WelcomeTitleProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>
        <Text style={styles.dark}>Welcome to </Text>
        <Text style={styles.blue}>CarBounty</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: 'Outfit-ExtraBold',
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
