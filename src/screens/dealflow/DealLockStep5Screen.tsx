import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, Check, MapPin, Phone, Calendar, Clock, X } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Circle, Polygon, Polyline } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const CustomSpinner = () => {
  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [progress]);

  const circles = [
    { cx: 32, cy: 8 },
    { cx: 49, cy: 15 },
    { cx: 56, cy: 32 },
    { cx: 49, cy: 49 },
    { cx: 32, cy: 56 },
    { cx: 15, cy: 49 },
    { cx: 8, cy: 32 },
    { cx: 15, cy: 15 },
  ];

  const baseScales = [1, 0.85, 0.71, 0.57, 0.43, 0.29, 0.29, 0.29, 1];
  const baseOpacities = [1, 0.8, 0.6, 0.4, 0.2, 0.1, 0.1, 0.1, 1];
  const inputRange = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];

  return (
    <View style={{ marginBottom: 24, width: 64, height: 64, position: 'relative' }}>
      {circles.map((pos, i) => {
        const sOutput = [];
        const opOutput = [];
        
        for (let j = 0; j <= 8; j++) {
          let idx = j - i;
          if (idx < 0) idx += 8;
          sOutput.push(baseScales[idx]);
          opOutput.push(baseOpacities[idx]);
        }

        const scale = progress.interpolate({ inputRange, outputRange: sOutput });
        const opacity = progress.interpolate({ inputRange, outputRange: opOutput });

        return (
          <Animated.View 
            key={i} 
            style={{ 
              position: 'absolute', 
              left: pos.cx - 7, 
              top: pos.cy - 7, 
              width: 14, 
              height: 14, 
              borderRadius: 7, 
              backgroundColor: '#2563EB',
              opacity: opacity,
              transform: [{ scale: scale }]
            }} 
          />
        );
      })}
    </View>
  );
};

type FlowState = 'SCHEDULING' | 'WAITING' | 'CONFIRMED';

