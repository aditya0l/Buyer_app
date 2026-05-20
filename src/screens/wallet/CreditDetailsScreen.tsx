import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { PriceText } from '../../components/common/PriceText';
import { mockWallet } from '../../mocks/mockWallet';

type Props = NativeStackScreenProps<MainStackParamList, 'CreditDetails'>;

const CREDIT_PACKS = [
  { id: 'p1', credits: 1, price: 499, title: 'Single Credit Starter', saveText: '' },
  { id: 'p2', credits: 3, price: 1299, title: 'Value Pack (Compare 3)', saveText: 'Save 13%' },
  { id: 'p3', credits: 5, price: 1999, title: 'Power Search Unlimited', saveText: 'Save 20%' },
];

export const CreditDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPackId, setSelectedPackId] = useState('p2');
  const [loading, setLoading] = useState(false);

  const selectedPack = CREDIT_PACKS.find((p) => p.id === selectedPackId);

  const handlePurchase = () => {
    if (!selectedPack) return;
    
    setLoading(true);
    // Simulate payment transaction
    setTimeout(() => {
      setLoading(false);
      
      // Update persistent store locally in mock database
      mockWallet.dealCredits += selectedPack.credits;
      mockWallet.ledger.unshift({
        id: `txn-${Math.floor(Math.random() * 9000) + 1000}`,
        type: 'Credit Purchase',
        amount: -selectedPack.price,
        description: `Purchased ${selectedPack.credits} Deal Credit(s)`,
        date: 'Today',
      });

      Alert.alert(
        'Purchase Successful! 🎉',
        `Added ${selectedPack.credits} deal credits to your wallet. You can now open live bid rooms!`,
        [
          {
            text: 'View Wallet',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 1500);
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Buy Deal Credits" />
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>Unlock Live Bidding</Text>
          <Text style={styles.subtitle}>
            Each active bid room consumes 1 Deal Credit. Bids are verified and price-locked.
          </Text>

          {CREDIT_PACKS.map((pack) => {
            const isSelected = pack.id === selectedPackId;
            return (
              <TouchableOpacity
                key={pack.id}
                activeOpacity={0.8}
                onPress={() => setSelectedPackId(pack.id)}
                style={[styles.packRow, isSelected && styles.selectedPackRow]}
              >
                <View style={styles.packLeft}>
                  <View style={[styles.radioButton, isSelected && styles.radioSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <View style={styles.packTextWrapper}>
                    <View style={styles.packTitleRow}>
                      <Text style={styles.packTitle}>{pack.title}</Text>
                      {pack.saveText !== '' && (
                        <View style={styles.saveBadge}>
                          <Text style={styles.saveText}>{pack.saveText}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.packSub}>{pack.credits} Deal Credit(s)</Text>
                  </View>
                </View>
                <PriceText value={pack.price} style={styles.packPrice} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Button
            title={`Pay ${selectedPack ? selectedPack.price : ''}`}
            onPress={handlePurchase}
            loading={loading}
            style={styles.payBtn}
          />
          <Text style={styles.guaranteeText}>🔒 100% money-back guarantee if no bids arrive</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.appBg,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 24,
    lineHeight: 18,
  },
  packRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 12,
  },
  selectedPackRow: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  packLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  packTextWrapper: {
    flex: 1,
  },
  packTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  saveBadge: {
    backgroundColor: colors.live,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  saveText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '800',
  },
  packSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  packPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  footer: {
    marginBottom: 24,
  },
  payBtn: {
    height: 48,
  },
  guaranteeText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },
});
