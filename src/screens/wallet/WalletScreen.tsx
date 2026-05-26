import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/common/Card';
import { WalletLedgerRow } from '../../components/cards/WalletLedgerRow';
import { PriceText } from '../../components/common/PriceText';
import { mockWallet } from '../../mocks/mockWallet';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const WalletScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const walletData = mockWallet;

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="My Wallet" />

      <FlatList
        data={walletData.ledger}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <>
            {/* Balance Card */}
            <Card style={styles.balanceCard}>
              <View style={styles.balanceHeader}>
                <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
                <Text style={styles.creditsLabel}>DEAL CREDITS</Text>
              </View>
              <View style={styles.balanceHeader}>
                <PriceText value={walletData.totalBalance} style={styles.balanceValue} />
                <View style={styles.creditsBadge}>
                  <Text style={styles.creditsText}>{walletData.dealCredits} Left</Text>
                </View>
              </View>
              
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('BuyCredits')}
                style={styles.buyCreditsBtn}
              >
                <Text style={styles.buyCreditsText}>+ Buy Deal Credits</Text>
              </TouchableOpacity>
            </Card>

            {/* Promos / Vouchers Carousel */}
            {walletData.promos.length > 0 && (
              <View style={styles.promoSection}>
                <Text style={styles.sectionTitle}>Available Promo Vouchers</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={walletData.promos}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Card style={styles.promoCard}>
                      <View style={styles.promoHeader}>
                        <Text style={styles.promoCode}>{item.code}</Text>
                        <Text style={styles.promoType}>{item.type}</Text>
                      </View>
                      <Text style={styles.promoTitle}>{item.title}</Text>
                      <Text style={styles.promoExpiry}>Expires {item.expiryDate}</Text>
                    </Card>
                  )}
                />
              </View>
            )}

            <Text style={styles.sectionTitle}>Transaction History</Text>
          </>
        }
        renderItem={({ item }) => <WalletLedgerRow entry={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>💵</Text>
            <Text style={styles.emptyTitle}>No Transactions</Text>
            <Text style={styles.emptySub}>No historical ledger rows exist on this account.</Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    padding: 20,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 1,
  },
  creditsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 1,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.white,
    marginTop: 6,
  },
  creditsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginTop: 6,
  },
  creditsText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  buyCreditsBtn: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buyCreditsText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  promoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  promoCard: {
    width: 200,
    marginRight: 12,
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    padding: 12,
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  promoCode: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  promoType: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  promoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 18,
  },
  promoExpiry: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 20,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
