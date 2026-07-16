import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { ArrowLeft, Info, ChevronRight, Sun, Wind, Smartphone, ParkingCircle, Lightbulb, Scan, Key, Shield, Globe, Music } from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import CompareIcon from '../../assets/compareicon.svg';

type Props = NativeStackScreenProps<MainStackParamList, 'CarDetails'>;

export const CarDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedVariant, setSelectedVariant] = useState('ZXi+');
  const [selectedColor, setSelectedColor] = useState('#D92D20');

  const variants = ['LXi', 'VXi', 'ZXi', 'ZXi+', 'ZXi+ CNG'];
  
  const colors = [
    { name: 'Opulent Red', hex: '#D92D20' },
    { name: 'Pearl Arctic White', hex: '#F8FAFC' },
    { name: 'Magma Grey', hex: '#334155' },
    { name: 'Splendid Silver', hex: '#94A3B8' },
    { name: 'Exuberant Blue', hex: '#1E3A8A' },
    { name: 'Brave Khaki', hex: '#84CC16' },
  ];

  const specs = [
    { label: 'Engine', value: '1.5L K15C Petrol' },
    { label: 'Power', value: '103 PS @ 6000 rpm' },
    { label: 'Torque', value: '137 Nm @ 4400 rpm' },
    { label: 'Transmission', value: '6-AT (Automatic)' },
    { label: 'Mileage (ARAI)', value: '19.80 km/l' },
    { label: 'Fuel Type', value: 'Petrol' },
    { label: 'Safety Rating', value: '5-Star (Global NCAP)' },
    { label: 'Seating', value: '5 persons' },
    { label: 'Boot Space', value: '328 litres' },
    { label: 'Kerb Weight', value: '1195 kg' },
  ];

  const features = [
    { icon: <Sun size={16} color="#F59E0B" />, label: 'Sunroof' },
    { icon: <Scan size={16} color="#64748B" />, label: '360° Surround View' },
    { icon: <Wind size={16} color="#38BDF8" />, label: 'Auto Climate' },
    { icon: <Key size={16} color="#EAB308" />, label: 'Keyless Entry' },
    { icon: <Smartphone size={16} color="#0F172A" />, label: '9" SmartPlay Pro+' },
    { icon: <Shield size={16} color="#EF4444" />, label: '6 Airbags' },
    { icon: <ParkingCircle size={16} color="#3B82F6" />, label: 'Auto Park Assist' },
    { icon: <Globe size={16} color="#38BDF8" />, label: 'Connected Car Tech' },
    { icon: <Lightbulb size={16} color="#EAB308" />, label: 'LED Headlamps' },
    { icon: <Music size={16} color="#64748B" />, label: 'Arkamys Sound' },
  ];

  return (
    <ScreenWrapper style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Brezza</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
        
        {/* Car Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.svgBackground}>
            <Svg width="250" height="250" viewBox="0 0 250 250">
              <Circle cx="125" cy="125" r="125" fill="#DBEAFE" opacity="0.6" />
              <Circle cx="125" cy="125" r="90" fill="#BFDBFE" opacity="0.6" />
            </Svg>
          </View>
          <Image 
            source={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/123185/brezza-exterior-right-front-three-quarter-4.jpeg' }} 
            style={styles.carImage} 
            resizeMode="contain" 
          />
        </View>

        {/* Variant Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.variantContainer}>
          {variants.map((v) => (
            <TouchableOpacity 
              key={v} 
              style={[styles.variantPill, selectedVariant === v && styles.variantPillSelected]}
              onPress={() => setSelectedVariant(v)}
            >
              <Text style={[styles.variantText, selectedVariant === v && styles.variantTextSelected]}>{v}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Pricing Card */}
        <View style={styles.priceCard}>
          <Text style={styles.priceCardTitle}>Maruti Brezza {selectedVariant} AT</Text>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLabel}>Ex-Showroom (Delhi)</Text>
              <Text style={styles.priceValueBlue}>₹13,18,900</Text>
            </View>
            <View>
              <Text style={styles.priceLabel}>Est. On-Road</Text>
              <Text style={styles.priceValueDark}>~₹14,80,000</Text>
            </View>
          </View>
          
          <View style={styles.hintBox}>
            <Info size={14} color="#3B82F6" style={{ marginRight: 6 }} />
            <Text style={styles.hintText}>Users got ₹13.1L - ₹13.4L on-road in Delhi NCR</Text>
          </View>
        </View>

        {/* Colours */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Colours Available</Text>
          <View style={styles.colorRow}>
            {colors.map((c) => (
              <TouchableOpacity 
                key={c.name} 
                style={[
                  styles.colorCircle, 
                  { backgroundColor: c.hex },
                  selectedColor === c.hex && styles.colorCircleSelected
                ]}
                onPress={() => setSelectedColor(c.hex)}
              />
            ))}
          </View>
          <Text style={styles.colorSubtext}>
            {colors.find(c => c.hex === selectedColor)?.name} selected
          </Text>
        </View>

        {/* Specifications */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Specifications - {selectedVariant} AT</Text>
          <View style={styles.specsCard}>
            {specs.map((spec, index) => (
              <View key={spec.label} style={[styles.specRow, index !== specs.length - 1 && styles.specRowBorder]}>
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Key Features */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Key Features - {selectedVariant} AT</Text>
          <View style={styles.featuresGrid}>
            {features.map((feat) => (
              <View key={feat.label} style={styles.featureBox}>
                {feat.icon}
                <Text style={styles.featureText}>{feat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Live Market Date */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Live Market Date</Text>
          <View style={styles.marketCard}>
            <View style={styles.marketStatCol}>
              <Text style={styles.marketStatValGreen}>₹41,500</Text>
              <Text style={styles.marketStatLabel}>Avg. Savings</Text>
            </View>
            <View style={styles.marketDivider} />
            <View style={styles.marketStatCol}>
              <Text style={styles.marketStatValDark}>7</Text>
              <Text style={styles.marketStatLabel}>Avg. Dealers</Text>
            </View>
            <View style={styles.marketDivider} />
            <View style={styles.marketStatCol}>
              <Text style={styles.marketStatValDark}>84</Text>
              <Text style={styles.marketStatLabel}>Active Bids</Text>
            </View>
          </View>
        </View>

        {/* Compare */}
        <TouchableOpacity style={styles.compareBanner}>
          <View>
            <Text style={styles.compareBannerTitle}>Compare With another model</Text>
            <Text style={styles.compareBannerSub}>Side-by-side spec & price comparison</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryBtn} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryBtnText}>Start Bid Room →</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryBtn}>
          <CompareIcon width={18} height={18} style={{ marginRight: 8 }} />
          <Text style={styles.secondaryBtnText}>Compare</Text>
        </TouchableOpacity>
      </View>

    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: '#0F172A',
  },
  scrollContent: {
    flex: 1,
  },
  scrollInner: {
    padding: 16,
    paddingBottom: 40,
  },
  imageSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 20,
    position: 'relative',
  },
  svgBackground: {
    position: 'absolute',
    top: -20,
  },
  carImage: {
    width: 280,
    height: 180,
    zIndex: 10,
  },
  variantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'center',
    width: '100%',
  },
  variantPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E7FF',
    marginHorizontal: 4,
  },
  variantPillSelected: {
    backgroundColor: '#3B82F6',
  },
  variantText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#475569',
  },
  variantTextSelected: {
    color: '#FFFFFF',
  },
  priceCard: {
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  priceCardTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  priceValueBlue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
    color: '#3B82F6',
  },
  priceValueDark: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
    color: '#0F172A',
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
  },
  hintText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#3B82F6',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 12,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  colorCircleSelected: {
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  colorSubtext: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  specsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  specRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  specLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#94A3B8',
  },
  specValue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 13,
    color: '#0F172A',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureBox: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  featureText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#0F172A',
    marginLeft: 8,
    flex: 1,
  },
  marketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marketStatCol: {
    alignItems: 'center',
    flex: 1,
  },
  marketStatValGreen: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#207320',
    marginBottom: 4,
  },
  marketStatValDark: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 4,
  },
  marketStatLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
    color: '#94A3B8',
  },
  marketDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#F1F5F9',
  },
  compareBanner: {
    backgroundColor: '#E0E7FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  compareBannerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 2,
  },
  compareBannerSub: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  footer: {
    padding: 16,
    paddingBottom: 30,
    backgroundColor: '#EEF2FF',
  },
  primaryBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  secondaryBtn: {
    backgroundColor: '#D1D5DB',
    borderRadius: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
  },
});
