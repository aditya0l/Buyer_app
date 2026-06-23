import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap } from 'lucide-react-native';
import Svg, { Path, Rect, Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BadgeLockIcon = ({ size = 64 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="#2563EB">
    <Path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <G transform="translate(12, 11.5) scale(0.8) translate(-12, -11.5)">
      <Rect x="8" y="11" width="8" height="6" rx="1" fill="#F59E0B" />
      <Path d="M9 11V8a3 3 0 0 1 6 0v3" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
      <Circle cx="12" cy="13.5" r="1" fill="#1F2937" />
      <Path d="M11.5 13.5h1v2h-1z" fill="#1F2937" />
    </G>
  </Svg>
);

const VerifiedBadgeIcon = ({ size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="#2563EB">
    <Path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <Path d="m9 12 2 2 4-4" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const DealLockStep1Screen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" />
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
            <Stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="25%" fill="url(#bgGrad)" />
      </Svg>
      
      <View style={{ height: insets.top }} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stepText}>Step 2 of 6</Text>
          <Text style={styles.headerTitle}>Group & Chassis</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Deal Lock Badge */}
        <View style={styles.badgeContainer}>
           <BadgeLockIcon size={100} />
           <Text style={[styles.dealLockText, { marginTop: 12 }]}>Deal Lock!</Text>
           <Text style={styles.dealLockSub}>You got the best price!</Text>
        </View>

        {/* Compressed Hero Card */}
        <View style={styles.heroCard}>
           <View style={styles.heroContent}>
              <View style={styles.heroCarImgPlaceholder} />
              <View>
                <Text style={styles.heroCarName}>Maruti Brezza ZXI+</Text>
                <Text style={styles.heroSubText}>Petrol • AT • Red</Text>
              </View>
           </View>
           <View style={styles.savingsRowJoined}>
              <View style={styles.savePillJoined}>
                <Text style={styles.savePillTextJoined}>💰 You Save ₹42,000</Text>
              </View>
              <View style={styles.budgetPillJoined}>
                <Text style={styles.budgetTextJoined}>Your Budget ₹14L</Text>
              </View>
           </View>
        </View>

        {/* Loader Status */}
        <View style={styles.loaderStatusContainer}>
          <View style={styles.statusRow}>
             <VerifiedBadgeIcon size={20} />
             <Text style={styles.statusSuccess}>Step 1 Completed Successfully</Text>
          </View>
          <Text style={styles.statusDesc}>
            Complete Steps 2-6 to verify your vehicle, join the delivery group, and track delivery updates.
          </Text>

          <View style={styles.uploadBox}>
             <Text style={styles.uploadTitle}>Dealer is uploading chassis details</Text>
             <Text style={styles.uploadSub}>Dealer will upload the masked chassis number & vehicle photo. Carbounty admin verifies it is genuine. You then enter the chassis PIN to confirm identity — after which your WhatsApp group is created.</Text>
             
             <View style={styles.spinnerRow}>
                <View style={styles.spinnerCircle} />
                <Text style={styles.spinnerText}>Tap below to follow along - auto-processing</Text>
             </View>
          </View>
        </View>

        {/* Deal Summary Table */}
        <Text style={styles.sectionTitle}>Deal Summary</Text>
        <View style={styles.table}>
          <View style={styles.tableInner}>
            <View style={styles.tableRow}><Text style={styles.tLabel}>Car</Text><Text style={styles.tValueBold}>Maruti Brezza ZXI+ AT</Text></View>
            <View style={styles.tableRow}><Text style={styles.tLabel}>Color</Text><Text style={styles.tValueBold}>Dark Red</Text></View>
            <View style={styles.tableRow}><Text style={styles.tLabel}>Fuel / Transmission</Text><Text style={styles.tValueBold}>Petrol, Automatic</Text></View>
            <View style={styles.tableDivider} />
            <View style={styles.tableRow}><Text style={styles.tLabel}>Ex-Showroom</Text><Text style={styles.tValueBold}>₹13,18,900</Text></View>
            <View style={styles.tableRow}><Text style={styles.tLabel}>Registration (RTO)</Text><Text style={styles.tValueBold}>₹78,000</Text></View>
            <View style={styles.tableRow}><Text style={styles.tLabel}>Insurance</Text><Text style={styles.tValueBold}>₹52,000</Text></View>
            <View style={styles.tableRow}><Text style={styles.tLabel}>Dealer Discount</Text><Text style={styles.tValueGreen}>-₹42,000</Text></View>
          </View>
          
          <View style={styles.tableTotalRow}>
            <Text style={styles.tTotalLabel}>On-Road Price Paid</Text>
            <Text style={styles.tTotalValue}>₹13,18,000</Text>
          </View>
        </View>

        {/* Perks */}
        <Text style={styles.sectionTitle}>Perks You Get</Text>
        <View style={styles.perksCard}>
          <View style={styles.perkListItem}><View style={styles.perkDot}/><Text style={styles.perkText}>Free test drive - schedule after WhatsApp group is created</Text></View>
          <View style={styles.perkListItem}><View style={styles.perkDot}/><Text style={styles.perkText}>5-year extended warranty (₹18,000 Value)</Text></View>
          <View style={styles.perkListItem}><View style={styles.perkDot}/><Text style={styles.perkText}>Free accessories kit -- mats, covers, camera</Text></View>
          <View style={styles.perkListItem}><View style={styles.perkDot}/><Text style={styles.perkText}>3 free services at dealership</Text></View>
        </View>

        {/* Token Deposited */}
        <View style={styles.tokenBox}>
          <View style={styles.tokenRow}>
             <Text style={styles.tokenLabel}>Token Deposited</Text>
             <Text style={styles.tokenValue}>₹499 - Held in Escrow</Text>
          </View>
          <View style={styles.tokenNoticeRow}>
             <Text style={styles.tokenNotice}>Refunded Within 24 hrs after you upload your invoice copy confirming delivery</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.deliveryRow}>
             <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
             <Text style={styles.deliveryValue}>7 Working Days</Text>
          </View>
        </View>

        {/* Finance Box */}
        <View style={styles.financeBox}>
           <View style={styles.financeTextCol}>
             <Text style={styles.financeTitle}>Want to finance this car?</Text>
             <Text style={styles.financeSub}>Apply early - pre-approval from SBI, HDFC, ICICI in 24 hrs</Text>
           </View>
           <TouchableOpacity style={styles.applyBtn}>
             <Text style={styles.applyBtnText}>Apply →</Text>
           </TouchableOpacity>
        </View>

        {/* Bottom checklist */}
        <View style={styles.checklistBottom}>
          <View style={styles.checkItem}><CheckCircle2 size={14} color="#2563EB" /><Text style={styles.checkText}>Dealer Uploads Chassis number</Text></View>
          <View style={styles.checkItem}><CheckCircle2 size={14} color="#2563EB" /><Text style={styles.checkText}>WhatsApp Group Created</Text></View>
          <View style={styles.checkItem}><CheckCircle2 size={14} color="#2563EB" /><Text style={styles.checkText}>Last 4 Digits Revealed To You</Text></View>
        </View>

        {/* Buttons */}
        <TouchableOpacity 
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('DealLockStep2')}
        >
          <Text style={styles.primaryBtnText}>Group & Chassis Verification</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.secondaryBtnText}>Back To Home</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0', backgroundColor: '#FFF' },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitleContainer: { flex: 1, alignItems: 'center' },
  stepText: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#2563EB' },
  headerTitle: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#0F172A' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  badgeContainer: { alignItems: 'center', marginBottom: 20 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  dealLockText: { fontFamily: 'Outfit-Bold', fontSize: 24, color: '#2563EB' },
  dealLockSub: { fontFamily: 'Outfit-Medium', fontSize: 14, color: '#64748B' },
  
  heroCard: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  heroContent: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingBottom: 12 },
  heroCarImgPlaceholder: { width: 60, height: 40, backgroundColor: '#CBD5E1', borderRadius: 6, marginRight: 12 },
  heroCarName: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A' },
  heroSubText: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B' },
  savingsRowJoined: { flexDirection: 'row' },
  savePillJoined: { flex: 1, backgroundColor: '#207320', paddingVertical: 10, alignItems: 'center', justifyContent: 'center' },
  savePillTextJoined: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#FFF' },
  budgetPillJoined: { flex: 1, backgroundColor: '#2073201A', paddingVertical: 10, alignItems: 'center', justifyContent: 'center' },
  budgetTextJoined: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#207320' },
  
  loaderStatusContainer: { marginBottom: 24 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  statusSuccess: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#2563EB', marginLeft: 6 },
  statusDesc: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', marginBottom: 12, lineHeight: 18 },
  uploadBox: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#2563EB33', borderRadius: 12, padding: 16 },
  uploadTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 4 },
  uploadSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', marginBottom: 12 },
  spinnerRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF94410F', padding: 10, borderRadius: 8 },
  spinnerCircle: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#FF9441', borderTopColor: 'transparent', marginRight: 8 },
  spinnerText: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#FF9441' },
  
  sectionTitle: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#0F172A', marginBottom: 12 },
  table: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  tableInner: { padding: 16, paddingBottom: 12 },
  tableDivider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  tLabel: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B' },
  tValueBold: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A' },
  tValueGreen: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#207320' },
  tableTotalRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#2073201A', padding: 16 },
  tTotalLabel: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#207320' },
  tTotalValue: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#207320' },
  
  perksCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  perkListItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  perkDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#3B82F6', marginTop: 6, marginRight: 8 },
  perkText: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#334155', flex: 1 },
  
  tokenBox: { backgroundColor: '#2563EB0A', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 16, marginTop: 16, marginBottom: 20 },
  tokenRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tokenLabel: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#0F172A' },
  tokenValue: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#EA580C' },
  tokenNoticeRow: { flexDirection: 'row', alignItems: 'flex-start' },
  tokenNotice: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B', flex: 1, marginLeft: 4 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  deliveryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  deliveryLabel: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#3B82F6' },
  deliveryValue: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#3B82F6' },
  
  financeBox: { flexDirection: 'row', backgroundColor: '#FF94410F', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 24 },
  financeTextCol: { flex: 1, marginRight: 12 },
  financeTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#FF9441', marginBottom: 4 },
  financeSub: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#9A3412' },
  applyBtn: { backgroundColor: 'transparent', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#FF9441' },
  applyBtnText: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#FF9441' },
  
  checklistBottom: { marginBottom: 24 },
  checkItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  checkText: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#334155', marginLeft: 6 },
  
  primaryBtn: { backgroundColor: '#2563EB', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },
  secondaryBtn: { backgroundColor: '#DADADA', borderRadius: 24, paddingVertical: 14, alignItems: 'center' },
  secondaryBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A' },
});
