import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import Svg, { Path, Rect, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import WaveSvg from '../../../wave.svg';

const { width: screenWidth } = Dimensions.get('window');

type Props = NativeStackScreenProps<MainStackParamList, 'CommitmentPay'>;

export const CommitmentPayScreen: React.FC<Props> = ({ route, navigation }) => {
  const { intentId, variantId, price } = route.params;
  const [selectedPlan, setSelectedPlan] = useState<'token' | 'aadhaar' | 'phone'>('token');

  const handleLaunch = () => {
    // In a real app, this would route to payment for token, or OTP screens for free options
    navigation.replace('IntentSuccess', { roomId: `room-${intentId}` });
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M19 12H5M12 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify Seriousness</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>Activate your buying room</Text>
        <Text style={styles.subTitle}>This helps verified dealers compete with better prices and faster delivery for your car.</Text>

        {/* Token Card */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedPlan('token')} style={[styles.card, styles.tokenCard, selectedPlan === 'token' && styles.cardSelected]}>
          <View style={StyleSheet.absoluteFill}>
            <Svg style={StyleSheet.absoluteFill}>
              <Defs>
                <LinearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor="#3B82F6" />
                  <Stop offset="1" stopColor="#1D4ED8" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#cardGrad)" />
            </Svg>
            <View style={[StyleSheet.absoluteFill, { opacity: 0.45, transform: [{ scale: 1.1 }] }]}>
              <WaveSvg width="100%" height="100%" />
            </View>
          </View>
          
          {/* Smooth SVG Cutout Mock - deeper and fully rounded */}
          <Svg width={135} height={45} viewBox="0 0 135 45" style={styles.cutoutSvg}>
            <Path d="M0,0 Q20,0 20,20 L20,25 Q20,45 40,45 L135,45 L135,0 Z" fill="#EEF2FF" />
          </Svg>
          
          {/* Badge */}
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>⭐ Most Popular</Text>
          </View>

          <View style={styles.cardContentPadding}>
            <Text style={styles.priceTextWhite}>₹499</Text>
            
            <View style={styles.greenFadeWrapper}>
              <View style={styles.greenBar} />
              <View style={styles.greenFadeContent}>
                <Svg style={StyleSheet.absoluteFill}>
                  <Defs>
                    <LinearGradient id="greenFade" x1="0" y1="0" x2="1" y2="0">
                      <Stop offset="0" stopColor="#22C55E" stopOpacity="0.3" />
                      <Stop offset="1" stopColor="#22C55E" stopOpacity="0" />
                    </LinearGradient>
                  </Defs>
                  <Rect width="100%" height="100%" fill="url(#greenFade)" />
                </Svg>
                <Text style={styles.labelTextWhite}>Refundable Token</Text>
              </View>
            </View>

            <View style={styles.featureList}>
              <FeatureItem type="green" bold="100% refunded" text=" if deal is completed or room expires" whiteText />
              <FeatureItem type="green" bold="" text="Highest dealer engagement — up to " boldSuffix="9 dealers" whiteText />
              <FeatureItem type="green" bold="" text="Priority room listing · Faster bids" whiteText />
            </View>
          </View>
        </TouchableOpacity>

        {/* Aadhaar Card */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedPlan('aadhaar')} style={[styles.card, styles.freeCard, selectedPlan === 'aadhaar' && styles.cardSelected]}>
          <View style={[StyleSheet.absoluteFill, { opacity: 1, transform: [{ scale: 1.5 }] }]}>
            <WaveSvg width="100%" height="100%" />
          </View>

          <Text style={styles.priceTextDark}>Free</Text>
          
          <View style={styles.fadeWrapper}>
            <View style={[styles.bar, { backgroundColor: '#3B82F6' }]} />
            <View style={styles.fadeContent}>
              <Svg style={StyleSheet.absoluteFill}>
                <Defs>
                  <LinearGradient id="blueFade" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#3B82F6" stopOpacity="0.15" />
                    <Stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#blueFade)" />
              </Svg>
              <Text style={styles.labelTextBlue}>Aadhaar OTP Verification</Text>
            </View>
          </View>

          <View style={styles.featureList}>
            <FeatureItem type="blue" bold="Identity verified" text=" via UIDAI OTP — no money needed" />
            <FeatureItem type="blue" bold="" text="Dealers get " boldSuffix="5-7 bids" postText=" on average" />
            <FeatureItem type="grey" bold="" text="Slightly lower priority than token" />
          </View>
        </TouchableOpacity>

        {/* Phone Card */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedPlan('phone')} style={[styles.card, styles.freeCard, selectedPlan === 'phone' && styles.cardSelected]}>
          <View style={[StyleSheet.absoluteFill, { opacity: 1, transform: [{ scale: 1.5 }] }]}>
            <WaveSvg width="100%" height="100%" />
          </View>

          <Text style={styles.priceTextDark}>Free</Text>
          
          <View style={styles.fadeWrapper}>
            <View style={[styles.bar, { backgroundColor: '#3B82F6' }]} />
            <View style={styles.fadeContent}>
              <Svg style={StyleSheet.absoluteFill}>
                <Defs>
                  <LinearGradient id="blueFade2" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#3B82F6" stopOpacity="0.15" />
                    <Stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#blueFade2)" />
              </Svg>
              <Text style={styles.labelTextBlue}>Phone Verification</Text>
            </View>
          </View>

          <View style={styles.featureList}>
            <FeatureItem type="blue" bold="" text="Verify via SMS OTP on registered number" />
            <FeatureItem type="grey" bold="" text="3-5 dealers on average · Lower urgency signal" />
            <FeatureItem type="grey" bold="" text="Best for research / price discovery" />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.launchBtn} onPress={handleLaunch}>
          <Text style={styles.launchBtnText}>🚀 Launch Bid Room</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const FeatureItem = ({ type, bold, text, boldSuffix, postText, whiteText }: { type: 'green' | 'blue' | 'grey', bold: string, text: string, boldSuffix?: string, postText?: string, whiteText?: boolean }) => {
  return (
    <View style={styles.featureRow}>
      <View style={styles.iconBox}>
        {type === 'green' && (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="#22C55E">
            <Circle cx={12} cy={12} r={10} fill="#22C55E" />
            <Path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        )}
        {type === 'blue' && (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="#3B82F6">
            <Circle cx={12} cy={12} r={10} fill="#3B82F6" />
            <Path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        )}
        {type === 'grey' && (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="#94A3B8">
            <Circle cx={12} cy={12} r={10} fill="#94A3B8" />
            <Path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        )}
      </View>
      <Text style={[styles.featureText, whiteText && { color: '#F1F5F9' }]}>
        {bold ? <Text style={{ fontFamily: 'Outfit-Bold' }}>{bold}</Text> : null}
        {text}
        {boldSuffix ? <Text style={{ fontFamily: 'Outfit-Bold' }}>{boldSuffix}</Text> : null}
        {postText ? <Text>{postText}</Text> : null}
      </Text>
    </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  mainTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
    color: '#0F172A',
    marginBottom: 6,
  },
  subTitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#3B82F6',
  },
  tokenCard: {
    backgroundColor: '#1D4ED8', // Fallback, gradient used above
    padding: 0, // removed padding to let gradient fill
  },
  cardContentPadding: {
    padding: 20,
  },
  freeCard: {
    backgroundColor: '#E0E7FF', // very light blue
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  cutoutSvg: {
    position: 'absolute',
    top: -2, // pull up slightly to blend
    right: 0,
  },
  badgeContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#F97316', // Orange
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, // pill shape
    zIndex: 10,
  },
  badgeText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 11,
    color: '#FFFFFF',
  },
  priceTextWhite: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  priceTextDark: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: '#0F172A',
    marginBottom: 8,
  },
  fadeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 36,
  },
  bar: {
    width: 4,
    height: '100%',
    borderRadius: 4,
  },
  greenFadeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 36,
  },
  greenBar: {
    width: 4,
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
  greenFadeContent: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  fadeContent: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  labelTextWhite: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  labelTextBlue: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
  featureList: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    marginTop: 2,
    marginRight: 10,
  },
  featureText: {
    flex: 1,
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  bottomBar: {
    padding: 20,
    backgroundColor: '#EEF2FF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  launchBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  launchBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
