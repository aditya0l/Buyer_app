import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, Zap, Check, ShieldCheck } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const DealBookedScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [selectedPayment, setSelectedPayment] = useState<'UPI' | 'NET_BANKING' | 'CARD'>('UPI');

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
          <Text style={styles.stepText}>Step 1 of 5</Text>
          <Text style={styles.headerTitle}>Booked</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: '20%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
           <View style={styles.iconCircle}>
              <Zap size={32} color="#FFF" fill="#FFF" />
           </View>
           <Text style={styles.heroTitle}>Skip the wait. Book right now.</Text>
           <Text style={styles.heroSub}>Pay a refundable ₹10,000 advance to lock this deal instantly. your car is reserved, dealer revealed & notified, and your WhatsApp deal group is created - all in under 2 minutes.</Text>
        </View>

        {/* Comparison Table */}
        <View style={styles.comparisonTable}>
           <View style={styles.compColLight}>
              <View style={styles.compHeaderLightWrapper}>
                 <Text style={styles.compHeaderLight}>Select This Bid</Text>
              </View>
              <View style={styles.compRowLight}><Text style={styles.compRowTextLight}>₹499 token only</Text></View>
              <View style={styles.compRowLight}><Text style={styles.compRowTextLight}>Chassis Verify first</Text></View>
              <View style={styles.compRowLight}><Text style={styles.compRowTextLight}>Sign agreement & then group</Text></View>
              <View style={styles.compRowLight}><Text style={styles.compRowTextLight}>Dealer revealed in group</Text></View>
              <View style={styles.compRowLight}><Text style={styles.compRowTextLight}>Test drive after group</Text></View>
           </View>
           
           <View style={styles.compColBlue}>
              <View style={styles.compHeaderBlueRow}>
                 <Zap size={14} color="#F59E0B" fill="#F59E0B" />
                 <Text style={styles.compHeaderBlue}>Instant Book</Text>
              </View>
              <View style={styles.compRowBlue}>
                 <Check size={14} color="#FFF" style={{marginRight: 6, marginTop: 2}} />
                 <Text style={styles.compRowTextBlue}>₹10,000 advance (Refundable)</Text>
              </View>
              <View style={styles.compRowBlue}>
                 <Check size={14} color="#FFF" style={{marginRight: 6, marginTop: 2}} />
                 <Text style={styles.compRowTextBlue}>Car reserved immediately</Text>
              </View>
              <View style={styles.compRowBlue}>
                 <Check size={14} color="#FFF" style={{marginRight: 6, marginTop: 2}} />
                 <Text style={styles.compRowTextBlue}>Dealer revealed now</Text>
              </View>
              <View style={styles.compRowBlue}>
                 <Check size={14} color="#FFF" style={{marginRight: 6, marginTop: 2}} />
                 <Text style={styles.compRowTextBlue}>Group + agreement fast-tracked</Text>
              </View>
              <View style={styles.compRowBlue}>
                 <Check size={14} color="#FFF" style={{marginRight: 6, marginTop: 2}} />
                 <Text style={styles.compRowTextBlue}>Confirmed in {'<'}2 min</Text>
              </View>
           </View>
        </View>

        <Text style={styles.sectionTitle}>Booking Summary</Text>

        <View style={styles.summaryCard}>
           <View style={styles.summaryContent}>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Car</Text><Text style={styles.summaryValue}>Maruti Brezza ZXI+ AT</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Color</Text><Text style={styles.summaryValue}>Celestial Blue</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>On-Road Price</Text><Text style={styles.summaryValue}>₹13,18,000</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Your Savings</Text><Text style={styles.summaryValueGreen}>-₹42,000 vs Market</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Dealer Rating</Text><Text style={styles.summaryValue}>⭐ 4.8 • 47 deals</Text></View>
           </View>
           <View style={styles.summaryFooter}>
              <View style={{flex: 1}}>
                 <Text style={styles.summaryFooterTitle}>Booking Amount Now</Text>
                 <Text style={styles.summaryFooterSub}>100% refundable if deal doesn't go through</Text>
              </View>
              <Text style={styles.summaryFooterValue}>₹10,000</Text>
           </View>
        </View>

        <Text style={styles.sectionTitle}>Choose Payment Method</Text>

        <TouchableOpacity style={styles.paymentMethodRow} onPress={() => setSelectedPayment('UPI')}>
           <View style={styles.radioOuter}>
              {selectedPayment === 'UPI' && <View style={styles.radioInner} />}
           </View>
           <Text style={{fontSize: 24, marginRight: 12}}>🇮🇳</Text>
           <View style={{flex: 1}}>
              <Text style={styles.paymentMethodTitle}>UPI</Text>
              <Text style={styles.paymentMethodSub}>GPay, PhonePe, Paytm, any UPI</Text>
           </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentMethodRow} onPress={() => setSelectedPayment('NET_BANKING')}>
           <View style={styles.radioOuter}>
              {selectedPayment === 'NET_BANKING' && <View style={styles.radioInner} />}
           </View>
           <Text style={{fontSize: 24, marginRight: 12}}>🏦</Text>
           <View style={{flex: 1}}>
              <Text style={styles.paymentMethodTitle}>Net Banking</Text>
              <Text style={styles.paymentMethodSub}>All major banks supported</Text>
           </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentMethodRow} onPress={() => setSelectedPayment('CARD')}>
           <View style={styles.radioOuter}>
              {selectedPayment === 'CARD' && <View style={styles.radioInner} />}
           </View>
           <Text style={{fontSize: 24, marginRight: 12}}>💳</Text>
           <View style={{flex: 1}}>
              <Text style={styles.paymentMethodTitle}>Debit / Credit Card</Text>
              <Text style={styles.paymentMethodSub}>Visa, Mastercard, Rupay</Text>
           </View>
        </TouchableOpacity>

        {/* Protection Box */}
        <View style={styles.protectionBox}>
           <ShieldCheck size={20} color="#16A34A" style={{marginRight: 12, marginTop: 2}} />
           <View style={{flex: 1}}>
              <Text style={styles.protectionTitle}>Fully Protected</Text>
              <Text style={styles.protectionSub}>Your ₹10,000 is fully refundable if the dealer is unable to deliver, the car is unavailable, or you cancel within 24 hours of booking. Refunds are processed to the original payment method within 24 hours.</Text>
           </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('DealBookingConfirmed')}>
           <Text style={styles.payBtnText}>Pay & Confirm Booking</Text>
        </TouchableOpacity>
        <Text style={styles.razorpayText}>Powered by Razorpay - 256 - bit encrypted</Text>

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
  progressBarFill: { height: '100%', backgroundColor: '#F97316' }, 
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  heroContainer: { alignItems: 'center', marginBottom: 24, marginTop: 12 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#F97316', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A', marginBottom: 8 },
  heroSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', textAlign: 'center', lineHeight: 18, paddingHorizontal: 12 },
  
  comparisonTable: { flexDirection: 'row', backgroundColor: '#EFF6FF', borderRadius: 12, borderWidth: 1, borderColor: '#D9E4FC', padding: 8, marginBottom: 24 },
  compColLight: { flex: 1, paddingRight: 8, paddingTop: 16 },
  compHeaderLightWrapper: { borderBottomWidth: 1, borderBottomColor: '#BFDBFE', paddingBottom: 16, marginBottom: 12, alignItems: 'center' },
  compHeaderLight: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#2563EB' },
  compRowLight: { height: 48, justifyContent: 'center', alignItems: 'center' },
  compRowTextLight: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#0F172A', textAlign: 'center' },
  
  compColBlue: { flex: 1.1, backgroundColor: '#2563EB', borderRadius: 12, padding: 16, paddingBottom: 12 },
  compHeaderBlueRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#60A5FA', paddingBottom: 16, marginBottom: 16 },
  compHeaderBlue: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#F59E0B', marginLeft: 6 },
  compRowBlue: { flexDirection: 'row', alignItems: 'center', height: 48, marginBottom: 0 },
  compRowTextBlue: { flex: 1, fontFamily: 'Outfit-Medium', fontSize: 13, color: '#FFF' },

  sectionTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 12 },
  
  summaryCard: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginBottom: 24 },
  summaryContent: { padding: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B' },
  summaryValue: { fontFamily: 'Outfit-Bold', fontSize: 12, color: '#0F172A' },
  summaryValueGreen: { fontFamily: 'Outfit-Bold', fontSize: 12, color: '#16A34A' },
  summaryFooter: { backgroundColor: '#DBEAFE', padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryFooterTitle: { fontFamily: 'Outfit-Bold', fontSize: 12, color: '#2563EB', marginBottom: 2 },
  summaryFooterSub: { fontFamily: 'Outfit-Medium', fontSize: 10, color: '#1E3A8A' },
  summaryFooterValue: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#2563EB' },
  
  paymentMethodRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#2563EB', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2563EB' },
  paymentMethodTitle: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A', marginBottom: 2 },
  paymentMethodSub: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B' },
  
  protectionBox: { flexDirection: 'row', backgroundColor: '#F0FDF4', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#DCFCE7', marginBottom: 24 },
  protectionTitle: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#16A34A', marginBottom: 4 },
  protectionSub: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B', lineHeight: 16 },
  
  payBtn: { backgroundColor: '#2563EB', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 8 },
  payBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },
  razorpayText: { fontFamily: 'Outfit-Regular', fontSize: 10, color: '#94A3B8', textAlign: 'center', marginBottom: 24 },

  bottomDash: { width: 134, height: 5, backgroundColor: '#0F172A', borderRadius: 100, alignSelf: 'center' }
});
