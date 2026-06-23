import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, CloudUpload, FileText, CheckCircle, Gift, Star, Award } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const DealConfirmDeliveryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [isUploaded, setIsUploaded] = useState(false);

  const toggleUpload = () => {
     setIsUploaded(true);
  };

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
          <Text style={styles.stepText}>Step 5 of 6</Text>
          <Text style={styles.headerTitle}>Confirm Delivery</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: '83%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
           <View style={styles.carHalfCircleBg} />
           <Image 
             source={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/123185/grand-vitara-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80' }} 
             style={styles.heroCarImg}
             resizeMode="contain"
           />
           <Text style={styles.heroTitle}>Got your car ?</Text>
           <Text style={styles.heroSub}>Upload your invoice copy to confirm purchase and release your ₹499 token refund</Text>
        </View>

        {/* Car Details row */}
        <View style={styles.carDetailsBox}>
           <View style={styles.carDetailRow}><Text style={styles.carDetailLabel}>Car</Text><Text style={styles.carDetailValue}>Maruti Brezza ZXI+ AT</Text></View>
           <View style={styles.carDetailRow}><Text style={styles.carDetailLabel}>Dealer</Text><Text style={styles.carDetailValue}>Maurya Motors</Text></View>
           <View style={[styles.carDetailRow, {marginBottom: 0}]}><Text style={styles.carDetailLabel}>On-Road Price</Text><Text style={styles.carDetailValueGreen}>₹13,18,000</Text></View>
        </View>

        {/* Upload Box */}
        <TouchableOpacity 
           style={[styles.uploadBox, isUploaded && styles.uploadBoxSuccess]} 
           onPress={toggleUpload}
           disabled={isUploaded}
        >
           {isUploaded ? (
              <>
                 <View style={[styles.pdfIconContainer, { backgroundColor: '#FEE2E2' }]}>
                    <FileText size={32} color="#EF4444" />
                 </View>
                 <Text style={styles.uploadTitle}>Invoice Uploaded!</Text>
                 <Text style={styles.uploadSub}>Maruti_Brezza_invoice.pdf • 1.2 MB</Text>
                 <Text style={styles.uploadLinks}>Invoice Copy • RC Copy • Delivery Challan</Text>
              </>
           ) : (
              <>
                 <CloudUpload size={40} color="#2563EB" style={{marginBottom: 12}} />
                 <Text style={styles.uploadTitle}>Tap to Upload Invoice</Text>
                 <Text style={styles.uploadSub}>PDF, JPG or PNG • Max 10 MB</Text>
                 <Text style={styles.uploadLinks}>Invoice Copy • RC Copy • Delivery Challan</Text>
              </>
           )}
        </TouchableOpacity>

        <Text style={styles.unlockTitle}>Unlock on Confirming Delivery</Text>

        {/* Rewards List */}
        <View style={styles.rewardRow}>
           <View style={[styles.rewardIconBg, {backgroundColor: '#2073201A'}]}><CheckCircle size={16} color="#207320" /></View>
           <View style={{flex: 1}}>
              <Text style={styles.rewardRowTitle}>₹499 token refunded within 24 hours</Text>
              <Text style={styles.rewardRowSub}>Straight to your original payment method • No questions asked</Text>
           </View>
        </View>

        <View style={styles.rewardRow}>
           <View style={[styles.rewardIconBg, {backgroundColor: '#F973161A'}]}><Gift size={16} color="#F97316" /></View>
           <View style={{flex: 1}}>
              <Text style={styles.rewardRowTitle}>Welcome Vouchers worth ₹2,500</Text>
              <Text style={styles.rewardRowSub}>Accessories, service, FASTag & car care • Valid 90 days</Text>
           </View>
        </View>

        <View style={styles.rewardRow}>
           <View style={[styles.rewardIconBg, {backgroundColor: '#2563EB1A'}]}><Star size={16} color="#2563EB" /></View>
           <View style={{flex: 1}}>
              <Text style={styles.rewardRowTitle}>Rate dealer & earn 50 Bounty Points</Text>
              <Text style={styles.rewardRowSub}>Points redeemable on your next Carbounty deal</Text>
           </View>
        </View>

        <View style={styles.rewardRow}>
           <View style={[styles.rewardIconBg, {backgroundColor: '#F1F5F9'}]}><Award size={16} color="#64748B" /></View>
           <View style={{flex: 1}}>
              <Text style={styles.rewardRowTitle}>Featured in NCR Purchases feed</Text>
              <Text style={styles.rewardRowSub}>Your savings inspire other buyers - anonymously</Text>
           </View>
        </View>

        {/* Actions */}
        <TouchableOpacity 
           style={[styles.confirmBtn, !isUploaded && {opacity: 0.5}]} 
           disabled={!isUploaded}
           onPress={() => navigation.navigate('DealClosed')}
        >
           <Text style={styles.confirmBtnText}>Confirm Delivery & Claim Rewards</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.laterBtn}>
           <Text style={styles.laterBtnText}>Do This Later</Text>
        </TouchableOpacity>

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
  
  heroContainer: { alignItems: 'center', marginBottom: 24, marginTop: 12, position: 'relative' },
  carHalfCircleBg: { position: 'absolute', top: 10, width: 140, height: 70, borderTopLeftRadius: 70, borderTopRightRadius: 70, backgroundColor: '#D9E4FC' },
  heroCarImg: { width: 160, height: 90, marginBottom: 12 },
  heroTitle: { fontFamily: 'Outfit-Bold', fontSize: 20, color: '#0F172A', marginBottom: 6 },
  heroSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', textAlign: 'center', lineHeight: 18, paddingHorizontal: 12 },
  
  carDetailsBox: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 24 },
  carDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  carDetailLabel: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B' },
  carDetailValue: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A' },
  carDetailValueGreen: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#207320' },
  
  uploadBox: { backgroundColor: '#F8FAFC', borderWidth: 1.5, borderColor: '#2563EB', borderStyle: 'dashed', borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 24 },
  uploadBoxSuccess: { backgroundColor: '#EFF6FF' },
  pdfIconContainer: { width: 48, height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  uploadTitle: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#0F172A', marginBottom: 4 },
  uploadSub: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#64748B', marginBottom: 12 },
  uploadLinks: { fontFamily: 'Outfit-Medium', fontSize: 11, color: '#2563EB' },

  unlockTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 16 },
  
  rewardRow: { flexDirection: 'row', marginBottom: 16 },
  rewardIconBg: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rewardRowTitle: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A', marginBottom: 2 },
  rewardRowSub: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B' },

  confirmBtn: { backgroundColor: '#2563EB', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 12, marginBottom: 12 },
  confirmBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },
  
  laterBtn: { backgroundColor: '#E2E8F0', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 24 },
  laterBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A' },

  bottomDash: { width: 134, height: 5, backgroundColor: '#0F172A', borderRadius: 100, alignSelf: 'center', marginTop: 12 }
});
