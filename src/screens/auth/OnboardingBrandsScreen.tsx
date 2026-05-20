import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { Button } from '../../components/common/Button';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { useAuthStore } from '../../store/authStore';
import { mockUser } from '../../mocks/mockUser';

type Props = NativeStackScreenProps<AuthStackParamList, 'OnboardingBrands'>;

const BRANDS = [
  { id: 'maruti', name: 'Maruti Suzuki', emoji: '🚙' },
  { id: 'hyundai', name: 'Hyundai', emoji: '🚗' },
  { id: 'tata', name: 'Tata Motors', emoji: '🚘' },
  { id: 'honda', name: 'Honda', emoji: '🏎️' },
  { id: 'kia', name: 'Kia', emoji: '🚙' },
  { id: 'mahindra', name: 'Mahindra', emoji: '🚜' },
];

export const OnboardingBrandsScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const { login } = useAuthStore();

  const toggleBrand = (brandId: string) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const handleFinish = () => {
    // Save selected brand preferences in persistent store
    useAuthStore.getState().setPreferredBrands(selectedBrands);
    // Execute login block to transition AuthStack to MainStack
    login('mock_token_abcdef123456', mockUser);
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Preferred Brands</Text>
        <Text style={styles.subtitle}>
          Choose brands you are interested in. We will customize your live bid room suggestions.
        </Text>

        <View style={styles.brandsGrid}>
          {BRANDS.map((brand) => {
            const isSelected = selectedBrands.includes(brand.id);
            return (
              <TouchableOpacity
                key={brand.id}
                activeOpacity={0.8}
                onPress={() => toggleBrand(brand.id)}
                style={[styles.brandCard, isSelected && styles.selectedBrandCard]}
              >
                <Text style={styles.emoji}>{brand.emoji}</Text>
                <Text style={[styles.brandText, isSelected && styles.selectedBrandText]}>
                  {brand.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button title="Get Started" onPress={handleFinish} style={styles.finishBtn} />
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
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 48,
  },
  brandCard: {
    width: '46%',
    margin: '2%',
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  selectedBrandCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  selectedBrandText: {
    color: colors.primary,
  },
  finishBtn: {
    height: 48,
  },
});
