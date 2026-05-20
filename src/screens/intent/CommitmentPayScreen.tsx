import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { PriceText } from '../../components/common/PriceText';
import { useBidRoomStore } from '../../store/bidRoomStore';
import { mockVehicles } from '../../mocks/mockVehicles';

type Props = NativeStackScreenProps<MainStackParamList, 'CommitmentPay'>;

export const CommitmentPayScreen: React.FC<Props> = ({ route, navigation }) => {
  const { intentId, variantId, price } = route.params;
  const [loading, setLoading] = useState(false);

  // Find car based on variantId prefix matching
  const vehicle = mockVehicles.find((v) => v.variants.some((varItem) => varItem.id === variantId));
  const variant = vehicle?.variants.find((v) => v.id === variantId);

  const commitmentFee = 499; // Standard listing fee / credit purchase fee

  const handlePayment = () => {
    setLoading(true);
    
    // Simulate successful payment gateway transaction
    setTimeout(() => {
      setLoading(false);

      // Dynamically add a new live bid room to our store for simulation!
      if (vehicle && variant) {
        const newRoom = {
          id: `room-${intentId}`,
          vehicleId: vehicle.id,
          variantId: variant.id,
          carName: `${vehicle.brand} ${vehicle.model}`,
          variantName: variant.name,
          fuel: variant.fuel,
          transmission: variant.transmission,
          color: 'Selected Color',
          budget: price + 40000,
          city: 'Delhi NCR',
          status: 'LIVE' as const,
          dealersCount: 0,
          bestBid: price,
          savings: 0,
          timeRemainingSeconds: 1800, // 30 minutes
          progressBarWidth: 0,
          image: vehicle.image,
          quotes: [],
        };
        
        // Add to our global store
        useBidRoomStore.getState().rooms.unshift(newRoom);
      }

      navigation.replace('IntentSuccess', { roomId: `room-${intentId}` });
    }, 1500);
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Commitment Deposit" />
      <View style={styles.container}>
        <Card style={styles.feeCard}>
          <Text style={styles.feeLabel}>LISTING FEE & COMMITMENT CREDIT</Text>
          <PriceText value={commitmentFee} style={styles.feeValue} />
          <Text style={styles.feeSub}>1 Deal Credit will be consumed to start this Room.</Text>
        </Card>

        <View style={styles.guaranteeSection}>
          <Text style={styles.sectionTitle}>CarBounty Refund Guarantee 🛡️</Text>
          
          <View style={styles.bulletRow}>
            <Text style={styles.bulletIcon}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>100% Refundable:</Text> If no dealers bid on your request or you choose not to select a winner, your credit is immediately returned.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletIcon}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>Verified Dealers:</Text> Only verified OEM brand showrooms in your city can see and bid on your requirement.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletIcon}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>Strict Price Lock:</Text> Winning quotes are strictly locked. No hidden charges or dealership increases allowed.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Pay & Launch Bid Room"
            onPress={handlePayment}
            loading={loading}
            style={styles.payBtn}
          />
          <Text style={styles.secureText}>🔒 Secure 256-bit encrypted gateway transactions</Text>
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
  feeCard: {
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: 16,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  feeLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  feeValue: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.primary,
    marginVertical: 12,
  },
  feeSub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  guaranteeSection: {
    flex: 1,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  bulletIcon: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.live,
    marginRight: 10,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  footer: {
    marginBottom: 24,
  },
  payBtn: {
    height: 48,
  },
  secureText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },
});
