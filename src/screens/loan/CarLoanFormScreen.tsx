import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Image, TextInput
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const BANKS = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    detail: 'From 8.65% P.a. – Up to 7 yrs · Govt. Bank',
    emoji: '🏛️',
    color: '#1E40AF',
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    detail: 'From 8.75% P.a. – Fast disbursal – 48 hr docs',
    emoji: '🔴',
    color: '#DC2626',
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    detail: 'From 8.85% P.a. – Online process · EMI calculator',
    emoji: '🟠',
    color: '#EA580C',
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    detail: 'From 8.85% P.a. · Flexible tenure',
    emoji: '🔵',
    color: '#DC2626',
  },
];

export const CarLoanFormScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackParamList, any>>();
  const returnTo = route.params?.returnTo;
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [employmentType, setEmploymentType] = useState<'Salaried' | 'Self-Employed'>('Salaried');
  const [name, setName] = useState('Raaj Oberoi');
  const [mobile, setMobile] = useState('+91-74250 XXXXX');
  const [income, setIncome] = useState('₹10L - ₹20L');
  const [loanAmount, setLoanAmount] = useState('10,50,000');

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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Car Summary Card */}
        <View style={styles.carCard}>
          <Image
            source={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-exterior-right-front-three-quarter.jpeg?isig=0&q=80' }}
            style={styles.carImg}
            resizeMode="contain"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.carName}>Maruti Brezza ZXI+</Text>
            <Text style={styles.carOnRoad}>On-Road ₹13,18,000</Text>
            <View style={styles.loanEstimatePill}>
              <Text style={styles.loanEstimateText}>Loan Estimate ₹10,50,000</Text>
            </View>
          </View>
        </View>

        {/* Choose Bank */}
        <Text style={styles.sectionTitle}>Choose Your Bank</Text>
        <View style={styles.banksCard}>
          {BANKS.map((bank, i) => (
            <TouchableOpacity
              key={bank.id}
              style={[styles.bankRow, i < BANKS.length - 1 && styles.bankRowBorder]}
              onPress={() => setSelectedBank(bank.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.radioOuter, selectedBank === bank.id && styles.radioSelected]}>
                {selectedBank === bank.id && <View style={styles.radioInner} />}
              </View>
              <View style={[styles.bankIconCircle, { borderColor: bank.color + '44' }]}>
                <Text style={{ fontSize: 18 }}>{bank.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bankName}>{bank.name}</Text>
                <Text style={styles.bankDetail}>{bank.detail}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Basic Details */}
        <Text style={styles.sectionTitle}>Basic Details</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name (as per PAN)</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#94A3B8"          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Annual Income (approx.)</Text>
          <TouchableOpacity style={styles.selectRow}>
            <Text style={styles.selectText}>{income}</Text>
            <ChevronDown size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Employment Type</Text>
          <View style={styles.toggleRow}>
            {(['Salaried', 'Self-Employed'] as const).map(type => (
              <TouchableOpacity
                key={type}
                style={[styles.toggleOption, employmentType === type && styles.toggleOptionActive]}
                onPress={() => setEmploymentType(type)}
              >
                <Text style={[styles.toggleText, employmentType === type && styles.toggleTextActive]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Loan Amount Needed</Text>
          <TextInput
            style={styles.input}
            value={loanAmount}
            onChangeText={setLoanAmount}
            keyboardType="numeric"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <Text style={styles.disclaimer}>
          By submitting, you authorise Carbounty to share these details with the selected bank for pre-approval purposes only
        </Text>

        <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate('CarLoanPending', { returnTo })}>
          <Text style={styles.submitBtnText}>Submit Application</Text>
        </TouchableOpacity>

        <View style={styles.bottomDash} />
      </ScrollView>
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
  scrollContent: { padding: 16, paddingBottom: 40 },

  // Car card
  carCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: 12,
    marginBottom: 20,
  },
  carImg: { width: 80, height: 52, marginRight: 12, borderRadius: 6 },
  carName: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 2 },
  carOnRoad: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#2563EB', marginBottom: 6 },
  loanEstimatePill: {
    backgroundColor: '#2563EB',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  loanEstimateText: { fontFamily: 'Outfit-Bold', fontSize: 11, color: '#FFF' },

  // Section title
  sectionTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 12,
  },

  // Banks
  banksCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 20,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  bankRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioSelected: { borderColor: '#2563EB' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2563EB' },
  bankIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bankName: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A', marginBottom: 2 },
  bankDetail: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B' },

  // Form
  formGroup: { marginBottom: 16 },
  label: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#0F172A', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#FFF',
  },
  selectRow: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  selectText: { fontFamily: 'Outfit-Regular', fontSize: 14, color: '#0F172A' },
  toggleRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  toggleOptionActive: { backgroundColor: '#2563EB' },
  toggleText: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#64748B' },
  toggleTextActive: { color: '#FFF' },

  disclaimer: {
    fontFamily: 'Outfit-Regular',
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitBtnText: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#FFF' },
  bottomDash: {
    width: 134,
    height: 5,
    backgroundColor: '#0F172A',
    borderRadius: 100,
    alignSelf: 'center',
  },
});
