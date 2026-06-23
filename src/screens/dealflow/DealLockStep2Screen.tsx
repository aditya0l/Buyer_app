import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, CheckCircle2, Lock, Landmark, ArrowRight } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const VerifiedBadgeIcon = ({ size = 64 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="#2563EB">
    <Path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <Path d="m9 12 2 2 4-4" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DealLockStep2Screen: React.FC = () => {
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

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Small Hero Card from Top */}
        <View style={styles.heroCardSmall}>
          <View style={styles.heroCardSmallContent}>
            <View style={styles.heroCarImgPlaceholderSmall} />
            <View style={{ flex: 1 }}>
              <Text style={styles.heroCarNameSmall}>Maruti Brezza ZXI+</Text>
              <Text style={styles.heroSubTextSmall}>Petrol • AT • Red</Text>
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

        {/* Big White Container */}
        <View style={styles.whiteBottomSheet}>
          {/* Chassis Verified Badge */}
          <View style={styles.chassisVerifiedContainer}>
            <View style={styles.badgeHalo}>
              <VerifiedBadgeIcon size={48} />
            </View>
            <Text style={styles.chassisVerifiedTitle}>Chassis Verified</Text>
            <Text style={styles.chassisVerifiedSub}>Vehicle confirmed genuine. Last 4 digits revealed below.</Text>
          </View>

          {/* Progress List */}
          <View style={styles.progressContainer}>
            
            {/* Item 1 */}
            <View style={styles.progressItem}>
              <View style={styles.progressIconWrapper}>
                <CheckCircle2 size={20} color="#2563EB" />
                <View style={styles.progressLine} />
              </View>
              <View style={styles.progressTextCol}>
                <Text style={styles.progressTitle}>Bid accepted & locked</Text>
                <Text style={styles.progressSub}>Maruti Brezza ZXI+ • ₹13,18,000 • 3 Perks</Text>
              </View>
            </View>

            {/* Item 2 */}
            <View style={styles.progressItem}>
              <View style={styles.progressIconWrapper}>
                <CheckCircle2 size={20} color="#2563EB" />
                <View style={styles.progressLine} />
              </View>
              <View style={styles.progressTextCol}>
                <Text style={styles.progressTitle}>WhatsApp group being created</Text>
                <Text style={styles.progressSub}>WhatsApp group created! You, dealer & Carbounty added.</Text>
              </View>
            </View>

            {/* Item 3 */}
            <View style={styles.progressItem}>
              <View style={styles.progressIconWrapper}>
                <CheckCircle2 size={20} color="#2563EB" />
                <View style={styles.progressLine} />
              </View>
              <View style={styles.progressTextCol}>
                <Text style={styles.progressTitle}>Dealer uploading chassis number</Text>
                <Text style={styles.progressSub}>Dealer uploaded: MA3FKEB1S004782 + Vehicle Photo.</Text>
              </View>
            </View>

            {/* Item 4 */}
            <View style={styles.progressItem}>
              <View style={styles.progressIconWrapper}>
                <CheckCircle2 size={20} color="#2563EB" />
              </View>
              <View style={styles.progressTextCol}>
                <Text style={styles.progressTitle}>Chassis number verified</Text>
                <Text style={styles.progressSub}>Chassis verified - genuine & untampered.</Text>
              </View>
            </View>
            
            {/* Chassis Number Confirmed Box */}
            <View style={styles.chassisNumberBox}>
              <Text style={styles.chassisBoxLabel}>Chassis Number Confirmed</Text>
              <Text style={styles.chassisBoxValue}>MA3FKEB1S00</Text>
              
              <View style={styles.pinRowStatic}>
                <View style={styles.pinBoxStatic}><Text style={styles.pinTextStatic}>4</Text></View>
                <View style={styles.pinBoxStatic}><Text style={styles.pinTextStatic}>7</Text></View>
                <View style={styles.pinBoxStatic}><Text style={styles.pinTextStatic}>8</Text></View>
                <View style={styles.pinBoxStatic}><Text style={styles.pinTextStatic}>2</Text></View>
              </View>
              
              <Text style={styles.chassisBoxNotice}>Remember these digits - you'll use them to verify your vehicle in the next step.</Text>
            </View>
          </View>

          {/* Token Held Box */}
          <View style={styles.tokenBox}>
            <Text style={styles.tokenEmoji}>🔐</Text>
            <View style={styles.tokenBoxTextCol}>
              <Text style={styles.tokenTitle}>Your ₹499 token is held safely</Text>
              <Text style={styles.tokenSub}>Released only after you confirm delivery by uploading you invoice copy</Text>
            </View>
          </View>

          {/* Loan Box */}
          <TouchableOpacity style={styles.loanBox} onPress={() => navigation.navigate('CarLoanPreApproval', { returnTo: 'DealLockStep2' })}>
            <Text style={styles.loanEmoji}>🏦</Text>
            <View style={styles.loanBoxTextCol}>
              <Text style={styles.loanTitle}>Planning to take a loan ?</Text>
              <Text style={styles.loanSub}>Apply Now - Get pre-approved while your deal sets up</Text>
            </View>
            <View style={styles.loanApplyBtn}>
              <Text style={styles.loanApplyBtnText}>Apply →</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.proceedBtn} onPress={() => navigation.navigate('DealLockStep3')}>
            <Text style={styles.proceedBtnText}>Proceed to Sign Agreement</Text>
          </TouchableOpacity>
          <Text style={styles.proceedSubText}>Both you and the dealer will sign the deal agreement</Text>

        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'transparent' },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  headerTitleContainer: { flex: 1, alignItems: 'center' },
  stepText: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#2563EB' },
  headerTitle: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A' },
  
  progressBarContainer: { height: 4, backgroundColor: '#E2E8F0', width: '100%', marginBottom: 16 },
  progressBarFill: { height: 4, backgroundColor: '#F97316', width: '33%' },

  scrollContent: { paddingBottom: 0 },
  
  heroCardSmall: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'stretch', marginHorizontal: 16, marginBottom: 24, overflow: 'hidden' },
  heroCardSmallContent: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  heroCarImgPlaceholderSmall: { width: 48, height: 36, backgroundColor: '#CBD5E1', borderRadius: 4, marginRight: 12 },
  heroCarNameSmall: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A' },
  heroSubTextSmall: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#2563EB' },
  savingsRowJoined: { flexDirection: 'row' },
  savePillJoined: { flex: 1, backgroundColor: '#207320', paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  savePillTextJoined: { fontFamily: 'Outfit-Medium', fontSize: 14, color: '#FFF' },
  budgetPillJoined: { flex: 1, backgroundColor: '#2073201A', paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  budgetTextJoined: { fontFamily: 'Outfit-Medium', fontSize: 14, color: '#207320' },
  
  whiteBottomSheet: { 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    padding: 20, 
    paddingTop: 32, 
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },

  chassisVerifiedContainer: { alignItems: 'center', marginBottom: 24 },
  badgeHalo: { backgroundColor: '#DBEAFE', padding: 12, borderRadius: 40, marginBottom: 12 },
  chassisVerifiedTitle: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#000', marginBottom: 4 },
  chassisVerifiedSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B' },
  
  progressContainer: { backgroundColor: '#EEF2FF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#DBEAFE', marginBottom: 24 },
  progressItem: { flexDirection: 'row', alignItems: 'flex-start' },
  progressIconWrapper: { alignItems: 'center', width: 20 },
  progressLine: { width: 1, height: 32, backgroundColor: '#3B82F6', marginVertical: 4 },
  progressTextCol: { marginLeft: 12, flex: 1, paddingBottom: 24 },
  progressTitle: { fontFamily: 'Outfit-Medium', fontSize: 14, color: '#0F172A' },
  progressSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', marginTop: 4, lineHeight: 18 },
  
  chassisNumberBox: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginTop: -8, alignItems: 'center' },
  chassisBoxLabel: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B' },
  chassisBoxValue: { fontFamily: 'Outfit-Medium', fontSize: 16, color: '#2563EB', marginTop: 4, marginBottom: 12 },
  pinRowStatic: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
  pinBoxStatic: { width: 40, height: 48, backgroundColor: '#F8FAFC', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', marginHorizontal: 4 },
  pinTextStatic: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A' },
  chassisBoxNotice: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B', textAlign: 'center' },
  
  tokenBox: { flexDirection: 'row', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 16, marginBottom: 16, alignItems: 'center' },
  tokenEmoji: { fontSize: 24, marginRight: 12 },
  tokenBoxTextCol: { flex: 1 },
  tokenTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#2563EB', marginBottom: 4 },
  tokenSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#0F172A', lineHeight: 18 },

  loanBox: { flexDirection: 'row', backgroundColor: '#FF94410F', borderWidth: 1, borderColor: '#FF944133', borderRadius: 12, padding: 16, marginBottom: 24, alignItems: 'center' },
  loanEmoji: { fontSize: 28, marginRight: 12 },
  loanBoxTextCol: { flex: 1, marginRight: 12 },
  loanTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#F97316', marginBottom: 4 },
  loanSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#0F172A', lineHeight: 18 },
  loanApplyBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 24, borderWidth: 1, borderColor: '#F97316', backgroundColor: '#FF94410F' },
  loanApplyBtnText: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#F97316' },

  proceedBtn: { backgroundColor: '#2563EB', borderRadius: 24, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  proceedBtnText: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#FFF' },
  proceedSubText: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', textAlign: 'center' },

});
