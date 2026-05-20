import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { TimerCountdown } from '../../components/common/TimerCountdown';
import { Divider } from '../../components/common/Divider';
import { PriceText } from '../../components/common/PriceText';
import { mockOrders } from '../../mocks/mockOrders';

type Props = NativeStackScreenProps<MainStackParamList, 'PriceLock'>;

export const PriceLockScreen: React.FC<Props> = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [lockTimer, setLockTimer] = useState(7200); // 2 hours default countdown lock window

  const order = mockOrders.find((o) => o.id === orderId);

  useEffect(() => {
    const timer = setInterval(() => {
      setLockTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConfirmLock = () => {
    Alert.alert(
      'Price Locked 🔒',
      'The quoted price has been locked into contract. We will proceed to chassis allocation / VIN assignment steps.',
      [
        {
          text: 'Go to Order Dashboard',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (!order) {
    return (
      <ScreenWrapper>
        <Header title="Error" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Order not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Price Lock Status" />
      <View style={styles.container}>
        <View style={styles.body}>
          <Card style={styles.timerCard}>
            <Text style={styles.timerLabel}>PRICE LOCK EXPIRES IN</Text>
            <TimerCountdown initialSeconds={lockTimer} textStyle={styles.timerVal} />
            <Text style={styles.timerSub}>
              Confirm booking payment before the lock expires to secure this on-road pricing.
            </Text>
          </Card>

          <Card style={styles.infoCard}>
            <Text style={styles.infoTitle}>Car Details</Text>
            <Text style={styles.carName}>{order.carName}</Text>
            <Text style={styles.variantName}>{order.variantName}</Text>
            
            <Divider />

            <View style={styles.row}>
              <Text style={styles.label}>Dealer Winner</Text>
              <Text style={styles.val}>{order.dealerName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Chassis Availability</Text>
              <Text style={[styles.val, styles.accentText]}>In-Stock (Ready for dispatch)</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Price Guaranteed</Text>
              <PriceText value={order.onRoadPrice} style={styles.priceVal} />
            </View>
          </Card>
        </View>

        <Button
          title="Confirm Lock & Proceed"
          onPress={handleConfirmLock}
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
  timerCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 20,
    borderColor: colors.waiting,
    borderWidth: 1,
  },
  timerLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  timerVal: {
    fontSize: 32,
    fontWeight: '850',
    color: colors.waiting,
    marginVertical: 12,
  },
  timerSub: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 8,
    lineHeight: 16,
  },
  infoCard: {
    padding: 16,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  val: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  accentText: {
    color: colors.live,
  },
  priceVal: {
    fontSize: 14,
    fontWeight: '750',
    color: colors.textPrimary,
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