const VerifiedBadgeIcon = ({ size = 64, fill = "#207320" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <Path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <Path d="m9 12 2 2 4-4" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BuildingIcon = ({ size = 20, color = "#2563EB" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
    <Path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01"/>
  </Svg>
);

const StarIcon = ({ size = 16, color = "#EAB308" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </Svg>
);

const CheckCircleOutline = ({ size = 14, color = "#3B82F6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <Polyline points="22 4 12 14.01 9 11.01"/>
  </Svg>
);

export const DealLockStep5Screen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  
  const [flowState, setFlowState] = useState<FlowState>('SCHEDULING');
  const [selectedDate, setSelectedDate] = useState('Tue 7 May');
  const [selectedTime, setSelectedTime] = useState('11:30 AM');

  const DATES = [
    { dayStr: 'Mon', num: '6', month: 'May', id: 'Mon 6 May' },
    { dayStr: 'Tue', num: '7', month: 'May', id: 'Tue 7 May' },
    { dayStr: 'Wed', num: '8', month: 'May', id: 'Wed 8 May' },
    { dayStr: 'Thu', num: '9', month: 'May', id: 'Thu 9 May' },
    { dayStr: 'Fri', num: '10', month: 'May', id: 'Fri 10 May' },
    { dayStr: 'Sat', num: '11', month: 'May', id: 'Sat 11 May' },
  ];

  const TIMES = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];

  const renderSchedulingState = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.heroContainer}>
        <View style={styles.carHalfCircleBg} />
        
        <Text style={styles.heroTitle}>Schedule Your Test Drive</Text>
        <Text style={styles.heroSub}>Book a test drive at <Text style={{fontFamily: 'Outfit-Bold', color: '#0F172A'}}>Maurya Motors</Text> before the final booking. Inspect the specific car matched to chassis <Text style={{fontFamily: 'Outfit-Bold', color: '#0F172A'}}>MA3...4782</Text></Text>
      </View>

      <View style={styles.dealerCard}>
        <View style={styles.dealerHeaderRow}>
           <View style={styles.dealerIconBox}>
             <BuildingIcon size={24} />
           </View>
           <View style={{flex: 1}}>
             <View style={styles.dealerTitleRow}>
                <Text style={styles.dealerTitle}>Maurya Motors</Text>
                <View style={styles.ratingBox}>
                   <StarIcon size={12} />
                   <Text style={styles.ratingText}>4.6</Text>
                </View>
             </View>
             <Text style={styles.dealerAddress}>Plot 18, Sector 18, Noida</Text>
           </View>
        </View>
        <View style={styles.dealerDivider} />
        <View style={styles.dealerInfoRow}>
           <Text style={styles.dealerHours}>Open today 10AM-8PM</Text>
           <Text style={styles.dealerDealsText}>89 deals</Text>
        </View>
        <View style={styles.dealerActionsRow}>
           <TouchableOpacity style={styles.actionBtnSecondary}>
              <MapPin size={16} color="#2563EB" />
              <Text style={styles.actionBtnSecondaryText}>Directions</Text>
           </TouchableOpacity>
           <View style={{width: 12}} />
           <TouchableOpacity style={styles.actionBtnPrimary}>
              <Phone size={16} color="#FFF" />
              <Text style={styles.actionBtnPrimaryText}>Call Dealer</Text>
           </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionCardBlue}>
         <Text style={styles.sectionTitle}>Select a Date</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
            {DATES.map((d) => {
              const isActive = selectedDate === d.id;
              return (
                <TouchableOpacity 
                  key={d.id} 
                  style={[styles.datePill, isActive && styles.datePillActive]}
                  onPress={() => setSelectedDate(d.id)}
                >
                  <Text style={[styles.dateDayStr, isActive && styles.textWhite]}>{d.dayStr}</Text>
                  <Text style={[styles.dateNum, isActive && styles.textWhite]}>{d.num}</Text>
                  <Text style={[styles.dateMonth, isActive && styles.textWhite]}>{d.month}</Text>
                </TouchableOpacity>
              )
            })}
         </ScrollView>
      </View>

      <View style={styles.sectionCardBlue}>
         <Text style={styles.sectionTitle}>Select a Time Slot</Text>
         <View style={styles.timeGrid}>
            {TIMES.map((t) => {
              const isActive = selectedTime === t;
              return (
                <TouchableOpacity 
                  key={t} 
                  style={[styles.timePill, isActive && styles.timePillActive]}
                  onPress={() => setSelectedTime(t)}
                >
                  <Text style={[styles.timeText, isActive && styles.textWhite]}>{t}</Text>
                </TouchableOpacity>
              )
            })}
         </View>
      </View>

      <View style={styles.sectionCard}>
         <Text style={styles.sectionTitle}>What To Bring</Text>
         <View style={styles.bulletRow}>
            <CheckCircleOutline size={16} color="#3B82F6" />
            <Text style={styles.bulletText}>Aadhaar / PAN Card (identity proof)</Text>
         </View>
         <View style={styles.bulletRow}>
            <CheckCircleOutline size={16} color="#3B82F6" />
            <Text style={styles.bulletText}>Driving licence</Text>
         </View>
         <View style={styles.bulletRow}>
            <CheckCircleOutline size={16} color="#3B82F6" />
            <Text style={styles.bulletText}>This App (Show Your Carbounty Agreement)</Text>
         </View>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={() => setFlowState('WAITING')}>
         <Text style={styles.confirmBtnText}>Confirm Test Drive - {selectedDate} at {selectedTime}</Text>
      </TouchableOpacity>
      
      <View style={styles.whatsappNoteBox}>
         <Text style={styles.waNoteTitle}>Already arranged via WhatsApp Group ?</Text>
         <Text style={styles.waNoteDesc}>You can coordinate the test drive directly in the group with the dealer and proceed to your deal dashboard.</Text>
      </View>

      <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('MainTabs')}>
         <Text style={styles.skipBtnText}>I'll have my test drive — take me to My Deal</Text>
      </TouchableOpacity>

    </ScrollView>
  );

  const renderWaitingState = () => (
    <ScrollView contentContainerStyle={[styles.scrollContent, { alignItems: 'center', paddingTop: 60 }]} showsVerticalScrollIndicator={false}>
      <CustomSpinner />
      <Text style={styles.waitingTitle}>Waiting for Dealer Response</Text>
      <Text style={styles.waitingSub}>Your test drive request has been sent to <Text style={{fontFamily: 'Outfit-Bold', color: '#0F172A'}}>Maurya Motors</Text>. They typically respond within 2 hours.</Text>
      
      <View style={styles.requestSummaryCard}>
         <Text style={styles.reqSummaryTitle}>Your Request</Text>
         <View style={styles.reqRow}><Text style={styles.reqLabel}>Car</Text><Text style={styles.reqValueDark}>Maruti Brezza ZXI+ AT</Text></View>
         <View style={styles.reqRow}><Text style={styles.reqLabel}>Requested Slot</Text><Text style={styles.reqValueBlue}>{selectedDate} - {selectedTime}</Text></View>
         <View style={styles.reqRow}><Text style={styles.reqLabel}>Location</Text><Text style={styles.reqValueDark}>Maurya Motors</Text></View>
      </View>

      <View style={styles.demoModeBox}>
        <Text style={styles.demoModeText}><Text style={{color: '#2563EB', fontFamily: 'Outfit-Bold'}}>Demo Mode : </Text>Dealer response will auto-simulate in 5 seconds. Tap a button below to choose outcome.</Text>
        <View style={styles.demoActionRow}>
           <TouchableOpacity style={[styles.demoBtn, {backgroundColor: '#207320'}]} onPress={() => setFlowState('CONFIRMED')}>
              <Check size={16} color="#FFF" />
              <Text style={styles.demoBtnText}>Accept</Text>
           </TouchableOpacity>
           <View style={{width: 16}} />
           <TouchableOpacity style={[styles.demoBtn, {backgroundColor: '#EF4444'}]} onPress={() => setFlowState('SCHEDULING')}>
              <X size={16} color="#FFF" />
              <Text style={styles.demoBtnText}>Reject</Text>
           </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.rescheduleBtn} onPress={() => setFlowState('SCHEDULING')}>
         <Calendar size={16} color="#0F172A" style={{marginRight: 8}} />
         <Text style={styles.rescheduleText}>Reschedule</Text>
      </TouchableOpacity>

    </ScrollView>
  );

  const renderConfirmedState = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
       <View style={{alignItems: 'center', marginTop: 24, marginBottom: 24}}>
          <View style={styles.rosetteHalo}>
             <VerifiedBadgeIcon size={56} fill="#207320" />
          </View>
          <Text style={styles.confirmedHeroTitle}>Test Drive Confirmed !</Text>
          <Text style={styles.confirmedHeroSub}>Maurya Motors has confirmed your slot. See you there !</Text>
       </View>

       <View style={styles.confirmedDetailsCard}>
          <View style={styles.confHeaderRow}>
             <Text style={styles.confDealerName}>Maurya Motors</Text>
             <View style={styles.confPill}><Text style={styles.confPillText}>Confirmed</Text></View>
          </View>
          
          <View style={styles.reqRow}><Text style={styles.reqLabel}>Date & Time</Text><Text style={styles.reqValueDark}>{selectedDate} - {selectedTime}</Text></View>
          <View style={styles.reqRow}><Text style={styles.reqLabel}>Location</Text><Text style={styles.reqValueDark}>Plot 18, Sector 18, Noida</Text></View>
          <View style={styles.reqRow}><Text style={styles.reqLabel}>Your Host</Text><Text style={styles.reqValueBlue}>Rahul Sharma (Sales Mgr)</Text></View>
          <View style={styles.reqRow}><Text style={styles.reqLabel}>Contact</Text><Text style={styles.reqValueDark}>+91 98765 43210</Text></View>
       </View>

       <View style={styles.sectionCard}>
         <Text style={styles.sectionTitle}>What to bring</Text>
         <View style={styles.bulletRow}>
            <CheckCircleOutline size={16} color="#3B82F6" />
            <Text style={styles.bulletText}>Aadhaar / PAN Card - Driving Licence</Text>
         </View>
         <View style={styles.bulletRow}>
            <CheckCircleOutline size={16} color="#3B82F6" />
            <Text style={styles.bulletText}>This app ( Show your Carbounty agreement )</Text>
         </View>
       </View>

       <View style={[styles.dealerActionsRow, { marginBottom: 24 }]}>
           <TouchableOpacity style={[styles.actionBtnSecondary, {flex: 1}]}>
              <MapPin size={16} color="#2563EB" />
              <Text style={styles.actionBtnSecondaryText}>Directions</Text>
           </TouchableOpacity>
           <View style={{width: 12}} />
           <TouchableOpacity style={[styles.actionBtnPrimary, {flex: 1, backgroundColor: '#207320'}]}>
              <Phone size={16} color="#FFF" />
              <Text style={styles.actionBtnPrimaryText}>Call Host</Text>
           </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={() => navigation.navigate('DealDeliveryDashboard')}>
           <Text style={styles.confirmBtnText}>Test Drive Done - Proceed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('MainTabs')}>
           <Text style={styles.skipBtnText}>Back to Home - I'll return after drive</Text>
        </TouchableOpacity>

    </ScrollView>
  );

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
        <TouchableOpacity onPress={() => {
           if (flowState === 'WAITING' || flowState === 'CONFIRMED') setFlowState('SCHEDULING');
           else navigation.goBack();
        }} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stepText}>Step 4 of 6</Text>
          <Text style={styles.headerTitle}>Join Group</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
      </View>

      {flowState === 'SCHEDULING' && renderSchedulingState()}
      {flowState === 'WAITING' && renderWaitingState()}
      {flowState === 'CONFIRMED' && renderConfirmedState()}

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
  
  progressBarContainer: { height: 4, backgroundColor: '#E2E8F0', width: '100%' },
  progressBarFill: { height: 4, backgroundColor: '#F97316', width: '60%' },

  scrollContent: { padding: 16, paddingBottom: 40 },

  // SCHEDULING STATE
  heroContainer: { alignItems: 'center', marginBottom: 24, marginTop: 12 },
  carHalfCircleBg: { width: 183, height: 91.5, borderTopLeftRadius: 91.5, borderTopRightRadius: 91.5, backgroundColor: '#D9E4FC', borderTopWidth: 12, borderLeftWidth: 12, borderRightWidth: 12, borderBottomWidth: 0, borderColor: '#A3C0FF', marginBottom: 20 },
  heroCarImg: { width: 160, height: 90, marginBottom: 16 },
  heroTitle: { fontFamily: 'Outfit-Bold', fontSize: 20, color: '#0F172A', marginBottom: 8 },
  heroSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20, paddingHorizontal: 12 },

  dealerCard: { backgroundColor: '#2563EB0F', borderRadius: 12, borderWidth: 1, borderColor: '#D9E4FC', padding: 16, marginBottom: 20 },
  dealerHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  dealerIconBox: { width: 48, height: 48, backgroundColor: '#EFF6FF', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  dealerTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  dealerTitle: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A' },
  ratingBox: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A', marginLeft: 4 },
  dealerAddress: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B' },
  dealerDivider: { height: 1, backgroundColor: '#D9E4FC', marginVertical: 12 },
  dealerInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  dealerHours: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#0F172A' },
  dealerDealsText: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#2563EB' },
  dealerActionsRow: { flexDirection: 'row' },
  actionBtnSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, backgroundColor: '#EFF6FF', borderRadius: 24, borderWidth: 1, borderColor: '#BFDBFE' },
  actionBtnSecondaryText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#2563EB', marginLeft: 6 },
  actionBtnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, backgroundColor: '#207320', borderRadius: 24 },
  actionBtnPrimaryText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#FFF', marginLeft: 6 },

  sectionCard: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 16, marginBottom: 20 },
  sectionCardBlue: { backgroundColor: '#2563EB0F', borderRadius: 12, borderWidth: 1, borderColor: '#D9E4FC', padding: 16, marginBottom: 20 },
  sectionTitle: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A', marginBottom: 16 },
  
  dateScroll: { paddingRight: 16 },
  datePill: { width: 64, height: 80, backgroundColor: '#2563EB0F', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 8, borderWidth: 1, borderColor: '#D9E4FC' },
  datePillActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  dateDayStr: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#64748B', marginBottom: 4 },
  dateNum: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A', marginBottom: 4 },
  dateMonth: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#64748B' },
  textWhite: { color: '#FFF' },

  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timePill: { width: '31%', paddingVertical: 12, backgroundColor: '#2563EB0F', borderRadius: 8, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#D9E4FC' },
  timePillActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  timeText: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#64748B' },

  bulletRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bulletText: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', marginLeft: 8 },

  confirmBtn: { backgroundColor: '#2563EB', borderRadius: 24, paddingVertical: 16, alignItems: 'center', marginBottom: 24 },
  confirmBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },

  whatsappNoteBox: { marginBottom: 24 },
  waNoteTitle: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A', marginBottom: 4 },
  waNoteDesc: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', lineHeight: 18 },

  skipBtn: { backgroundColor: '#E2E8F0', borderRadius: 24, paddingVertical: 16, alignItems: 'center', marginBottom: 20 },
  skipBtnText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A' },

  // WAITING STATE
  waitingTitle: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A', marginBottom: 8 },
  waitingSub: { fontFamily: 'Outfit-Regular', fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 22, paddingHorizontal: 16, marginBottom: 32 },
  
  requestSummaryCard: { backgroundColor: '#EFF6FF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#BFDBFE', width: '100%', marginBottom: 32 },
  reqSummaryTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#2563EB', marginBottom: 16 },
  reqRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  reqLabel: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B' },
  reqValueDark: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A' },
  reqValueBlue: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#2563EB' },

  demoModeBox: { width: '100%', marginBottom: 40 },
  demoModeText: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', lineHeight: 18, textAlign: 'center', marginBottom: 16 },
  demoActionRow: { flexDirection: 'row', justifyContent: 'center' },
  demoBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 24 },
  demoBtnText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#FFF', marginLeft: 8 },

  rescheduleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, backgroundColor: '#E2E8F0', borderRadius: 24, width: '100%' },
  rescheduleText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A' },

  // CONFIRMED STATE
  rosetteHalo: { padding: 12, backgroundColor: '#DCFCE7', borderRadius: 50, marginBottom: 16 },
  confirmedHeroTitle: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#207320', marginBottom: 8 },
  confirmedHeroSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', textAlign: 'center', paddingHorizontal: 20 },
  
  confirmedDetailsCard: { backgroundColor: '#EFF6FF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#BFDBFE', width: '100%', marginBottom: 20 },
  confHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  confDealerName: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A', marginRight: 8 },
  confPill: { backgroundColor: '#2073200A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16, borderWidth: 1, borderColor: '#2073201A' },
  confPillText: { fontFamily: 'Outfit-Bold', fontSize: 11, color: '#207320' },

});
