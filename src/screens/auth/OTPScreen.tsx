import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { Button } from '../../components/common/Button';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { AuthBanner } from '../../components/auth/AuthBanner';
import { PadlockIcon } from '../../components/auth/PadlockIcon';
import { WelcomeTitle } from '../../components/auth/WelcomeTitle';
import { VerificationTitle } from '../../components/auth/VerificationTitle';
import Svg, { Path } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

export const OTPScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [whatsAppUpdates, setWhatsAppUpdates] = useState(true);
  const [timer, setTimer] = useState(53);

  const otpInputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let interval: any;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

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
      setTimer(53);
      setOtpCode('');
      // Auto-focus the hidden OTP input field
      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 150);
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otpCode.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP code.');
      return;
    }
    setLoading(true);
    // Simulate verification and proceed to onboarding
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OnboardingCity');
    }, 1000);
  };

  const handleResendOTP = () => {
    setTimer(53);
    setOtpCode('');
    Alert.alert('OTP Resent', 'A new 6-digit verification code has been sent to your number.');
    setTimeout(() => {
      otpInputRef.current?.focus();
    }, 150);
  };

  const maskPhoneNumber = (num: string) => {
    if (num.length < 10) return num;
    return `+91 ${num.substring(0, 2)}XXXXXX${num.substring(8)}`;
  };

  const renderOTPBoxes = () => {
    const boxes = [];
    const otpArray = otpCode.split('');

    for (let i = 0; i < 6; i++) {
      const isFocusedBox = i === otpCode.length && isFocused;
      const isFilled = i < otpCode.length;

      boxes.push(
        <TouchableOpacity
          key={i}
          activeOpacity={0.9}
          onPress={() => otpInputRef.current?.focus()}
          style={[
            styles.otpBox,
            isFocusedBox && styles.otpBoxActive,
            isFilled && styles.otpBoxFilled,
          ]}
        >
          <Text style={styles.otpBoxText}>
            {isFilled ? otpArray[i] : ''}
          </Text>
        </TouchableOpacity>
      );
    }
    return boxes;
  };

  return (
    <ScreenWrapper style={styles.wrapper} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >


        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="never"
        >
          {step === 'PHONE' ? (
            <>
              <AuthBanner />
              <View style={[styles.contentContainer, { paddingTop: 82 }]}>
                <WelcomeTitle style={{ marginBottom: 6 }} />
                <Text style={styles.subtitleText}>
                  Enter your mobile number to continue and access the best car deals near you.
                </Text>

                <Text style={styles.inputLabel}>Mobile Number</Text>

                <View style={[styles.phoneInputContainer, isFocused && styles.phoneInputContainerFocused]}>
                  <TouchableOpacity
                    style={styles.flagButton}
                    activeOpacity={0.7}
                    onPress={() => Alert.alert('Country Code', 'Only Indian mobile numbers (+91) are currently supported.')}
                  >
                    <Text style={styles.flagText}>🇮🇳</Text>
                    <Svg width={10} height={6} viewBox="0 0 10 6" fill="none" style={styles.caretIcon}>
                      <Path
                        d="M1 1L5 5L9 1"
                        stroke="#64748B"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>

                  <View style={styles.dividerLine} />

                  <Text style={styles.countryCodePrefix}>+91</Text>

                  <TextInput
                    style={styles.phoneNumberInput}
                    placeholder="000 000 0000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoFocus={true}
                  />
                </View>

                <TouchableOpacity
                  style={styles.whatsAppRow}
                  activeOpacity={0.8}
                  onPress={() => setWhatsAppUpdates(!whatsAppUpdates)}
                >
                  <View style={[styles.checkbox, whatsAppUpdates && styles.checkboxChecked]}>
                    {whatsAppUpdates && (
                      <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M20 6L9 17L4 12"
                          stroke="#FFFFFF"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    )}
                  </View>
                  <Text style={styles.whatsAppText}>
                    Get Updates On <Text style={styles.whatsAppBold}>WhatsApp</Text>
                  </Text>
                </TouchableOpacity>

                <Button
                  title="Get OTP"
                  onPress={handleSendOTP}
                  loading={loading}
                  style={styles.primaryButton}
                />

                <View style={styles.footerContainer}>
                  <Text style={styles.footerText}>
                    By continuing, you agree to our{'\n'}
                    <Text
                      style={styles.footerLink}
                      onPress={() => Alert.alert('Terms of Service', 'Terms of Service details...')}
                    >
                      Terms of Service
                    </Text>
                    {' & '}
                    <Text
                      style={styles.footerLink}
                      onPress={() => Alert.alert('Privacy Policy', 'Privacy Policy details...')}
                    >
                      Privacy Policy
                    </Text>
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View style={[styles.contentContainer, { paddingTop: 123.1 }]}>
              <PadlockIcon />

              <VerificationTitle style={{ alignSelf: 'flex-start', marginTop: 50, marginBottom: 0 }} />
              <Text style={[styles.subtitleText, { textAlign: 'left', marginTop: 8, marginBottom: 24 }]}>
                Please enter the 6-digit OTP that has been sent to your registered mobile number {maskPhoneNumber(phoneNumber)}
              </Text>

              <View style={styles.otpGrid}>
                {renderOTPBoxes()}
              </View>

              <TextInput
                ref={otpInputRef}
                style={styles.hiddenInput}
                value={otpCode}
                onChangeText={(text) => {
                  const cleanText = text.replace(/[^0-9]/g, '');
                  setOtpCode(cleanText);
                }}
                keyboardType="number-pad"
                maxLength={6}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              <View style={[styles.timerContainer, { alignItems: 'flex-start', marginTop: 16, marginBottom: 32 }]}>
                {timer > 0 ? (
                  <Text style={styles.timerText}>
                    OTP Sent. Retry in <Text style={[styles.timerCountdown, { color: '#16A34A' }]}>{timer} Seconds</Text>
                  </Text>
                ) : (
                  <Text style={styles.timerText}>
                    Didn't receive the OTP?{' '}
                    <Text style={styles.resendLink} onPress={handleResendOTP}>
                      Resend OTP
                    </Text>
                  </Text>
                )}
              </View>

              <Button
                title="Verify & Continue"
                onPress={handleVerifyOTP}
                loading={loading}
                style={styles.primaryButton}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setStep('PHONE')}
                style={styles.changePhoneButton}
              >
                <Text style={styles.changePhoneText}>Change Phone Number</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  backArrowButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  brandHighlight: {
    color: '#2563EB',
  },
  subtitleText: {
    fontFamily: 'Outfit',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  phoneInputContainerFocused: {
    borderColor: '#2563EB',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  flagButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagText: {
    fontSize: 20,
  },
  countryCodePrefix: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginRight: 8,
  },
  dividerLine: {
    width: 1.5,
    height: 20,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 12,
  },
  caretIcon: {
    marginLeft: 6,
  },
  phoneNumberInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    padding: 0,
  },
  whatsAppRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    borderColor: '#2563EB',
    backgroundColor: '#2563EB',
  },
  whatsAppText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#64748B',
  },
  whatsAppBold: {
    fontFamily: 'Inter',
    color: '#2563EB',
    fontWeight: '700',
  },
  primaryButton: {
    height: 54,
    borderRadius: 999,
  },
  footerContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
  footerLink: {
    color: '#2563EB',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 4,
    width: '100%',
  },
  otpBox: {
    width: (screenWidth - 48 - 40) / 6,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  otpBoxActive: {
    borderColor: '#2563EB',
    backgroundColor: '#FFFFFF',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  otpBoxFilled: {
    borderColor: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  otpBoxText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  otpDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  timerText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#64748B',
    fontWeight: '400',
  },
  timerCountdown: {
    fontFamily: 'Inter',
    color: '#2563EB',
    fontWeight: '700',
  },
  resendLink: {
    fontFamily: 'Inter',
    color: '#2563EB',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  changePhoneButton: {
    marginTop: 24,
    alignSelf: 'center',
    padding: 8,
  },
  changePhoneText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
});
export default OTPScreen;
