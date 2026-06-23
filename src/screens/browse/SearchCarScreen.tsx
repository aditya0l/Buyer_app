import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import Svg, { Path } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

// Mock data for the screen
const recentSearches = ['Mahindra thar', 'Hyundai eon', 'Maruti vitara'];
const popularSearches = ['Maruti Brezza', 'Hyundai Creta', 'Kia Seltos'];
const bodyTypes = ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Pickup'];

const brandsData = [
  { id: 'bmw', name: 'BMW', modelsCount: 12, logoUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=100&auto=format&fit=crop' },
  { id: 'tesla', name: 'Tesla', modelsCount: 8, logoUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=100&auto=format&fit=crop' },
  { id: 'mercedes', name: 'Mercedes', modelsCount: 6, logoUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=100&auto=format&fit=crop' },
  { id: 'honda', name: 'Honda', modelsCount: 12, logoUrl: 'https://images.unsplash.com/photo-1618843479619-f419863346d0?q=80&w=100&auto=format&fit=crop' },
  { id: 'tata', name: 'Tata', modelsCount: 12, logoUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=100&auto=format&fit=crop' },
  { id: 'bmw-2', name: 'BMW', modelsCount: 12, logoUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=100&auto=format&fit=crop' },
];

const bidOnModels = [
  {
    id: 'brezza',
    name: 'Maruti Brezza ZXI+',
    specs: 'SUV • Petrol • ₹12L - ₹15L',
    bids: '84 Bids',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'creta',
    name: 'Hyundai Creta SX',
    specs: 'SUV • Diesel • ₹13L - ₹17L',
    bids: '62 Bids',
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=200&auto=format&fit=crop',
  },
];

export const SearchCarScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScreenWrapper style={styles.wrapper} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              fill="#0F172A"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Your Car</Text>
        <View style={styles.placeholderBtn} />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={styles.searchIcon}>
            <Path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              fill="#64748B"
            />
          </Svg>
          <TextInput
            style={styles.searchInput}
            placeholder="Search brand, model, Variant..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent searches</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalTags}>
            {recentSearches.map((item, idx) => (
              <TouchableOpacity key={idx} activeOpacity={0.8} style={styles.tagBtn}>
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" style={styles.tagIcon}>
                  <Path
                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                    fill="#64748B"
                  />
                </Svg>
                <Text style={styles.tagText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Right Now */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular right now</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalTags}>
            {popularSearches.map((item, idx) => (
              <TouchableOpacity key={idx} activeOpacity={0.8} style={styles.tagBtn}>
                <Text style={styles.tagText}>{item}</Text>
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" style={styles.tagIconRight}>
                  <Path
                    d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
                    fill="#64748B"
                  />
                </Svg>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Body Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Body Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalTags}>
            {bodyTypes.map((item, idx) => (
              <TouchableOpacity key={idx} activeOpacity={0.8} style={styles.typeBtn}>
                <Text style={styles.typeText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Brands */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Brands</Text>
          <View style={styles.brandsGrid}>
            {brandsData.map((item, idx) => (
              <TouchableOpacity key={idx} activeOpacity={0.8} style={styles.brandCard}>
                <Image source={{ uri: item.logoUrl }} style={styles.brandLogo} resizeMode="contain" />
                <View style={styles.brandInfo}>
                  <Text style={styles.brandName}>{item.name}</Text>
                  <Text style={styles.brandSubtitle}>Models | {item.modelsCount.toString().padStart(2, '0')}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Most Bid-On Models */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Bid-On Models</Text>
          {bidOnModels.map((item) => (
            <View key={item.id} style={styles.modelCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.modelImage} resizeMode="cover" />
              <View style={styles.modelInfo}>
                <Text style={styles.modelName}>{item.name}</Text>
                <Text style={styles.modelSpecs}>{item.specs}</Text>
              </View>
              <Text style={styles.modelBids}>{item.bids}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Apply Filter Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.applyBtn}
        >
          <Text style={styles.applyBtnText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F9F9FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEEF3',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDEEF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: '#0F172A',
  },
  placeholderBtn: {
    width: 44,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    marginHorizontal: 20,
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#2563EB',
    borderRadius: 28,
    backgroundColor: '#F0F3FF',
    paddingLeft: 20,
    paddingRight: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Outfit-Medium',
    fontSize: 15,
    color: '#0F172A',
    padding: 0,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 12,
  },
  horizontalTags: {
    paddingRight: 20,
  },
  tagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  tagIcon: {
    marginRight: 6,
  },
  tagIconRight: {
    marginLeft: 6,
  },
  tagText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#475569',
  },
  typeBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  typeText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#475569',
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  brandCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  brandLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#0F172A',
  },
  brandSubtitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  modelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  modelImage: {
    width: 60,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#0F172A',
  },
  modelSpecs: {
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  modelBids: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#2563EB',
    marginLeft: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#EDEEF3',
  },
  applyBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  applyBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
