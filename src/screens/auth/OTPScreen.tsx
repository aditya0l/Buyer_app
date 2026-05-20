import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

export const OTPScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otpCode.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter a 4-digit OTP code.');
      return;
    }
    setLoading(true);
    // Simulate verification and proceed to onboarding
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OnboardingCity');
    }, 1000);
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            {step === 'PHONE' ? 'Enter Mobile Number' : 'Enter OTP Code'}
          </Text>
          <Text style={styles.subtitle}>
            {step === 'PHONE'
              ? 'We will send a 4-digit verification code to your mobile phone.'
              : `Enter the code sent to +91 ${phoneNumber}`}
          </Text>

          {step === 'PHONE' ? (
            <Input
              label="Phone Number"
              placeholder="98765 43210"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              leftIcon={<Text style={styles.phonePrefix}>+91 </Text>}
            />
          ) : (
            <Input
              label="4-Digit Verification Code"
              placeholder="XXXX"
              keyboardType="number-pad"
              maxLength={4}
              value={otpCode}
              onChangeText={setOtpCode}
            />
          )}

          <Button
            title={step === 'PHONE' ? 'Send OTP' : 'Verify & Login'}
            onPress={step === 'PHONE' ? handleSendOTP : handleVerifyOTP}
            loading={loading}
            style={styles.button}
          />

          {step === 'OTP' && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setStep('PHONE')}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>Change Phone Number</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

// Add TouchableOpacity wrapper definition or import for compile-safety
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.cardBg,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 32,
    lineHeight: 22,
  },
  phonePrefix: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  button: {
    marginTop: 16,
    height: 48,
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
