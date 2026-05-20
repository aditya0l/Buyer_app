import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { mockVehicles } from '../../mocks/mockVehicles';

type Props = NativeStackScreenProps<MainStackParamList, 'CreateIntent'>;

const TIMELINES = ['Immediate (Within 7 days)', 'Within 15 days', 'Within 30 days', 'More than 30 days'];
const PERKS_OPTIONS = [
  'Extended Warranty (5 Years)',
  'Zero Dep. Insurance Included',
  'Basic Accessories Kit (Mats, Cover)',
  'Doorstep Home Delivery',
  'Exchange Bonus Integration',
];

export const CreateIntentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { vehicleId, variantId } = route.params;

  const vehicle = mockVehicles.find((v) => v.id === vehicleId);
  const variant = vehicle?.variants.find((v) => v.id === variantId);

  const [color, setColor] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[1]);
  const [selectedPerks, setSelectedPerks] = useState<string[]>([]);
  const [deliveryCity, setDeliveryCity] = useState('Delhi NCR');

  const togglePerk = (perk: string) => {
    if (selectedPerks.includes(perk)) {
      setSelectedPerks(selectedPerks.filter((p) => p !== perk));
    } else {
      setSelectedPerks([...selectedPerks, perk]);
    }
  };

  const handleProceed = () => {
    if (!color.trim()) {
      Alert.alert('Color Required', 'Please enter your preferred exterior color.');
      return;
    }
    
    // Proceed to payment gateway screen
    navigation.navigate('CommitmentPay', {
      intentId: `int_${Math.floor(Math.random() * 900000) + 100000}`,
      variantId: variantId,
      price: variant?.price || 0,
    });
  };

  if (!vehicle || !variant) {
    return (
      <ScreenWrapper>
        <Header title="Error" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Invalid model configuration selected</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Create Intent" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Selected Config Card */}
        <View style={styles.configCard}>
          <Text style={styles.configLabel}>SELECTED CONFIGURATION</Text>
          <Text style={styles.carName}>{vehicle.brand} {vehicle.model}</Text>
          <Text style={styles.variantName}>{variant.name} ({variant.fuel} • {variant.transmission})</Text>
        </View>

        <Text style={styles.sectionTitle}>Exterior Color Preference</Text>
        <Input
          placeholder="e.g. Fire Red, Pearl White, Onyx Black"
          value={color}
          onChangeText={setColor}
        />

        <Text style={styles.sectionTitle}>Delivery Timeline</Text>
        <View style={styles.timelineList}>
          {TIMELINES.map((time) => {
            const isSelected = time === selectedTimeline;
            return (
              <TouchableOpacity
                key={time}
                activeOpacity={0.8}
                onPress={() => setSelectedTimeline(time)}
                style={[styles.optionCard, isSelected && styles.selectedOptionCard]}
              >
                <View style={styles.radioButton}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
                <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Requested Perks / Inclusions</Text>
        <Text style={styles.perksSubtitle}>
          Dealers will see these and attempt to include them in their package bids.
        </Text>
        <View style={styles.perksList}>
          {PERKS_OPTIONS.map((perk) => {
            const isSelected = selectedPerks.includes(perk);
            return (
              <TouchableOpacity
                key={perk}
                activeOpacity={0.8}
                onPress={() => togglePerk(perk)}
                style={[styles.perkCard, isSelected && styles.selectedPerkCard]}
              >
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.perkText, isSelected && styles.selectedPerkText]}>
                  {perk}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Registering Purchase Location</Text>
        <Input
          placeholder="Delhi NCR"
          value={deliveryCity}
          onChangeText={setDeliveryCity}
          editable={false}
          leftIcon={<Text style={styles.cityPin}>📍</Text>}
        />
        <Text style={styles.helpText}>
          City registry matches your profile region. Edit profile to adjust.
        </Text>

        <Button
          title="Proceed to Commitment Pay"
          onPress={handleProceed}
          style={styles.proceedBtn}
        />
      </ScrollView>
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
  configCard: {
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: radius.md,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  configLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 6,
  },
  variantName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  timelineList: {
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 8,
  },
  selectedOptionCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
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
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  perksSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: -8,
    marginBottom: 12,
  },
  perksList: {
    marginBottom: 16,
  },
  perkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 8,
  },
  selectedPerkCard: {
    borderColor: colors.primary,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  perkText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectedPerkText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  cityPin: {
    fontSize: 16,
    marginRight: 8,
  },
  helpText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: -8,
    marginBottom: 24,
  },
  proceedBtn: {
    height: 48,
    marginTop: 12,
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
