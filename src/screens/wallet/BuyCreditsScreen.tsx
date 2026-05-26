import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { mockWallet } from '../../mocks/mockWallet';
import { WalletLedgerRow } from '../../components/cards/WalletLedgerRow';
import { formatPrice } from '../../utils/formatPrice';

type Props = NativeStackScreenProps<MainStackParamList, 'BuyCredits'>;

const CREDIT_PACKAGES = [
  { id: 'pkg-1', credits: 1, price: 99, popular: false },
  { id: 'pkg-2', credits: 3, price: 249, popular: true },
  { id: 'pkg-5', credits: 5, price: 399, popular: false },
];

export const BuyCreditsScreen: React.FC<Props> = ({ navigation }) => {
  const { dealCredits } = mockWallet;

  const handlePurchase = (pkg: typeof CREDIT_PACKAGES[0]) => {
    Alert.alert(
      'Purchase Deal Credits',
      `Buy ${pkg.credits} deal credit${pkg.credits > 1 ? 's' : ''} for ₹${pkg.price}?\n\nThis will open the payment gateway.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Proceed to Pay',
          onPress: () =>
            Alert.alert('Payment', 'Payment gateway integration coming soon!'),
        },
      ]
    );
  };

  return (
    <ScreenWrapper>
      <Header title="Buy Deal Credits" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Current balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Deal Credits</Text>
          <Text style={styles.balanceValue}>{dealCredits}</Text>
          <Text style={styles.balanceSub}>
            Each credit lets you open one bid room and receive dealer quotes.
          </Text>
        </View>

        {/* Packages */}
        <Text style={styles.sectionTitle}>Choose a Package</Text>
        {CREDIT_PACKAGES.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            style={[styles.packageCard, pkg.popular && styles.packageCardPopular]}
            activeOpacity={0.8}
            onPress={() => handlePurchase(pkg)}
          >
            {pkg.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>Most Popular</Text>
              </View>
            )}
            <View style={styles.packageLeft}>
              <Text style={styles.creditCount}>
                {pkg.credits} Deal Credit{pkg.credits > 1 ? 's' : ''}
              </Text>
              <Text style={styles.creditSub}>
                Open {pkg.credits} bid room{pkg.credits > 1 ? 's' : ''}
              </Text>
            </View>
            <View style={styles.packageRight}>
              <Text style={styles.packagePrice}>₹{pkg.price}</Text>
              <View style={styles.buyBtn}>
                <Text style={styles.buyBtnText}>Buy</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.noteCard}>
          <Text style={styles.noteIcon}>ℹ️</Text>
          <Text style={styles.noteText}>
            Deal credits are non-refundable once a bid room is successfully opened with dealer
            responses. Unused credits are refunded if minimum dealers aren't reached.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.white,
    lineHeight: 56,
  },
  balanceSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  packageCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  packageCardPopular: {
    borderColor: colors.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    right: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  popularBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  packageLeft: {},
  creditCount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  creditSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  packageRight: {
    alignItems: 'flex-end',
  },
  packagePrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  buyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: radius.md,
  },
  buyBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: 14,
    marginTop: 12,
    gap: 10,
  },
  noteIcon: {
    fontSize: 16,
  },
  noteText: {
    flex: 1,
    fontSize: 12,
    color: colors.primary,
    lineHeight: 17,
    fontWeight: '500',
  },
});
