import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { mockVehicles } from '../../mocks/mockVehicles';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const BODY_TYPES = ['All', 'SUV', 'Sedan', 'Hatchback', 'EV'];

export const BrowseScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('All');

  const filteredVehicles = mockVehicles.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesBody = selectedBodyType === 'All' || car.bodyType === selectedBodyType;
    
    return matchesSearch && matchesBody;
  });

  return (
    <ScreenWrapper style={styles.wrapper} scrollable={false}>
      {/* Background Gradient */}
      <View style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#E0EAFF" />
              <Stop offset="0.4" stopColor="#F9F9FF" />
              <Stop offset="1" stopColor="#F9F9FF" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#bgGrad)" />
        </Svg>
      </View>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search brand, model (e.g. Brezza)..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Body Type Row */}
      <View style={styles.filterWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BODY_TYPES}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => {
            const isSelected = item === selectedBodyType;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedBodyType(item)}
                style={[styles.filterChip, isSelected && styles.selectedFilterChip]}
              >
                <Text style={[styles.filterText, isSelected && styles.selectedFilterText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Grid Results */}
      <FlatList
        data={filteredVehicles}
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
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No Models Found</Text>
            <Text style={styles.emptySub}>
              Try adjusting your filters or searching for another keyword.
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
    backgroundColor: 'transparent',
  },
  searchHeader: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    height: 48,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Outfit-Medium',
    color: colors.textPrimary,
    padding: 0,
  },
  clearIcon: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  filterWrapper: {
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  filterList: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.inputBg,
    marginRight: 8,
  },
  selectedFilterChip: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontFamily: 'Outfit-Medium',
    color: colors.textSecondary,
  },
  selectedFilterText: {
    color: colors.white,
  },
  listContent: {
    padding: 12,
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  carCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
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
    fontFamily: 'Outfit-Bold',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  modelName: {
    fontSize: 15,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
    marginTop: 2,
  },
  priceRange: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: 'Outfit-Bold',
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
    fontFamily: 'Outfit-Bold',
    backgroundColor: colors.inputBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  bidsCount: {
    fontSize: 10,
    color: colors.textSecondary,
    fontFamily: 'Outfit-Medium',
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
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
});
