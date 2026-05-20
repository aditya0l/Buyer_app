import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { Card } from '../common/Card';
import { Tag } from '../common/Tag';
import { PriceText } from '../common/PriceText';
import { Divider } from '../common/Divider';

interface Quote {
  id: string;
  dealerName: string;
  dealerCity: string;
  rating: number;
  basePrice: number;
  rto: number;
  insurance: number;
  tcs: number;
  onRoadTotal: number;
  deliveryTimeDays: number;
  perks: string[];
  reasonTags: ('Best Price' | 'Fastest' | 'Best Perks')[];
  isPinned?: boolean;
}

interface QuoteCardProps {
  quote: Quote;
  isBest?: boolean;
  onPinPress: () => void;
  onRequestUpdatePress: () => void;
  onSelectPress: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  isBest = false,
  onPinPress,
  onRequestUpdatePress,
  onSelectPress,
}) => {
  return (
    <Card style={[styles.card, isBest && styles.bestCard, quote.isPinned && styles.pinnedCard]}>
      {/* Dealer & Info Header */}
      <View style={styles.headerRow}>
        <View>
          <View style={styles.dealerNameRow}>
            <Text style={styles.dealerName}>{quote.dealerName}</Text>
            {quote.isPinned && <Text style={styles.pinnedIcon}>⭐</Text>}
          </View>
          <Text style={styles.dealerCity}>
            {quote.dealerCity} • {quote.rating} ★
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSelectPress}
          style={styles.selectBtn}
        >
          <Text style={styles.selectBtnText}>Select</Text>
        </TouchableOpacity>
      </View>

      {/* Reason Tags Row */}
      {quote.reasonTags.length > 0 && (
        <View style={styles.tagsRow}>
          {quote.reasonTags.map((tag, idx) => (
            <Tag key={idx} type={tag} />
          ))}
        </View>
      )}

      <Divider style={styles.divider} />

      {/* Price Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Ex-Showroom Base Price</Text>
          <PriceText value={quote.basePrice} style={styles.tableValue} />
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>RTO / Registration</Text>
          <PriceText value={quote.rto} style={styles.tableValue} />
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Insurance</Text>
          <PriceText value={quote.insurance} style={styles.tableValue} />
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>TCS (1%)</Text>
          <PriceText value={quote.tcs} style={styles.tableValue} />
        </View>
        <View style={[styles.tableRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>On-Road Total</Text>
          <PriceText value={quote.onRoadTotal} style={styles.totalValue} />
        </View>
      </View>

      <Divider style={styles.divider} />

      {/* Delivery & Perks Section */}
      <View style={styles.metaSection}>
        <Text style={styles.metaTitle}>Delivery Speed: <Text style={styles.metaValue}>{quote.deliveryTimeDays} Days</Text></Text>
        
        {quote.perks.length > 0 && (
          <View style={styles.perksContainer}>
            <Text style={styles.perksTitle}>Included Perks:</Text>
            {quote.perks.map((perk, idx) => (
              <Text key={idx} style={styles.perkText}>• {perk}</Text>
            ))}
          </View>
        )}
      </View>

      {/* Action Row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPinPress}
          style={styles.actionBtn}
        >
          <Text style={styles.actionBtnText}>
            {quote.isPinned ? 'Unpin Quote ☆' : 'Pin Quote ⭐'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onRequestUpdatePress}
          style={styles.actionBtn}
        >
          <Text style={styles.actionBtnText}>Request Update ↺</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  bestCard: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  pinnedCard: {
    backgroundColor: '#FAFAFA',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dealerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  pinnedIcon: {
    marginLeft: 6,
    fontSize: 14,
  },
  dealerCity: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  selectBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  selectBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  divider: {
    marginVertical: 10,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  tableLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  tableValue: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderLight,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  metaSection: {
    marginBottom: 12,
  },
  metaTitle: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  metaValue: {
    fontWeight: '700',
    color: colors.primary,
  },
  perksContainer: {
    marginTop: 6,
  },
  perksTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  perkText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 10,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionBtnText: {
    fontSize: 13,
    color: colors.textBlue,
    fontWeight: '600',
  },
});
