import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { mockVehicles } from '../../mocks/mockVehicles';

type Props = NativeStackScreenProps<MainStackParamList, 'Brand'>;

export const BrandScreen: React.FC<Props> = ({ route, navigation }) => {
  const { brandId, brandName } = route.params;

  // Filter vehicles by brand name matching
  const brandModels = mockVehicles.filter(
    (v) => v.brand.toLowerCase() === brandName.toLowerCase() || brandId === v.brand.toLowerCase()
  );

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title={brandName} />
      
      <FlatList
        data={brandModels}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ModelDetail', { vehicleId: item.id })}
            style={styles.carCard}
          >
            <Image source={{ uri: item.image }} style={styles.carImage} resizeMode="cover" />
            <View style={styles.cardContent}>
              <Text style={styles.brandName}>{item.brand}</Text>
              <Text style={styles.modelName}>{item.model}</Text>
              <Text style={styles.priceRange}>{item.priceRange}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.badgeText}>{item.bodyType}</Text>
                <Text style={styles.bidsCount}>{item.bidsCount} intents</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🚗</Text>
            <Text style={styles.emptyTitle}>No Models Available</Text>
            <Text style={styles.emptySub}>
              We are working with dealers to bring this brand online soon.
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  carCard: {
    width: '48%',
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  carImage: {
    width: '100%',
    height: 100,
    backgroundColor: colors.borderLight,
  },
  cardContent: {
    padding: 12,
  },
  brandName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  modelName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  priceRange: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderLight,
    paddingTop: 8,
  },
  badgeText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '700',
    backgroundColor: colors.inputBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bidsCount: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});
