import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, MessageSquare } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle as SvgCircle, Polyline, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const DealBookingConfirmedScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#2563EB" stopOpacity={0.18} />
            <Stop offset="25%" stopColor="#2563EB" stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#bgGrad)" />
      </Svg>

      {/* Header */}
      <View style={{ height: insets.top }} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft color="#0F172A" size={24} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stepText}>Step 1 of 5</Text>
          <Text style={styles.headerTitle}>Booking Confirmed</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: '20%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.heroContainer}>
          {/* Instagram-style verified badge */}
          <View style={styles.verifiedBadgeWrapper}>
            <Svg width={80} height={80} viewBox="0 0 80 80">
              {/* Outer blue filled circle */}
              <SvgCircle cx="40" cy="40" r="38" fill="#2563EB" />
              {/* Inner lighter ring */}
              <SvgCircle cx="40" cy="40" r="32" fill="none" stroke="#60A5FA" strokeWidth="2" />
              {/* White checkmark */}
              <Path
                d="M24 40 L35 52 L56 28"
                stroke="#FFF"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
          <Text style={styles.heroTitle}>Booking Confirmed!</Text>
          <Text style={styles.heroSub}>Your ₹10,000 is securely held. Deal locked.</Text>
        </View>

        {/* Car Card */}
        <View style={styles.carCard}>
          <Image
            source={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/123185/grand-vitara-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80' }}
            style={styles.carImg}
            resizeMode="contain"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.carName}>Maruti Brezza ZXI+</Text>
            <Text style={styles.carSub}>Petrol • AT • Red</Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsCard}>
          {[
            { label: 'Booking ID', value: '#CB-2026-04872' },
            { label: 'Amount Paid', value: '₹10,000 ✓', valueColor: '#16A34A' },
            { label: 'Dealer', value: 'Maurya Motors' },
            { label: 'On-Road Price Locked', value: '₹13,18,000' },
            { label: 'Delivery Est.', value: '7 Working days' },
          ].map((row, i, arr) => (
            <View key={row.label} style={[styles.detailRow, i < arr.length - 1 && styles.detailRowBorder]}>
              <Text style={styles.detailLabel}>{row.label}</Text>
              <Text style={[styles.detailValue, row.valueColor ? { color: row.valueColor } : {}]}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Next Step Box */}
        <View style={styles.nextStepBox}>
          <View style={styles.nextStepIconRow}>
            <MessageSquare size={18} color="#2563EB" style={{ marginRight: 8 }} />
            <Text style={styles.nextStepLabel}>Step 2 of 5 - Starting Now</Text>
          </View>
          <Text style={styles.nextStepTitle}>Choose how to inspect the vehicle before revealing your identity</Text>
          <Text style={styles.nextStepSub}>Your ₹10,000 advance is held securely. As the next step, choose your preferred PDI option - or skip and proceed directly.</Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('DealPDIOption')}>
          <Text style={styles.primaryBtnText}>Step 2 - Choose PDI Option</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>View My Rooms</Text>
        </TouchableOpacity>

        <View style={styles.bottomDash} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'transparent' },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  headerTitleContainer: { flex: 1, alignItems: 'center' },
  stepText: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#2563EB' },
  headerTitle: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A' },
  progressBarBg: { height: 4, backgroundColor: '#F1F5F9' },
  progressBarFill: { height: '100%', backgroundColor: '#F97316' },
  scrollContent: { padding: 20, paddingBottom: 40 },

  heroContainer: { alignItems: 'center', marginTop: 16, marginBottom: 24 },
  verifiedBadgeWrapper: { marginBottom: 16, shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 8 },
  heroTitle: { fontFamily: 'Outfit-Bold', fontSize: 22, color: '#0F172A', marginBottom: 4 },
  heroSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B' },

  carCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#BFDBFE', marginBottom: 16 },
  carImg: { width: 80, height: 50, marginRight: 12, borderRadius: 6 },
  carName: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A' },
  carSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#2563EB', marginTop: 2 },

  detailsCard: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20, overflow: 'hidden' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  detailRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  detailLabel: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B' },
  detailValue: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A' },

  nextStepBox: { backgroundColor: '#EFF6FF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#BFDBFE', marginBottom: 20 },
  nextStepIconRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  nextStepLabel: { fontFamily: 'Outfit-Bold', fontSize: 12, color: '#2563EB' },
  nextStepTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 6 },
  nextStepSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', lineHeight: 18 },

  primaryBtn: { backgroundColor: '#2563EB', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },
  secondaryBtn: { backgroundColor: '#F1F5F9', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 24 },
  secondaryBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#475569' },

  bottomDash: { width: 134, height: 5, backgroundColor: '#0F172A', borderRadius: 100, alignSelf: 'center' },
});
