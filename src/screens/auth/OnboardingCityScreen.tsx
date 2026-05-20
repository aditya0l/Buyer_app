import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { Button } from '../../components/common/Button';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';

type Props = NativeStackScreenProps<AuthStackParamList, 'OnboardingCity'>;

const CITIES = ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai'];

export const OnboardingCityScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState('Delhi NCR');
  const [searchRadius, setSearchRadius] = useState(25); // Default 25km

  const handleNext = () => {
    if (!selectedCity) {
      Alert.alert('Select City', 'Please select a city to continue.');
      return;
    }
    // Navigate to brand selection screen
    navigation.navigate('OnboardingBrands');
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Where are you looking to buy?</Text>
        <Text style={styles.subtitle}>
          Select your primary city and the maximum dealer search radius.
        </Text>

        <Text style={styles.sectionLabel}>Select City</Text>
        <View style={styles.cityGrid}>
          {CITIES.map((city) => {
            const isSelected = city === selectedCity;
            return (
              <TouchableOpacity
                key={city}
                activeOpacity={0.8}
                onPress={() => setSelectedCity(city)}
                style={[styles.cityCard, isSelected && styles.selectedCityCard]}
              >
                <Text style={[styles.cityText, isSelected && styles.selectedCityText]}>
                  {city}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>Search Radius: {searchRadius} km</Text>
        <Text style={styles.descText}>
          Dealers within this radius will be notified to place bids on your requirements.
        </Text>
        
        {/* Customized Radius selector buttons to make it look super premium and responsive */}
        <View style={styles.radiusRow}>
          {[10, 25, 50, 75, 100].map((km) => {
            const isSelected = km === searchRadius;
            return (
              <TouchableOpacity
                key={km}
                activeOpacity={0.8}
                onPress={() => setSearchRadius(km)}
                style={[styles.radiusBtn, isSelected && styles.selectedRadiusBtn]}
              >
                <Text style={[styles.radiusBtnText, isSelected && styles.selectedRadiusBtnText]}>
                  {km} km
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button title="Continue" onPress={handleNext} style={styles.nextBtn} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.cardBg,
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  cityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 32,
  },
  cityCard: {
    width: '46%',
    margin: '2%',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  selectedCityCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  cityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  selectedCityText: {
    color: colors.primary,
  },
  descText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  radiusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  radiusBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.sm,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  selectedRadiusBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  radiusBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  selectedRadiusBtnText: {
    color: colors.white,
  },
  nextBtn: {
    height: 48,
  },
});
