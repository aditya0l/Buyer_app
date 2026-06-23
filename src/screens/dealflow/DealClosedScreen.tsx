import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, Star, FileText, ChevronRight } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const DealClosedScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(4);

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
          <Text style={styles.stepText}>Step 6 of 6</Text>
          <Text style={styles.headerTitle}>Deal Closed !</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: '100%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Celebration Hero */}
        <View style={styles.heroContainer}>
           <Text style={styles.partyEmoji}>🎉</Text>
           <Text style={styles.heroTitle}>Congratulations !</Text>
           <Text style={styles.heroSub}>You got the best deal on <Text style={{fontFamily: 'Outfit-Bold', color: '#0F172A'}}>Maruti Wagon R VXI</Text></Text>
        </View>

        {/* Savings Row */}
        <View style={styles.savingsRow}>
           <View style={[styles.savingsBox, { backgroundColor: '#207320', flex: 1.2 }]}>
              <Text style={[styles.savingsValue, {color: '#FFF'}]}>₹28,000</Text>
              <Text style={[styles.savingsLabel, {color: '#FFF', opacity: 0.8}]}>You Saved</Text>
           </View>
           <View style={[styles.savingsBox, { backgroundColor: '#2563EB1A', flex: 1, borderWidth: 1, borderColor: '#2563EB66' }]}>
              <Text style={[styles.savingsValue, {color: '#2563EB'}]}>₹6.1 L</Text>
              <Text style={[styles.savingsLabel, {color: '#64748B'}]}>Final Price</Text>
           </View>
           <View style={[styles.savingsBox, { backgroundColor: '#2563EB1A', flex: 1, borderWidth: 1, borderColor: '#2563EB66' }]}>
              <Text style={[styles.savingsValue, {color: '#0F172A'}]}>4.6 ⭐</Text>
              <Text style={[styles.savingsLabel, {color: '#64748B'}]}>Dealer Rating</Text>
           </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
           <View style={styles.detailRow}><Text style={styles.detailLabel}>Dealer</Text><Text style={styles.detailValue}>Maurya Motors</Text></View>
           <View style={styles.detailRow}><Text style={styles.detailLabel}>Date</Text><Text style={styles.detailValue}>March 14, 2025</Text></View>
           <View style={styles.detailRow}><Text style={styles.detailLabel}>Car</Text><Text style={styles.detailValue}>Maruti Wagon R VXI</Text></View>
           <View style={styles.detailRow}><Text style={styles.detailLabel}>Fuel / Color</Text><Text style={styles.detailValue}>CNG  White</Text></View>
           <View style={styles.detailRow}><Text style={styles.detailLabel}>On-Road Price</Text><Text style={styles.detailValue}>₹6,10,000</Text></View>
           <View style={styles.detailRow}><Text style={styles.detailLabel}>Token Refund</Text><Text style={styles.detailLink}>Upload invoice →</Text></View>
        </View>

        {/* Rating Card */}
        <View style={styles.ratingCard}>
           <Text style={styles.ratingTitle}>Rate Your Experience</Text>
           <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                 <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Star 
                       size={32} 
                       color={star <= rating ? '#F59E0B' : '#CBD5E1'} 
                       fill={star <= rating ? '#F59E0B' : 'none'} 
                       style={{ marginHorizontal: 6 }} 
                    />
                 </TouchableOpacity>
              ))}
           </View>
           <Text style={styles.ratingLabel}>Good Experience</Text>
        </View>

        {/* Upload Invoice Banner */}
        <TouchableOpacity style={styles.uploadBanner}>
           <View style={styles.uploadIconBg}>
              <FileText size={16} color="#D97706" />
           </View>
           <View style={{flex: 1}}>
              <Text style={styles.uploadBannerTitle}>Got your car? Upload invoice</Text>
              <Text style={styles.uploadBannerSub}>Triggers ₹499 token refund within 24 hours</Text>
           </View>
           <ChevronRight size={16} color="#F59E0B" />
        </TouchableOpacity>

        {/* Action */}
        <TouchableOpacity style={styles.postReqBtn} onPress={() => navigation.navigate('MainTabs')}>
           <Text style={styles.postReqBtnText}>Post Another Requirement</Text>
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
  
  heroContainer: { alignItems: 'center', marginBottom: 24, marginTop: 12 },
  partyEmoji: { fontSize: 64, marginBottom: 12 },
  heroTitle: { fontFamily: 'Outfit-Bold', fontSize: 20, color: '#0F172A', marginBottom: 6 },
  heroSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', textAlign: 'center' },
  
  savingsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  savingsBox: { borderRadius: 8, padding: 12, marginRight: 8 },
  savingsValue: { fontFamily: 'Outfit-Bold', fontSize: 15, marginBottom: 2 },
  savingsLabel: { fontFamily: 'Outfit-Medium', fontSize: 11 },
  
  detailsCard: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailLabel: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B' },
  detailValue: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A' },
  detailLink: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#F59E0B' },
  
  ratingCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  ratingTitle: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#0F172A', marginBottom: 16 },
  starsRow: { flexDirection: 'row', marginBottom: 16 },
  ratingLabel: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#94A3B8' },
  
  uploadBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF94410F', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#FF94410F', marginBottom: 24 },
  uploadIconBg: { backgroundColor: '#FF94410F', width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  uploadBannerTitle: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#D97706', marginBottom: 2 },
  uploadBannerSub: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B' },
  
  postReqBtn: { backgroundColor: '#2563EB', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 24 },
  postReqBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },

  bottomDash: { width: 134, height: 5, backgroundColor: '#0F172A', borderRadius: 100, alignSelf: 'center' }
});
