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
import LockVerifyOtp from '../../assets/lockverifyotp.svg';
import { useAuthStore } from '../../store/authStore';
import { mockUser } from '../../mocks/mockUser';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

export const OTPScreen: React.FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const [timer, setTimer] = useState(53);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    // Auto focus first input on mount
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 400);
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-advance to next cell
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous cell on backspace if current cell is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP code.');
      return;
    }
    setLoading(true);
    // Bypass verification logic for now as requested
    setTimeout(() => {
      setLoading(false);
      // Automatically navigate to Home by updating auth state
      const login = useAuthStore.getState().login;
      login('mock-auth-token-123', mockUser);
    }, 500);
  };

  const handleChangePhone = () => {
    navigation.goBack();
  };

  const renderOTPBoxes = () => {
    return otp.map((digit, index) => (
      <TextInput
        key={index}
        ref={(ref) => {
          inputRefs.current[index] = ref;
        }}
        style={[
          styles.otpBox,
          styles.otpBoxText,
          focusedIndex === index && styles.otpBoxFocused,
        ]}
        keyboardType="number-pad"
        maxLength={1}
        value={digit}
        onChangeText={(text) => handleChange(text.replace(/[^0-9]/g, ''), index)}
        onKeyPress={(e) => handleKeyPress(e, index)}
        onFocus={() => setFocusedIndex(index)}
        onBlur={() => setFocusedIndex(null)}
        textAlign="center"
        caretHidden
      />
    ));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.headerIconContainer}>
            <LockVerifyOtp width={100} height={100} />
          </View>

          <Text style={styles.title}>
            Verify Your <Text style={styles.titleBlue}>Number</Text>
          </Text>

          <Text style={styles.subtitle}>
            Please enter the 6-digit OTP that has been sent to your registered mobile number <Text style={styles.phoneNumber}>+91 98XXXXXX21</Text>
          </Text>

          <View style={styles.otpGrid}>
            {renderOTPBoxes()}
          </View>

          <View style={styles.timerContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                OTP Sent. Retry In <Text style={styles.timerCountdown}>{timer} Seconds</Text>
              </Text>
            ) : (
              <Text style={styles.timerText}>
                Didn't receive the OTP?{' '}
                <Text style={styles.resendLink} onPress={() => setTimer(53)}>
                  Resend OTP
                </Text>
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleVerifyOTP} activeOpacity={0.8}>
            <Text style={styles.submitText}>{loading ? 'Verifying...' : 'Verify & Continue'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleChangePhone} style={styles.changePhoneBtn}>
            <Text style={styles.changePhoneText}>Change Phone Number</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light off-white background based on design
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  headerIconContainer: {
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  titleBlue: {
    color: '#2563EB',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 32,
  },
  phoneNumber: {
    color: '#2563EB',
    fontFamily: 'Outfit-Medium',
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  otpBox: {
    width: (SCREEN_WIDTH - 48 - 40) / 6,
    height: 56,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFocused: {
    borderColor: '#2563EB',
  },
  otpBoxText: {
    fontSize: 22,
    fontFamily: 'Outfit-Bold',
    color: '#0F172A',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  timerContainer: {
    marginBottom: 32,
  },
  timerText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
    color: '#64748B',
  },
  timerCountdown: {
    fontFamily: 'Outfit-Bold',
    color: '#16A34A', // Green timer
  },
  resendLink: {
    fontFamily: 'Outfit-Bold',
    color: '#2563EB',
  },
  submitBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#2563EB',
    borderRadius: 26, // fully rounded pill
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
  },
  changePhoneBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  changePhoneText: {
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: '#2563EB',
  },
});

export default OTPScreen;
