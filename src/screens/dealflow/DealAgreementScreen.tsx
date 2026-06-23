import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, User, Store } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle as SvgCircle, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const PRICE_ROWS = [
  { label: 'Ex-Showroom Price (Delhi)', value: '₹13,18,900', color: '#0F172A' },
  { label: 'RTO Registration', value: '₹78,000', color: '#0F172A' },
  { label: 'Comprehensive Insurance', value: '₹52,000', color: '#0F172A' },
  { label: 'Hypothecation Charges', value: '₹1,500', color: '#0F172A' },
  { label: 'Dealer Discount (CarBounty Bid)', value: '-₹42,000', color: '#F97316' },
];

const PERKS = [
  '5-year extended warranty (Maruti Authorized · Est. value ₹18,000)',
  'Free accessories kit — seat covers, floor mats, dash cam (Est. value ₹12,000)',
  '3 free services at the dealership (within 36 months from delivery)',
];

const TERMS = [
  'This agreement is legally binding on both parties. Any deviation from agreed price or perks by the dealer must be reported to Carbounty within 24 hours.',
  'The ₹499 token paid by buyer will be fully refunded within 3 working days of booking amount payment at showroom.',
  'Dealer cannot raise the agreed on-road price after this agreement is generated.',
  'Carbounty acts as a neutral facilitator and record keeper. The sale contract is between the buyer and dealer.',
  'If the dealer fails to deliver within the agreed timeline or reneges on perks, Carbounty will reassign the bid to the next-best dealer at no additional cost to the buyer.',
];

const DELIVERY = [
  { label: 'Delivery Timeline', value: '7 working day from booking' },
  { label: 'Delivery Location', value: "Dealer showroom/Buyer's address" },
  { label: 'Booking Amount', value: '₹25,000 (payable at showroom)' },
  { label: 'Price Validity', value: '15 Day from agreement date' },
];

