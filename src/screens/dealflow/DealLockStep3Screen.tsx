import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, FileText, Check, Eye, CircleDashed } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const VerifiedBadgeIcon = ({ size = 64, fill = "#207320" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <Path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <Path d="m9 12 2 2 4-4" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DealLockStep3Screen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [signaturePin, setSignaturePin] = useState(['', '', '', '']);
  const [isSigned, setIsSigned] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePinChange = (index: number, value: string) => {
    const newPin = [...signaturePin];
    newPin[index] = value;
    setSignaturePin(newPin);

    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    
    if (newPin.join('') === '4782') {
      setIsSigned(true);
    }
  };

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace' && signaturePin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newPin = [...signaturePin];
      newPin[index - 1] = '';
      setSignaturePin(newPin);
    }
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stepText}>Step 3 of 6</Text>
          <Text style={styles.headerTitle}>Agreement</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

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
          
          {/* Bid accepted & locked Box */}
          <View style={styles.termsBox}>
             <View style={styles.termsBoxHeader}>
                <View style={styles.termsIconWrapper}>
                   <FileText size={20} color="#EAB308" />
                </View>
                <View style={styles.termsHeaderCol}>
                   <Text style={styles.termsBoxTitle}>Bid accepted & locked</Text>
                   <Text style={styles.termsBoxSub}>REF: CBT-2026-050042   Price locked at ₹13,18,000</Text>
                </View>
             </View>
             <View style={styles.termsBoxContent}>
                <Text style={styles.keyTermsHeader}>Key Terms</Text>
                <View style={styles.keyTermsRow}><Text style={styles.ktLabel}>On-Road Price</Text><Text style={styles.ktValueBlue}>₹13,18,000(Locked)</Text></View>
                <View style={styles.keyTermsRow}><Text style={styles.ktLabel}>Delivery</Text><Text style={styles.ktValue}>7 working days</Text></View>
                <View style={styles.keyTermsRow}><Text style={styles.ktLabel}>Perks</Text><Text style={styles.ktValue}>3 agreed perks</Text></View>
                <View style={styles.keyTermsRow}><Text style={styles.ktLabel}>Chassis No.</Text><Text style={styles.ktValueGreen}>MA3...4782 <Check size={16} color="#207320" /></Text></View>
                
                <TouchableOpacity style={styles.viewAgreementBtn} onPress={() => navigation.navigate('DealAgreement')}>
                   <FileText size={16} color="#2563EB" style={{marginRight: 6}} />
                   <Text style={styles.viewAgreementText}>View Full Agreement</Text>
                </TouchableOpacity>
             </View>
          </View>

          {/* Dealer Consent Box */}
          <View style={styles.consentBox}>
             <View style={styles.consentBoxHeader}>
                <View style={styles.termsIconWrapper}>
                   <FileText size={20} color="#EAB308" />
                </View>
                <Text style={styles.consentBoxTitle}>Dealer Consent</Text>
                <View style={styles.acceptedPill}>
                   <Check size={14} color="#207320" />
                   <Text style={styles.acceptedPillText}>Accepted</Text>
                </View>
             </View>
             <View style={styles.consentBoxContent}>
                <Text style={styles.consentDesc}>Maurya Motors has been notified. Their representative is reviewing the agreement terms and will confirm within a few minutes.</Text>
                
                <View style={styles.consentStatusBox}>
                   <CircleDashed size={20} color="#207320" style={{marginRight: 12}} />
                   <Text style={styles.consentStatusText}>AutoNation Noida accepted the agreement terms.</Text>
                </View>
             </View>
          </View>

          {/* E-Signature Box */}
          <View style={styles.eSigBox}>
             <Text style={styles.eSigTitle}>Your E-Signature</Text>
             <Text style={styles.eSigSub}>Enter last 4 digits of the chassis number as your consent</Text>
             <View style={styles.separatorLine} />
             
             {!isSigned ? (
               <>
                 <View style={styles.chassisRefRow}>
                    <View style={styles.blueVerticalMarker} />
                    <Text style={styles.chassisRefLabel}>Chassis Number : </Text>
                    <Text style={styles.chassisRefValue}>MA3FKEB1S00..<Text style={{color: '#2563EB'}}>4782</Text></Text>
                 </View>

                 <View style={styles.pinRowInput}>
                    {[0, 1, 2, 3].map((index) => {
                      const hasValue = signaturePin[index] !== '';
                      return (
                        <TextInput 
                          key={index}
                          ref={el => { inputRefs.current[index] = el; }}
                          style={[styles.pinInput, hasValue && styles.pinInputActive]}
                          maxLength={1}
                          keyboardType="number-pad"
                          value={signaturePin[index]}
                          onChangeText={(val) => handlePinChange(index, val)}
                          onKeyPress={(e) => handleKeyPress(index, e)}
                          onFocus={() => setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 150)}
                        />
                      );
                    })}
                 </View>
               </>
             ) : (
               <View style={styles.signedSuccessContainer}>
                 <VerifiedBadgeIcon size={48} fill="#207320" />
                 <Text style={styles.signedSuccessTitle}>Chassis Confirmed & Agreement Signed !</Text>
                 <View style={styles.signedBadgesRow}>
                   <Text style={styles.signedBadge}>Chassis 4782 matched</Text>
                   <Text style={styles.signedBadge}>Signature recorded</Text>
                 </View>
                 <Text style={styles.refPillText}>REF: CBT-2026- 05-0042</Text>
               </View>
             )}
          </View>

          {/* Action Buttons */}
          {!isSigned ? (
            <TouchableOpacity style={styles.doneBtn} onPress={() => {}}>
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <View style={styles.bothSignedBtn}>
                 <Text style={styles.bothSignedText}>Both Parties Have Signed</Text>
              </View>
              <TouchableOpacity 
                style={styles.createGroupBtn}
                onPress={() => navigation.navigate('DealLockStep4')}
              >
                 <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{marginRight: 8}}>
                    <Path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.227 5.227 0 0 0-.571-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.575-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.98 1.005-3.645-.235-.373a9.86 9.86 0 0 1-1.51-5.26c0-5.445 4.433-9.88 9.882-9.88 2.639 0 5.118 1.028 6.983 2.895 1.865 1.867 2.893 4.347 2.893 6.988 0 5.446-4.433 9.887-9.881 9.887" fill="#FFF"/>
                 </Svg>
                 <Text style={styles.createGroupText}>Create WhatsApp Deal Group</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>

      </ScrollView>
      </KeyboardAvoidingView>
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
  progressBarFill: { height: 4, backgroundColor: '#F97316', width: '50%' },

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

  termsBox: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20, overflow: 'hidden' },
  termsBoxHeader: { flexDirection: 'row', backgroundColor: '#E0E7FF', padding: 16, alignItems: 'center' },
  termsIconWrapper: { width: 32, height: 32, backgroundColor: '#FFF', borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  termsHeaderCol: { flex: 1 },
  termsBoxTitle: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#1E3A8A' },
  termsBoxSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', marginTop: 4 },
  termsBoxContent: { padding: 16 },
  keyTermsHeader: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#2563EB', marginBottom: 16 },
  keyTermsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  ktLabel: { fontFamily: 'Outfit-Regular', fontSize: 14, color: '#64748B' },
  ktValue: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A' },
  ktValueBlue: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#2563EB' },
  ktValueGreen: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#207320', alignItems: 'center' },
  viewAgreementBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#3B82F6', borderRadius: 24, backgroundColor: '#FFF' },
  viewAgreementText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#2563EB' },

  consentBox: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20, overflow: 'hidden' },
  consentBoxHeader: { flexDirection: 'row', backgroundColor: '#E0E7FF', padding: 16, alignItems: 'center' },
  consentBoxTitle: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A', flex: 1 },
  acceptedPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2073201A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16 },
  acceptedPillText: { fontFamily: 'Outfit-Bold', fontSize: 12, color: '#207320', marginLeft: 4 },
  consentBoxContent: { padding: 16 },
  consentDesc: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', lineHeight: 20, marginBottom: 16 },
  consentStatusBox: { flexDirection: 'row', backgroundColor: '#DBEAFE', padding: 12, borderRadius: 8, alignItems: 'center' },
  consentStatusText: { flex: 1, fontFamily: 'Outfit-Medium', fontSize: 13, color: '#334155' },

  eSigBox: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 32 },
  eSigTitle: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A', marginBottom: 6 },
  eSigSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', marginBottom: 16 },
  separatorLine: { height: 1, backgroundColor: '#E2E8F0', marginBottom: 16, marginHorizontal: -16 },
  chassisRefRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  blueVerticalMarker: { width: 3, height: 16, backgroundColor: '#3B82F6', marginRight: 8, borderRadius: 2 },
  chassisRefLabel: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B' },
  chassisRefValue: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#0F172A' },
  pinRowInput: { flexDirection: 'row', marginBottom: 8 },
  pinInput: { width: 56, height: 64, backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', textAlign: 'center', fontFamily: 'Outfit-Bold', fontSize: 24, color: '#0F172A', marginRight: 12 },
  pinInputActive: { backgroundColor: '#EFF6FF', borderColor: '#DBEAFE' },

  signedSuccessContainer: { alignItems: 'center', marginTop: 8 },
  signedSuccessTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#207320', marginVertical: 12 },
  signedBadgesRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
  signedBadge: { backgroundColor: '#E0E7FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, fontFamily: 'Outfit-Medium', fontSize: 11, color: '#312E81', marginHorizontal: 4 },
  refPillText: { backgroundColor: '#F1F5F9', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16, fontFamily: 'Outfit-Medium', fontSize: 11, color: '#64748B' },

  doneBtn: { backgroundColor: '#2563EB', borderRadius: 24, paddingVertical: 16, alignItems: 'center', marginBottom: 20 },
  doneBtnText: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#FFF' },
  
  bothSignedBtn: { backgroundColor: '#E2E8F0', borderRadius: 24, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  bothSignedText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A' },
  createGroupBtn: { backgroundColor: '#207320', borderRadius: 24, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  createGroupText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#FFF' },

});
