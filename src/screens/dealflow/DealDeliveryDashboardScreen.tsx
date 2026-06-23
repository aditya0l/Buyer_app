import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, ChevronRight, Check, MapPin, CreditCard, MessageSquare, Phone, FileText, Search, Car, Lock, ShieldCheck, DownloadCloud } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const DealDeliveryDashboardScreen = () => {
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
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft color="#0F172A" size={24} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stepText}>Step 4 of 6</Text>
          <Text style={styles.headerTitle}>Join Group</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: '66%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.carCard}>
          {/* Top Right Cutout Pill */}
          <View style={styles.inProgressPill}>
             <Text style={styles.inProgressText}>In Progress</Text>
          </View>

          <View style={styles.carTopRow}>
            <Image 
              source={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/123185/grand-vitara-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80' }} 
              style={styles.carImg}
              resizeMode="contain"
            />
            <View style={styles.carInfo}>
              <Text style={styles.carTitle}>Maruti Brezza ZXI+</Text>
              <Text style={styles.carSub}>Petrol • Opulent Red • 2026</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: '#2563EB' }]}>
               <Text style={[styles.statValue, { color: '#FFF' }]}>₹13,18,000</Text>
               <Text style={[styles.statLabel, { color: '#FFF', opacity: 0.8 }]}>Locked Price</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#2073201A', borderWidth: 1, borderColor: '#2073204D' }]}>
               <Text style={[styles.statValue, { color: '#207320' }]}>₹42,000</Text>
               <Text style={[styles.statLabel, { color: '#207320' }]}>Your Savings</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#2563EB1A', borderWidth: 1, borderColor: '#2563EB66' }]}>
               <Text style={[styles.statValue, { color: '#1E3A8A' }]}>~7 Day</Text>
               <Text style={[styles.statLabel, { color: '#1E3A8A' }]}>Est. Delivery</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Maurya Motors</Text>
        
        {/* Actions List */}
        <TouchableOpacity 
           style={[styles.actionItemRow, { backgroundColor: '#2073201A', borderColor: '#2073204D' }]}
           onPress={() => navigation.navigate('DealBooked')}
        >
           <View style={[styles.actionIconBox, { backgroundColor: '#DCFCE7' }]}>
              <CreditCard size={20} color="#207320" />
           </View>
           <View style={styles.actionTextCol}>
              <Text style={styles.actionItemTitle}>Pay Booking Amount</Text>
              <Text style={styles.actionItemSub}>₹25,000 at showroom • Locks the deal officially</Text>
           </View>
           <ChevronRight size={20} color="#94A3B8" />
        </TouchableOpacity>

        <View style={[styles.actionItemRow, { backgroundColor: '#2563EB1A', borderColor: '#2563EB66' }]}>
           <View style={[styles.actionIconBox, { backgroundColor: '#DBEAFE' }]}>
              <MapPin size={20} color="#2563EB" />
           </View>
           <View style={styles.actionTextCol}>
              <Text style={styles.actionItemTitle}>Visit Showroom</Text>
              <Text style={styles.actionItemSub}>Plot 18, Sector 18, Noida • ~14 Km away</Text>
           </View>
           <ChevronRight size={20} color="#94A3B8" />
        </View>

        <TouchableOpacity style={[styles.actionItemRow, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]} onPress={() => navigation.navigate('CarLoanPreApproval', { returnTo: 'DealDeliveryDashboard' })}>
           <View style={[styles.actionIconBox, { backgroundColor: '#FF94410F' }]}>
              <FileText size={20} color="#F97316" />
           </View>
           <View style={styles.actionTextCol}>
              <Text style={styles.actionItemTitle}>Apply for Car Loan</Text>
              <Text style={styles.actionItemSub}>SBI, HDFC, ICICI • Pre-approval in 24 hrs - Zero paperwork</Text>
           </View>
           <ChevronRight size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Delivery Timeline */}
        <View style={styles.timelineCard}>
           <View style={styles.timelineHeader}>
              <Text style={styles.timelineHeaderTitle}>Delivery Timeline</Text>
              <Text style={styles.timelineHeaderSub}>Estimated : May 12, 2026</Text>
           </View>
           <View style={styles.timelineBody}>
              {/* Step 1 */}
              <View style={styles.timelineStep}>
                 <View style={styles.timelineIconContainer}>
                    <View style={styles.timelineCheckCircle}>
                       <Check size={14} color="#207320" />
                    </View>
                    <View style={styles.timelineLineGreen} />
                 </View>
                 <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitleCompleted}>PDI Complete <Check size={14} color="#207320" /></Text>
                    <Text style={styles.timelineSub}>Vehicle inspected • Grade A • May 4, 2026</Text>
                 </View>
              </View>
              
              {/* Step 2 */}
              <View style={styles.timelineStep}>
                 <View style={styles.timelineIconContainer}>
                    <View style={styles.timelineCurrentCircle}>
                       <Text style={styles.timelineCurrentNum}>2</Text>
                    </View>
                    <View style={styles.timelineLineGrey} />
                 </View>
                 <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitleCurrent}>Pay Booking Amount <Text style={{color: '#0F172A'}}>← Next</Text></Text>
                    <Text style={styles.timelineSub}>₹25,000 at showroom</Text>
                 </View>
              </View>

              {/* Step 3 */}
              <View style={styles.timelineStep}>
                 <View style={styles.timelineIconContainer}>
                    <View style={styles.timelineFutureCircle}>
                       <Text style={styles.timelineFutureNum}>3</Text>
                    </View>
                    <View style={styles.timelineLineGrey} />
                 </View>
                 <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitleFuture}>Documentation & Finance</Text>
                    <Text style={styles.timelineSub}>RTO • Insurance • 5-7 days</Text>
                 </View>
              </View>

              {/* Step 4 */}
              <View style={styles.timelineStepLast}>
                 <View style={styles.timelineIconContainer}>
                    <View style={styles.timelineFutureCircle}>
                       <Car size={14} color="#94A3B8" />
                    </View>
                 </View>
                 <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitleFuture}>Confirm Delivery & Claim Rewards</Text>
                    <Text style={styles.timelineSub}>Est. May 12-15 • Upload invoice to unlock</Text>
                    
                    <View style={styles.timelineRewardsRow}>
                       <View style={[styles.rewardPill, {backgroundColor: '#2073201A', borderColor: '#2073204D'}]}><Text style={[styles.rewardPillText, {color: '#207320'}]}>₹499 Token Refund</Text></View>
                       <View style={[styles.rewardPill, {backgroundColor: '#F973161A', borderColor: '#F973164D'}]}><Text style={[styles.rewardPillText, {color: '#D97706'}]}>🎁 Welcome Voucher</Text></View>
                    </View>
                    <View style={[styles.rewardPill, {backgroundColor: '#2563EB1A', borderColor: '#2563EB4D', alignSelf: 'flex-start', marginTop: 8}]}><Text style={[styles.rewardPillText, {color: '#1D4ED8'}]}>⭐ Rate & Review</Text></View>

                    <TouchableOpacity style={styles.confirmDeliveryBtn} onPress={() => navigation.navigate('DealConfirmDelivery')}>
                       <DownloadCloud size={16} color="#FFF" style={{marginRight: 6}} />
                       <Text style={styles.confirmDeliveryBtnText}>Confirm Delivery</Text>
                    </TouchableOpacity>
                 </View>
              </View>
           </View>
        </View>

        <Text style={[styles.sectionTitle, { fontSize: 13, marginBottom: 12 }]}>Quick Actions</Text>
        
        <View style={styles.quickActionsGrid}>
           <TouchableOpacity style={[styles.quickActionBox, { backgroundColor: '#2563EB1A', borderColor: '#2563EB4D' }]}>
              <View style={[styles.qaIconWrapper, { backgroundColor: '#DBEAFE' }]}><MessageSquare size={16} color="#2563EB" /></View>
              <Text style={styles.qaTitle}>Message Dealer</Text>
              <Text style={styles.qaSub}>Ask about docs, accessories</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.quickActionBox, { backgroundColor: '#2563EB1A', borderColor: '#2563EB4D' }]}>
              <View style={[styles.qaIconWrapper, { backgroundColor: '#DCFCE7' }]}><Phone size={16} color="#16A34A" /></View>
              <Text style={styles.qaTitle}>WhatsApp Group</Text>
              <Text style={styles.qaSub}>View deal documents</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.quickActionBox, { backgroundColor: '#2563EB1A', borderColor: '#2563EB4D' }]} onPress={() => navigation.navigate('DealAgreement')}>
              <View style={[styles.qaIconWrapper, { backgroundColor: '#FEF9C3' }]}><FileText size={16} color="#CA8A04" /></View>
              <Text style={styles.qaTitle}>View Agreement</Text>
              <Text style={styles.qaSub}>Signed deal terms</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.quickActionBox, { backgroundColor: '#2563EB1A', borderColor: '#2563EB4D' }]}>
              <View style={[styles.qaIconWrapper, { backgroundColor: '#F1F5F9' }]}><Search size={16} color="#475569" /></View>
              <Text style={styles.qaTitle}>PDI Report</Text>
              <Text style={styles.qaSub}>Grade A - All checks passed</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.quickActionBox, { backgroundColor: '#F973161A', borderColor: '#F973164D' }]}>
              <View style={[styles.qaIconWrapper, { backgroundColor: '#FF94410F' }]}><Car size={16} color="#F59E0B" /></View>
              <Text style={[styles.qaTitle, {color: '#D97706'}]}>Got your car ?</Text>
              <Text style={styles.qaSub}>Upload invoice ₹499 back</Text>
           </TouchableOpacity>
        </View>

        {/* Info Cards */}
        <View style={[styles.infoCard, { backgroundColor: '#2563EB1A', borderColor: '#2563EB66' }]}>
           <Lock size={20} color="#D97706" style={{marginRight: 12, marginTop: 2}} />
           <View style={{flex: 1}}>
              <Text style={styles.infoCardTitle}>₹499 token in Escrow</Text>
              <Text style={styles.infoCardSub}>Your token is held safely. Once you receive the car, upload the invoice copy in the app to trigger the refund - released within 24 hours.</Text>
           </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: '#2563EB1A', borderColor: '#2563EB66' }]}>
           <ShieldCheck size={20} color="#D97706" style={{marginRight: 12, marginTop: 2}} />
           <View style={{flex: 1}}>
              <Text style={styles.infoCardTitle}>Carbounty is watching</Text>
              <Text style={styles.infoCardSub}>If the dealer deviates from any agreed term - price, perks, or delivery date - report it in the WhatsApp group. We will intervene immediately.</Text>
           </View>
        </View>
        
        <View style={styles.bottomDash} />

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
  progressBarBg: { height: 4, backgroundColor: '#F1F5F9', width: '100%' },
  progressBarFill: { height: '100%', backgroundColor: '#F97316' }, // Orange fill
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  carCard: { backgroundColor: '#D9E2FC', borderRadius: 10, padding: 16, borderWidth: 1, borderColor: '#C2D2F9', marginBottom: 20 },
  carTopRow: { flexDirection: 'row', marginBottom: 16, paddingRight: 90 },
  carImg: { width: 80, height: 45, marginRight: 12 },
  carInfo: { flex: 1, justifyContent: 'center' },
  carTitle: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A' },
  carSub: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#2563EB' },
  inProgressPill: { position: 'absolute', top: -1, right: -1, width: 110.6, height: 34, backgroundColor: '#2073201A', borderTopLeftRadius: 16, borderBottomLeftRadius: 32, borderTopRightRadius: 10, borderBottomWidth: 1, borderLeftWidth: 1, borderColor: '#2073204D', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  inProgressText: { fontFamily: 'Outfit-Bold', fontSize: 11, color: '#207320' },
  
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { flex: 1, borderRadius: 8, padding: 8, marginHorizontal: 4, alignItems: 'center' },
  statValue: { fontFamily: 'Outfit-Bold', fontSize: 13, marginBottom: 2 },
  statLabel: { fontFamily: 'Outfit-Medium', fontSize: 10 },
  
  sectionTitle: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#0F172A', marginBottom: 16 },
  
  actionItemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  actionIconBox: { width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  actionTextCol: { flex: 1 },
  actionItemTitle: { fontFamily: 'Outfit-Medium', fontSize: 14, color: '#0F172A', marginBottom: 2 },
  actionItemSub: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B' },
  
  timelineCard: { backgroundColor: '#2563EB1A', borderRadius: 12, borderWidth: 1, borderColor: '#2563EB1A', overflow: 'hidden', marginBottom: 24, marginTop: 8 },
  timelineHeader: { backgroundColor: '#2563EB', padding: 16 },
  timelineHeaderTitle: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF', marginBottom: 4 },
  timelineHeaderSub: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#FFF', opacity: 0.8 },
  timelineBody: { padding: 16 },
  
  timelineStep: { flexDirection: 'row', marginBottom: 0 },
  timelineStepLast: { flexDirection: 'row', marginBottom: 0 },
  timelineIconContainer: { alignItems: 'center', width: 24, marginRight: 12 },
  timelineCheckCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#207320', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCFCE7' },
  timelineLineGreen: { width: 2, height: 32, backgroundColor: '#207320', marginVertical: 4 },
  timelineCurrentCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#207320', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  timelineCurrentNum: { fontFamily: 'Outfit-Bold', fontSize: 12, color: '#207320' },
  timelineLineGrey: { width: 2, height: 32, backgroundColor: '#E2E8F0', marginVertical: 4 },
  timelineFutureCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#94A3B8', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  timelineFutureNum: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#94A3B8' },
  
  timelineContent: { flex: 1, paddingBottom: 24 },
  timelineTitleCompleted: { fontFamily: 'Outfit-Medium', fontSize: 14, color: '#0F172A', marginBottom: 4 },
  timelineTitleCurrent: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 4 },
  timelineTitleFuture: { fontFamily: 'Outfit-Medium', fontSize: 14, color: '#64748B', marginBottom: 4 },
  timelineSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B' },
  
  timelineRewardsRow: { flexDirection: 'row', marginTop: 12 },
  rewardPill: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, marginRight: 8 },
  rewardPillText: { fontFamily: 'Outfit-Medium', fontSize: 10 },
  
  confirmDeliveryBtn: { backgroundColor: '#2563EB', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, marginTop: 16 },
  confirmDeliveryBtnText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#FFF' },

  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  quickActionBox: { width: '48%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  qaIconWrapper: { width: 28, height: 28, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  qaTitle: { fontFamily: 'Outfit-Bold', fontSize: 12, color: '#0F172A', marginBottom: 4 },
  qaSub: { fontFamily: 'Outfit-Regular', fontSize: 10, color: '#64748B' },
  
  infoCard: { flexDirection: 'row', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  infoCardTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 4 },
  infoCardSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', lineHeight: 18 },
  
  bottomDash: { width: 134, height: 5, backgroundColor: '#0F172A', borderRadius: 100, alignSelf: 'center', marginTop: 24 }
});
