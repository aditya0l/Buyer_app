import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle as SvgCircle, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const NEXT_STEPS = [
  'Bank verifies your basic details — no documents needed now',
  'Pre-approval status updated here within 24 hrs',
  'Bring approval letter to showroom for quick disbursement',
];

export const CarLoanPendingScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackParamList, any>>();
  const returnTo = route.params?.returnTo;

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
        <Text style={styles.headerTitle}>Car Loan</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        {/* Verified Badge */}
        <View style={styles.badgeWrapper}>
          <Svg width={80} height={80} viewBox="0 0 80 80">
            <SvgCircle cx="40" cy="40" r="38" fill="#2563EB" />
            <SvgCircle cx="40" cy="40" r="32" fill="none" stroke="#60A5FA" strokeWidth="2" />
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

        <Text style={styles.title}>Application Sent!</Text>
        <Text style={styles.subtitle}>
          Your details have been forwarded to{' '}
          <Text style={styles.highlightBlue}>ICICI Bank</Text>
          {'. We will update your pre-approval status on this page within '}
          <Text style={styles.highlightBlue}>24 hours.</Text>
        </Text>

        {/* What Happens Next */}
        <Text style={styles.sectionTitle}>What Happens Next</Text>
        <View style={styles.stepsCard}>
          {NEXT_STEPS.map((step, i) => (
            <View key={i} style={[styles.stepRow, i < NEXT_STEPS.length - 1 && styles.stepRowBorder]}>
              <View style={styles.stepIconBox}>
                <CheckCircle2 size={20} color="#2563EB" fill="#DBEAFE" />
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <Text style={styles.statusEmoji}>⏳</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>Pre-Approval Pending</Text>
            <Text style={styles.statusSub}>Expected by tomorrow 7 PM</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>24 HRS</Text>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backDealBtn}
          onPress={() => returnTo ? (navigation as any).navigate(returnTo) : navigation.navigate('DealDeliveryDashboard')}
        >
          <Text style={styles.backDealBtnText}>Back to My Deal</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.bottomDash, { marginBottom: insets.bottom + 16 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: '#0F172A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  badgeWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  highlightBlue: {
    fontFamily: 'Outfit-Bold',
    color: '#2563EB',
  },
  sectionTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 12,
  },
  stepsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
  },
  stepRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  stepIconBox: { marginRight: 12, marginTop: 1 },
  stepText: {
    flex: 1,
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
    color: '#0F172A',
    lineHeight: 20,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF94410F',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF944133',
    padding: 14,
    marginBottom: 28,
  },
  statusEmoji: { fontSize: 28, marginRight: 12 },
  statusTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#F97316',
    marginBottom: 2,
  },
  statusSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B' },
  statusBadge: {
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FED7AA',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusBadgeText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 13,
    color: '#F97316',
  },
  backDealBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
  },
  backDealBtnText: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#FFF' },
  bottomDash: {
    width: 134,
    height: 5,
    backgroundColor: '#0F172A',
    borderRadius: 100,
    alignSelf: 'center',
  },
});
