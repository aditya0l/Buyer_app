import React from 'react';
import { StyleSheet, Text, View, Image, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';

interface AvatarProps {
  name: string;
  sourceUrl?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  sourceUrl,
  size = 40,
  style,
}) => {
  const getInitials = (fullName: string) => {
    const parts = fullName.split(' ');
    const first = parts[0]?.charAt(0) || '';
    const last = parts[1]?.charAt(0) || '';
    return (first + last).toUpperCase();
  };

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const initialsStyle = {
    fontSize: size * 0.4,
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      {sourceUrl ? (
        <Image
          source={{ uri: sourceUrl }}
          style={[styles.image, containerStyle]}
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.initials, initialsStyle]}>{getInitials(name)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontWeight: '700',
    color: colors.primary,
  },
});
