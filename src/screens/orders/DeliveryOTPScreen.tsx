import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { mockOrders } from '../../mocks/mockOrders';

type Props = NativeStackScreenProps<MainStackParamList, 'DeliveryOTP'>;

export const DeliveryOTPScreen: React.FC<Props> = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (otp.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter the 4-digit delivery confirmation code.');
      return;
    }
    
    setLoading(true);
    // Simulate API call to register delivery handoff
    setTimeout(() => {
      setLoading(false);
      
      // Update order status locally in mock database
      const orderIdx = mockOrders.findIndex((o) => o.id === orderId);
      if (orderIdx !== -1) {
        mockOrders[orderIdx].status = 'DELIVERED';
        mockOrders[orderIdx].purchaseDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      }

      Alert.alert(
        'Delivery Confirmed! 🚚🎉',
        'Verification successful! The dealer commitment deposit has been resolved. Enjoy your new car!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset navigation stack back to HomeScreen
              navigation.navigate('MainTabs', { screen: 'HomeTab' } as any);
            },
          },
        ]
      );
    }, 1200);
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Verify Delivery" />
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>Confirm Car Delivery</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit security code provided by the dealer agent at the time of handing over the keys.
          </Text>

          <Input
            label="4-Digit Handover Code"
            placeholder="XXXX"
            keyboardType="number-pad"
            maxLength={4}
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
          />
        </View>

        <Button
          title="Verify & Complete Order"
          onPress={handleVerify}
          loading={loading}
          style={styles.verifyBtn}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.cardBg,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 8,
  },
  verifyBtn: {
    height: 48,
    marginBottom: 16,
  },
});
