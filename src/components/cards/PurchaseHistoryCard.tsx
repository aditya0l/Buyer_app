import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { Card } from '../common/Card';
import { SavingsChip } from '../common/SavingsChip';

interface PurchaseHistoryCardProps {
  order: {
    id: string;
    carName: string;
    variantName: string;
    image: string;
    dealerName: string;
    purchaseDate: string;
    savings: number;
    onRoadPrice: number;
  };
  onPress: () => void;
}

export const PurchaseHistoryCard: React.FC<PurchaseHistoryCardProps> = ({ order, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Card style={styles.card}>
        <Image source={{ uri: order.image }} style={styles.carImage} resizeMode="cover" />
        <View style={styles.content}>
          <Text style={styles.date}>{order.purchaseDate}</Text>
          <Text style={styles.carName} numberOfLines={1}>
            {order.carName}
          </Text>
          <Text style={styles.variantName} numberOfLines={1}>
            {order.variantName}
          </Text>
          <Text style={styles.dealerName} numberOfLines={1}>
            via {order.dealerName}
          </Text>
          <View style={styles.bottomRow}>
            <SavingsChip amount={order.savings} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    marginRight: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  carImage: {
    width: '100%',
    height: 110,
    borderRadius: radius.md,
    backgroundColor: colors.borderLight,
  },
  content: {
    marginTop: 8,
  },
  date: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  carName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  variantName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  dealerName: {
    fontSize: 12,
    color: colors.textBlue,
    fontWeight: '500',
    marginTop: 2,
  },
  bottomRow: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
});