export const DealAgreementScreen = () => {
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
        <Text style={styles.headerTitle}>Deal Agreement</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Agreement Hero Card ── */}
        <View style={styles.agreementHeroCard}>
          <View style={styles.agreementHeroTop}>
            <View style={styles.agreementDocIcon}>
              <Text style={{ fontSize: 28 }}>📋</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.carbountyVerified}>Carbounty Verified</Text>
              <Text style={styles.agreementHeroTitle}>Deal Agreement</Text>
            </View>
          </View>
          <Text style={styles.refText}>
            <Text style={styles.refLabel}>REF: </Text>CBT-2026-05-0042
          </Text>
          <Text style={styles.generatedText}>Generated : May 1, 2026  11:42 PM</Text>
          <View style={styles.activeBadge}>
            <Svg width={16} height={16} viewBox="0 0 16 16" style={{ marginRight: 6 }}>
              <SvgCircle cx="8" cy="8" r="7" fill="#22C55E" />
              <Path d="M4.5 8 L7 10.5 L11.5 5.5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </Svg>
            <Text style={styles.activeBadgeText}>AGREEMENT ACTIVE · TERMS LOCKED</Text>
          </View>
        </View>

        {/* ── Parties Involved ── */}
        <Text style={styles.sectionTitle}>Parties Involved</Text>
        <View style={styles.partiesCard}>
          {/* Buyer */}
          <View style={styles.partyRow}>
            <View style={[styles.partyIconBox, { backgroundColor: '#EFF6FF' }]}>
              <User size={20} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.partyRole}>Buyer</Text>
              <Text style={styles.partyName}>Raaj Oberoi</Text>
              <Text style={styles.partySub}>raaj.2x@email.com · +91 98765 43210 · Delhi NCR</Text>
            </View>
          </View>
          <View style={styles.partyDivider} />
          {/* Dealer */}
          <View style={styles.partyRow}>
            <View style={[styles.partyIconBox, { backgroundColor: '#FFF7ED' }]}>
              <Store size={20} color="#F97316" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.partyRole}>Dealer</Text>
              <Text style={styles.partyName}>Maurya Motors</Text>
              <Text style={styles.partySub}>Identity verified by Carbounty, Noida</Text>
            </View>
          </View>
          <View style={styles.partyDivider} />
          {/* Platform */}
          <View style={styles.partyRow}>
            <View style={[styles.partyIconBox, { backgroundColor: '#F0FDF4' }]}>
              <ShieldCheck size={20} color="#16A34A" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.partyRole}>Platform</Text>
              <Text style={styles.partyName}>Carbounty Technology Pvt. Ltd.</Text>
              <Text style={styles.partySub}>Escrow & Verification Authority</Text>
            </View>
          </View>
        </View>

        {/* ── Vehicle Specification ── */}
        <Text style={styles.sectionTitle}>Vehicle Specification</Text>
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleImgContainer}>
            <Image
              source={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-exterior-right-front-three-quarter.jpeg?isig=0&q=80' }}
              style={styles.vehicleImg}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.vehicleName}>Maruti Suzuki Brezza ZXI+</Text>
          <Text style={styles.vehicleSpec}>Petrol · AT · ₹14L Budget</Text>

          <View style={styles.specGrid}>
            <View style={styles.specCell}>
              <Text style={styles.specLabel}>Color</Text>
              <Text style={styles.specValue}>Opulent Red</Text>
            </View>
            <View style={styles.specCell}>
              <Text style={styles.specLabel}>Transmission</Text>
              <Text style={styles.specValue}>6-Speed Automatic</Text>
            </View>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Chassis No (Verified)</Text>
            <Text style={styles.specValue}>MA3FKEB1S00 · · · · · ·</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Engine No (Sealed)</Text>
            <Text style={styles.specValue}>K15C · · · · · · ·</Text>
          </View>
        </View>

        {/* ── Final Price Commitment ── */}
        <Text style={styles.sectionTitle}>Final Price Commitment</Text>
        <View style={styles.priceCard}>
          {PRICE_ROWS.map((row, i) => (
            <View key={row.label} style={[styles.priceRow, styles.priceRowBorder]}>
              <Text style={styles.priceLabel}>{row.label}</Text>
              <Text style={[styles.priceValue, { color: row.color }]}>{row.value}</Text>
            </View>
          ))}
          {/* Total card inside priceCard */}
          <View style={styles.totalCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.totalLabel}>Total On-Road Price</Text>
              <View style={styles.priceLockPill}>
                <Text style={{ fontSize: 12, marginRight: 4 }}>🔒</Text>
                <Text style={styles.priceLockText}>Price Locked</Text>
              </View>
            </View>
            <Text style={styles.totalValue}>₹13,18,000</Text>
          </View>
        </View>

        {/* ── Agreed Perks ── */}
        <Text style={styles.sectionTitle}>Agreed Perks (Binding)</Text>
        <View style={styles.perksCard}>
          {PERKS.map((perk, i) => (
            <View key={i} style={styles.perkRow}>
              <Svg width={20} height={20} viewBox="0 0 20 20" style={{ marginRight: 10, marginTop: 2 }}>
                <SvgCircle cx="10" cy="10" r="9" fill="#2563EB" />
                <Path d="M6 10 L9 13 L14 7" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </Svg>
              <Text style={styles.perkText}>{perk}</Text>
            </View>
          ))}
        </View>

        {/* ── Delivery Terms ── */}
        <Text style={styles.sectionTitle}>Delivery Terms</Text>
        <View style={styles.deliveryCard}>
          {DELIVERY.map((row, i) => (
            <View key={row.label} style={styles.deliveryRow}>
              <Text style={styles.deliveryLabel}>{row.label}</Text>
              <Text style={styles.deliveryValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* ── Terms & Conditions ── */}
        <Text style={styles.sectionTitle}>Terms & Conditions</Text>
        <View style={styles.termsCard}>
          {TERMS.map((term, i) => (
            <View key={i} style={[styles.termRow, i < TERMS.length - 1 && styles.termRowBorder]}>
              <Svg width={20} height={20} viewBox="0 0 20 20" style={{ marginRight: 10, marginTop: 2, flexShrink: 0 }}>
                <SvgCircle cx="10" cy="10" r="9" fill="#2563EB" />
                <Path d="M6 10 L9 13 L14 7" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </Svg>
              <Text style={styles.termText}>{term}</Text>
            </View>
          ))}
        </View>

        {/* ── Download Notice ── */}
        <View style={styles.downloadCard}>
          <Lock size={20} color="#2563EB" style={{ marginRight: 12, marginTop: 2, flexShrink: 0 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.downloadTitle}>Download available after WhatsApp group creation</Text>
            <Text style={styles.downloadSub}>
              Once you create the WhatsApp group (Step 3), all documents — this agreement, quotation, payment slip, and accessory list — will be available to download from the group screen.
            </Text>
          </View>
        </View>

        {/* ── Back Button ── */}
        <TouchableOpacity style={styles.backAgreementBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={16} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.backAgreementBtnText}>Back to Agreement Signing</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          This document has been auto-generated and digitally signed by Carbounty. Agreement emailed to raaj.2x@email.com · Stored securely on Carbounty servers.
        </Text>

        <View style={styles.bottomDash} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  backBtn: {
    width: 44, height: 44,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'transparent', borderRadius: 8,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  headerTitle: {
    flex: 1, textAlign: 'center',
    fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A',
  },
  scrollContent: { padding: 16, paddingBottom: 40 },
  sectionTitle: {
    fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A',
    marginBottom: 10, marginTop: 4,
  },

  // Agreement Hero Card
  agreementHeroCard: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
  },
  agreementHeroTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  agreementDocIcon: {
    width: 52, height: 52,
    borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  carbountyVerified: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#BFDBFE', marginBottom: 2 },
  agreementHeroTitle: { fontFamily: 'Outfit-Bold', fontSize: 22, color: '#FFF' },
  refText: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#BFDBFE', marginBottom: 4 },
  refLabel: { fontFamily: 'Outfit-Bold', color: '#FFF' },
  generatedText: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#93C5FD', marginBottom: 14 },
  activeBadge: {
    backgroundColor: '#22C55E',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadgeText: { fontFamily: 'Outfit-Bold', fontSize: 12, color: '#FFF', letterSpacing: 0.5 },

  // Parties
  partiesCard: {
    backgroundColor: '#FFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E2E8F0',
    overflow: 'hidden', marginBottom: 20,
  },
  partyRow: { flexDirection: 'row', padding: 14, alignItems: 'flex-start' },
  partyDivider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 14 },
  partyIconBox: {
    width: 42, height: 42, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  partyRole: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#94A3B8', marginBottom: 2 },
  partyName: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 2 },
  partySub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B' },

  // Vehicle
  vehicleCard: {
    backgroundColor: '#FFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E2E8F0',
    overflow: 'hidden', marginBottom: 20, padding: 16,
  },
  vehicleImgContainer: {
    backgroundColor: '#EFF6FF', borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    height: 160, marginBottom: 14, overflow: 'hidden',
  },
  vehicleImg: { width: '85%', height: '100%' },
  vehicleName: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A', marginBottom: 4 },
  vehicleSpec: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#2563EB', marginBottom: 16 },
  specGrid: { flexDirection: 'row', marginBottom: 12 },
  specCell: { flex: 1 },
  specLabel: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#94A3B8', marginBottom: 2 },
  specValue: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A' },
  specRow: { marginBottom: 10 },

  // Price
  priceCard: {
    backgroundColor: '#FFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E2E8F0',
    overflow: 'hidden', marginBottom: 20,
  },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 13 },
  priceRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  priceLabel: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#475569', flex: 1 },
  priceValue: { fontFamily: 'Outfit-Bold', fontSize: 13 },
  totalCard: {
    backgroundColor: '#DBEAFE',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#2563EB', marginBottom: 6 },
  priceLockPill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3,
    alignSelf: 'flex-start',
    borderWidth: 1, borderColor: '#BFDBFE',
  },
  priceLockText: { fontFamily: 'Outfit-Medium', fontSize: 11, color: '#2563EB' },
  totalValue: { fontFamily: 'Outfit-Bold', fontSize: 22, color: '#2563EB' },

  // Perks
  perksCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 1, borderColor: '#BFDBFE',
    overflow: 'hidden', marginBottom: 20, paddingVertical: 8, paddingHorizontal: 4,
  },
  perkRow: { flexDirection: 'row', alignItems: 'flex-start', padding: 8, paddingHorizontal: 12 },
  perkText: { flex: 1, fontFamily: 'Outfit-Regular', fontSize: 14, color: '#64748B', lineHeight: 22 },

  // Delivery
  deliveryCard: {
    backgroundColor: '#FFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E2E8F0',
    overflow: 'hidden', marginBottom: 20, paddingVertical: 8,
  },
  deliveryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  deliveryLabel: { fontFamily: 'Outfit-Regular', fontSize: 14, color: '#64748B', flex: 1 },
  deliveryValue: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', flex: 1.5, textAlign: 'right' },

  // Terms
  termsCard: {
    backgroundColor: '#FFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E2E8F0',
    overflow: 'hidden', marginBottom: 20, padding: 4,
  },
  termRow: { flexDirection: 'row', alignItems: 'flex-start', padding: 12 },
  termRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  termText: { flex: 1, fontFamily: 'Outfit-Regular', fontSize: 13, color: '#0F172A', lineHeight: 20 },

  // Download
  downloadCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12, borderWidth: 1, borderColor: '#BFDBFE',
    padding: 16, flexDirection: 'row',
    alignItems: 'flex-start', marginBottom: 20,
  },
  downloadTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#2563EB', marginBottom: 6, lineHeight: 20 },
  downloadSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#475569', lineHeight: 18 },

  // Buttons
  backAgreementBtn: {
    backgroundColor: '#2563EB', borderRadius: 28,
    paddingVertical: 15, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
  },
  backAgreementBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },
  footerNote: {
    fontFamily: 'Outfit-Regular', fontSize: 11,
    color: '#94A3B8', textAlign: 'center', lineHeight: 16, marginBottom: 24,
  },
  bottomDash: {
    width: 134, height: 5,
    backgroundColor: '#0F172A', borderRadius: 100, alignSelf: 'center',
  },
});
