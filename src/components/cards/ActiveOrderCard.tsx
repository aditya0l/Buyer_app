import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { PriceText } from '../common/PriceText';

interface ActiveOrderCardProps {
  order: {
    id: string;
    carName: string;
    variantName: string;
    image: string;
    dealerName: string;
    dealerCity: string;
    purchaseDate: string;
    onRoadPrice: number;
    exShowroomPrice: number;
    savings: number;
    perks: string[];
  };
  onPress: () => void;
}

export const ActiveOrderCard: React.FC<ActiveOrderCardProps> = ({ order, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Card style={styles.card}>
        {/* Top Header Row */}
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Image source={{ uri: order.image }} style={styles.carImage} resizeMode="cover" />
            <View style={styles.titleWrapper}>
              <Text style={styles.carName} numberOfLines={1}>
                {order.carName}
              </Text>
              <Text style={styles.variantName} numberOfLines={1}>
                {order.variantName}
              </Text>
              <Text style={styles.dealerText}>
                {order.dealerName} • {order.dealerCity}
              </Text>
            </View>
          </View>
          <View style={styles.rightHeader}>
            <Badge type="DONE" />
            <Text style={styles.dateText}>{order.purchaseDate}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Paid On-Road</Text>
            <PriceText value={order.onRoadPrice} style={styles.statValue} />
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Ex-Showroom</Text>
            <PriceText value={order.exShowroomPrice} style={styles.statValue} />
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Saved via Bounty</Text>
            <PriceText value={order.savings} style={[styles.statValue, styles.savingsText]} />
          </View>
        </View>

        {/* Perks Strip */}
        {order.perks.length > 0 && (
          <View style={styles.perksStrip}>
            <Text style={styles.giftIcon}>🎁</Text>
            <Text style={styles.perksText} numberOfLines={1}>
              {order.perks.join(' • ')}
            </Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  leftHeader: {
    flexDirection: 'row',
    flex: 1,
  },
  carImage: {
    width: 60,
    height: 60,
    borderRadius: radius.md,
    backgroundColor: colors.borderLight,
  },
  titleWrapper: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  carName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  variantName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  dealerText: {
    fontSize: 12,
    color: colors.textBlue,
    fontWeight: '600',
    marginTop: 2,
  },
  rightHeader: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
    paddingVertical: 10,
    marginBottom: 12,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  savingsText: {
    color: colors.live,
  },
  perksStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.md,
  },
  giftIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  perksText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    flex: 1,
  },
});
