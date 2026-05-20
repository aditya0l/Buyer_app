import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { formatPrice } from '../../utils/formatPrice';

interface PriceTextProps {
  value: number;
  short?: boolean;
  style?: StyleProp<TextStyle>;
}

export const PriceText: React.FC<PriceTextProps> = ({ value, short = false, style }) => {
  return <Text style={style}>{formatPrice(value, short)}</Text>;
};
