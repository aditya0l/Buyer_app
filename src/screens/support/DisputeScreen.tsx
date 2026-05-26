import React, { useState } from 'react';
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
import { Button } from '../../components/common/Button';

type Props = NativeStackScreenProps<MainStackParamList, 'Dispute'>;

const DISPUTE_REASONS = [
  'Price higher than quoted',
  'Delivery delayed beyond committed date',
  'Perks not honoured',
  'Vehicle condition different from described',
  'VIN/stock issue not disclosed',
  'Other',
];

export const DisputeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [selectedReason, setSelectedReason] = useState<string>('');

  const handleSubmit = () => {
    if (!selectedReason) {
      Alert.alert('Select Reason', 'Please choose a dispute reason to continue.');
      return;
    }
    Alert.alert(
      'Dispute Filed ✅',
      'Your dispute has been escalated to our Dealer Relations team. The dealer has 48 hours to respond.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScreenWrapper>
      <Header title="File a Dispute" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.warningBanner}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.warningText}>
            A dispute freezes the order process until resolved. Only file if you have a genuine issue.
            CarBounty's Price Guarantee protects your quoted price.
          </Text>
        </View>

        <Text style={styles.label}>Reason for Dispute *</Text>
        {DISPUTE_REASONS.map((reason) => (
          <TouchableOpacity
            key={reason}
            style={[
              styles.reasonRow,
              selectedReason === reason && styles.reasonRowSelected,
            ]}
            onPress={() => setSelectedReason(reason)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.radio,
                selectedReason === reason && styles.radioSelected,
              ]}
            >
              {selectedReason === reason && <View style={styles.radioDot} />}
            </View>
            <Text
              style={[
                styles.reasonText,
                selectedReason === reason && styles.reasonTextSelected,
              ]}
            >
              {reason}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.orderRef}>
          <Text style={styles.orderRefLabel}>Order Reference</Text>
          <Text style={styles.orderRefValue}>{orderId}</Text>
        </View>

        <Button
          title="File Dispute"
          onPress={handleSubmit}
          variant="danger"
          style={styles.submitBtn}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  warningBanner: {
    flexDirection: 'row',
    backgroundColor: colors.errorLight,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 20,
    gap: 10,
    alignItems: 'flex-start',
  },
  warningIcon: {
    fontSize: 18,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: colors.error,
    lineHeight: 17,
    fontWeight: '500',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    gap: 12,
  },
  reasonRowSelected: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.error,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
  },
  reasonText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  reasonTextSelected: {
    color: colors.error,
    fontWeight: '600',
  },
  orderRef: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    padding: 12,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderRefLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  orderRefValue: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  submitBtn: {
    marginTop: 24,
    height: 50,
  },
});
