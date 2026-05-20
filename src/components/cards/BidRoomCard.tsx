import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { TimerCountdown } from '../common/TimerCountdown';
import { formatPrice } from '../../utils/formatPrice';

interface BidRoomCardProps {
  room: {
    id: string;
    carName: string;
    variantName: string;
    fuel: string;
    transmission: string;
    color: string;
    budget: number;
    city: string;
    status: 'LIVE' | 'WAITING' | 'CLOSED';
    dealersCount: number;
    bestBid: number;
    savings: number;
    timeRemainingSeconds: number;
    progressBarWidth: number;
    image: string;
  };
  onPress: () => void;
}

export const BidRoomCard: React.FC<BidRoomCardProps> = ({ room, onPress }) => {
  const isLive = room.status === 'LIVE';

  return (
    <Card style={styles.card}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        {/* Top Status & Location Row */}
        <View style={styles.topRow}>
          <Badge type={room.status} />
          <View style={styles.locationContainer}>
            <Text style={styles.locationPin}>📍</Text>
            <Text style={styles.locationText}>{room.city}</Text>
          </View>
        </View>

        {/* Content Row: Image + Specs */}
        <View style={styles.contentRow}>
          <Image source={{ uri: room.image }} style={styles.carImage} resizeMode="cover" />
          
          <View style={styles.specsContainer}>
            <Text style={styles.carName} numberOfLines={1}>
              {room.carName}
            </Text>
            <Text style={styles.variantName} numberOfLines={1}>
              {room.variantName}
            </Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsText}>
                {room.fuel} • {room.transmission}
              </Text>
              <View style={[styles.colorDot, { backgroundColor: room.color.toLowerCase() === 'white' ? '#E5E7EB' : room.color.toLowerCase() }]} />
              <Text style={styles.detailsText}>{room.color}</Text>
            </View>
            <Text style={styles.budgetText}>
              Budget: {formatPrice(room.budget, true)}
            </Text>
          </View>
        </View>

        {/* Stats Row: Dealers | Best Bid | Savings */}
        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Dealers</Text>
            <Text style={styles.statValue}>{room.dealersCount}</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Best Bid</Text>
            <Text style={styles.statValue}>
              {room.bestBid > 0 ? formatPrice(room.bestBid, true) : '—'}
            </Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Savings</Text>
            <Text style={[styles.statValue, styles.savingsText]}>
              {room.savings > 0 ? formatPrice(room.savings, true) : '—'}
            </Text>
          </View>
        </View>

        {/* Progress Bar (Only show if LIVE) */}
        {isLive && (
          <ProgressBar progress={room.progressBarWidth} style={styles.progressBar} />
        )}

        {/* Bottom Timer & Action Row */}
        <View style={styles.bottomRow}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timerLabel}>
              {isLive ? 'Remaining' : 'Starts In'}
            </Text>
            <TimerCountdown initialSeconds={room.timeRemainingSeconds} />
          </View>

          <View style={styles.arrowButton}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPin: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  contentRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: radius.md,
    backgroundColor: colors.borderLight,
  },
  specsContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  carName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  variantName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailsText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  budgetText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.appBg,
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
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
  progressBar: {
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 12,
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: 8,
    fontWeight: '500',
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
  },
});
