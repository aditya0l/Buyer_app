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
import { Divider } from '../../components/common/Divider';
import { PriceText } from '../../components/common/PriceText';
import { useBidRoomStore } from '../../store/bidRoomStore';
import { mockOrders } from '../../mocks/mockOrders';

type Props = NativeStackScreenProps<MainStackParamList, 'SelectWinner'>;

export const SelectWinnerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId, quoteId } = route.params;
  const { rooms } = useBidRoomStore();
  const [loading, setLoading] = useState(false);

  const room = rooms.find((r) => r.id === roomId);
  const quote = room?.quotes.find((q) => q.id === quoteId);

  const handleConfirm = () => {
    if (!room || !quote) return;
    
    setLoading(true);
    // Simulate API request to bind winner contract
    setTimeout(() => {
      setLoading(false);
      
      // Close the bid room
      useBidRoomStore.getState().updateRoomStatus(roomId, 'CLOSED');
      
      // Dynamically add a new active order matching this winning bid!
      const newOrderId = `ord-${room.vehicleId}-${Math.floor(Math.random() * 900) + 100}`;
      const newOrder = {
        id: newOrderId,
        carName: room.carName,
        variantName: room.variantName,
        image: room.image,
        dealerName: quote.dealerName,
        dealerCity: quote.dealerCity,
        purchaseDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        onRoadPrice: quote.onRoadTotal,
        exShowroomPrice: quote.basePrice,
        savings: room.budget - quote.onRoadTotal,
        status: 'IN_PROGRESS' as const,
        vinStatusTag: 'In-Stock' as const,
        perks: quote.perks,
        milestones: [
          { id: 'm1', title: 'Order Confirmed', description: 'Accepted by dealer. Booking generated.', status: 'COMPLETED' as const, date: 'Today' },
          { id: 'm2', title: 'VIN Assigned', description: 'Chassis allocation pending.', status: 'ACTIVE' as const },
          { id: 'm3', title: 'PDI Scheduled', description: 'Inspection scheduled after VIN assignment.', status: 'PENDING' as const },
        ],
      };
      
      mockOrders.unshift(newOrder);

      Alert.alert(
        'Winner Selected! 🎉',
        `Congratulations! You have locked in the quote from ${quote.dealerName}. Let's view the order status dashboard.`,
        [
          {
            text: 'View Order Dashboard',
            onPress: () => navigation.replace('OrderDetail', { orderId: newOrderId }),
          },
        ]
      );
    }, 1500);
  };

  if (!room || !quote) {
    return (
      <ScreenWrapper>
        <Header title="Error" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Invalid quote details</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Confirm Winner" />
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.confirmTitle}>You are selecting:</Text>
          <Text style={styles.dealerName}>{quote.dealerName}</Text>
          <Text style={styles.dealerCity}>{quote.dealerCity} Showroom</Text>

          <Card style={styles.summaryCard}>
            <Text style={styles.cardHeader}>ON-ROAD PRICE SUMMARY</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Ex-Showroom Base</Text>
              <PriceText value={quote.basePrice} style={styles.value} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>RTO Charges</Text>
              <PriceText value={quote.rto} style={styles.value} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Insurance</Text>
              <PriceText value={quote.insurance} style={styles.value} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>TCS (1%)</Text>
              <PriceText value={quote.tcs} style={styles.value} />
            </View>
            <Divider />
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalLabel}>Final Price (On-Road)</Text>
              <PriceText value={quote.onRoadTotal} style={styles.totalValue} />
            </View>
          </Card>

          {quote.perks.length > 0 && (
            <Card style={styles.perksCard}>
              <Text style={styles.cardHeader}>CONTRACTED PERKS</Text>
              {quote.perks.map((perk, index) => (
                <Text key={index} style={styles.perkText}>✓ {perk}</Text>
              ))}
            </Card>
          )}
        </View>

        <Button
          title="Confirm Selection & Generate Booking"
          onPress={handleConfirm}
          loading={loading}
          style={styles.confirmBtn}
        />
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
  confirmTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  dealerName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 4,
  },
  dealerCity: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 20,
  },
  summaryCard: {
    marginBottom: 16,
  },
  cardHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  perksCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.borderLight,
  },
  perkText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 6,
  },
  confirmBtn: {
    height: 48,
    marginBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 15,
    color: colors.error,
    fontWeight: '600',
  },
});
