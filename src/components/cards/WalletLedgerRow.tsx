import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { formatPrice } from '../../utils/formatPrice';

interface LedgerEntry {
  id: string;
  type: 'Commitment' | 'Refund' | 'Credit Purchase' | 'Penalty' | 'Promo';
  amount: number;
  description: string;
  date: string;
  linkedItem?: string;
}

interface WalletLedgerRowProps {
  entry: LedgerEntry;
}

export const WalletLedgerRow: React.FC<WalletLedgerRowProps> = ({ entry }) => {
  const isCredit = entry.amount > 0;
  
  const getTypeBadgeColor = () => {
    switch (entry.type) {
      case 'Promo':
        return { bg: colors.primaryLight, text: colors.primary };
      case 'Refund':
        return { bg: colors.liveLight, text: colors.live };
      case 'Commitment':
        return { bg: '#F1F5F9', text: '#475569' };
      case 'Credit Purchase':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'Penalty':
        return { bg: colors.errorLight, text: colors.error };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const badgeColors = getTypeBadgeColor();

  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        <View style={[styles.badge, { backgroundColor: badgeColors.bg }]}>
          <Text style={[styles.badgeText, { color: badgeColors.text }]}>
            {entry.type}
          </Text>
        </View>
        <Text style={styles.description}>{entry.description}</Text>
        <Text style={styles.date}>{entry.date}</Text>
      </View>
      <View style={styles.rightCol}>
        <Text style={[styles.amount, isCredit ? styles.creditText : styles.debitText]}>
          {isCredit ? '+' : ''}
          {formatPrice(entry.amount)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  leftCol: {
    flex: 1,
    marginRight: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
    lineHeight: 18,
  },
  date: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
  },
  creditText: {
    color: colors.live,
  },
  debitText: {
    color: colors.textPrimary,
  },
});
