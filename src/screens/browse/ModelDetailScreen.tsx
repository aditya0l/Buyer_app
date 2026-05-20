import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { PriceText } from '../../components/common/PriceText';
import { Divider } from '../../components/common/Divider';
import { mockVehicles } from '../../mocks/mockVehicles';

type Props = NativeStackScreenProps<MainStackParamList, 'ModelDetail'>;

export const ModelDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { vehicleId } = route.params;

  const vehicle = mockVehicles.find((v) => v.id === vehicleId);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    vehicle && vehicle.variants.length > 0 ? vehicle.variants[0].id : null
  );

  if (!vehicle) {
    return (
      <ScreenWrapper>
        <Header title="Error" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Model not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const selectedVariant = vehicle.variants.find((v) => v.id === selectedVariantId);

  const handleCreateIntent = () => {
    if (!selectedVariantId) {
      Alert.alert('Select Variant', 'Please select a variant to proceed.');
      return;
    }
    // Navigate to CreateIntentScreen
    navigation.navigate('CreateIntent', {
      vehicleId: vehicle.id,
      variantId: selectedVariantId,
    });
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title={`${vehicle.brand} ${vehicle.model}`} />
      
      <FlatList
        data={vehicle.variants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <>
            {/* Banner Car Image */}
            <Image source={{ uri: vehicle.image }} style={styles.carImage} resizeMode="cover" />
            
            {/* Details Wrapper */}
            <View style={styles.detailsHeader}>
              <View style={styles.titleRow}>
                <Text style={styles.brandName}>{vehicle.brand}</Text>
                <Text style={styles.bodyType}>{vehicle.bodyType}</Text>
              </View>
              <Text style={styles.modelName}>{vehicle.model}</Text>
              <Text style={styles.priceRange}>{vehicle.priceRange}</Text>
              <Text style={styles.subtext}>
                Certified on-road dealer quote matching. Start bidding to save.
              </Text>
            </View>

            <Divider style={styles.divider} />

            {/* Quick Specs Strip */}
            <View style={styles.specsStrip}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Fuel Types</Text>
                <Text style={styles.specValue}>{vehicle.fuelTypes.join(', ')}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Active Rooms</Text>
                <Text style={styles.specValue}>{vehicle.bidsCount} LIVE</Text>
              </View>
            </View>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>Select a Variant</Text>
          </>
        }
        renderItem={({ item }) => {
          const isSelected = item.id === selectedVariantId;
          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setSelectedVariantId(item.id)}
              style={[styles.variantCard, isSelected && styles.selectedVariantCard]}
            >
              <View style={styles.variantRow}>
                <View style={styles.variantNameWrapper}>
                  <Text style={[styles.variantName, isSelected && styles.selectedVariantName]}>
                    {item.name}
                  </Text>
                  <Text style={styles.variantSpecs}>
                    {item.fuel} • {item.transmission} • {item.engine}
                  </Text>
                </View>
                <View style={styles.priceWrapper}>
                  <PriceText value={item.price} style={[styles.variantPrice, isSelected && styles.selectedVariantPrice]} />
                  <Text style={styles.mileageText}>{item.mileage}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Sticky Bottom Actions Bar */}
      <View style={styles.actionsBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.bottomPriceLabel}>Est. Ex-Showroom</Text>
          {selectedVariant ? (
            <PriceText value={selectedVariant.price} style={styles.bottomPriceValue} />
          ) : (
            <Text style={styles.bottomPriceValue}>—</Text>
          )}
        </View>
        <Button
          title="Create Intent"
          onPress={handleCreateIntent}
          style={styles.createIntentBtn}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  carImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.borderLight,
  },
  detailsHeader: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bodyType: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '700',
    backgroundColor: colors.inputBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  modelName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 4,
  },
  priceRange: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 6,
  },
  subtext: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 18,
  },
  divider: {
    marginVertical: 0,
  },
  specsStrip: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: colors.cardBg,
  },
  specItem: {
    flex: 1,
  },
  specLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  variantCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
  },
  selectedVariantCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  variantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  variantNameWrapper: {
    flex: 1.2,
  },
  variantName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  selectedVariantName: {
    color: colors.primary,
  },
  variantSpecs: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  priceWrapper: {
    flex: 0.8,
    alignItems: 'flex-end',
  },
  variantPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  selectedVariantPrice: {
    color: colors.primary,
  },
  mileageText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
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
  actionsBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.cardBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  priceContainer: {
    flex: 0.9,
  },
  bottomPriceLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  bottomPriceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  createIntentBtn: {
    flex: 1.1,
    height: 44,
  },
});
