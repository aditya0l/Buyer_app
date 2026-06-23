import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, Check, MessageCircle, FileText, BarChart2, PenTool, Download, MessageCircle as ChatIcon, Landmark } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const WhatsAppIcon = ({ size = 24, color = "#FFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.227 5.227 0 0 0-.571-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.575-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.98 1.005-3.645-.235-.373a9.86 9.86 0 0 1-1.51-5.26c0-5.445 4.433-9.88 9.882-9.88 2.639 0 5.118 1.028 6.983 2.895 1.865 1.867 2.893 4.347 2.893 6.988 0 5.446-4.433 9.887-9.881 9.887" fill={color}/>
  </Svg>
);

const SteeringWheelIcon = ({ size = 20, color = "#0F172A" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10"/>
    <Path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/>
    <Path d="M12 12A4 4 0 1 0 12 20 4 4 0 1 0 12 12z"/>
    <Path d="M4.93 4.93l4.24 4.24M19.07 4.93l-4.24 4.24"/>
  </Svg>
);

export const DealLockStep4Screen: React.FC = () => {
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
          <Text style={styles.stepText}>Step 3 of 6</Text>
          <Text style={styles.headerTitle}>Agreement</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* WhatsApp Success Header */}
        <View style={styles.successHeaderContainer}>
          <View style={styles.waIconHalo}>
            <View style={styles.waIconCircle}>
               <WhatsAppIcon size={32} />
            </View>
          </View>
          <Text style={styles.successTitle}>Your Deal Group is Ready!</Text>
          <Text style={styles.successSub}>A private WhatsApp group has been created with you, the dealer, and our support team. All deal updates, documents, and communication will happen here.</Text>
        </View>

        {/* Group Details Card */}
        <View style={styles.groupCard}>
          <View style={styles.groupCardHeader}>
            <View style={styles.groupChatIcon}>
              <ChatIcon size={16} color="#FFF" />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.groupName}>Brezza ZXI+ Deal - May 2026</Text>
              <Text style={styles.groupSub}>3 members · Group Created by Carbounty</Text>
            </View>
          </View>
          
          <View style={styles.groupMembersContent}>
            <Text style={styles.membersSectionTitle}>Group Members</Text>
            
            <View style={styles.memberRow}>
               <View style={[styles.avatarCircle, {backgroundColor: '#DCFCE7'}]}><Text style={[styles.avatarText, {color: '#166534'}]}>PA</Text></View>
               <View style={styles.memberTextCol}>
                 <Text style={styles.memberName}>Raaj Oberoi (You)</Text>
                 <Text style={styles.memberRole}>Buyer</Text>
               </View>
               <Text style={styles.memberStatus}><Check size={14} color="#207320" /> Joined</Text>
            </View>

            <View style={styles.memberRow}>
               <View style={[styles.avatarCircle, {backgroundColor: '#FF94410F'}]}><Text style={[styles.avatarText, {color: '#9A3412'}]}>AN</Text></View>
               <View style={styles.memberTextCol}>
                 <Text style={styles.memberName}>Maurya Motors</Text>
                 <Text style={styles.memberRole}>Dealer</Text>
               </View>
               <Text style={styles.memberStatus}><Check size={14} color="#207320" /> Active</Text>
            </View>

            <View style={styles.memberRow}>
               <View style={[styles.avatarCircle, {backgroundColor: '#E0E7FF'}]}><Text style={[styles.avatarText, {color: '#3730A3', fontSize: 8}]}>CarBounty</Text></View>
               <View style={styles.memberTextCol}>
                 <Text style={styles.memberName}>Carbounty Team</Text>
                 <Text style={styles.memberRole}>Facilitator & Dispute Support</Text>
               </View>
               <Text style={styles.memberStatus}><Check size={14} color="#207320" /> Admin</Text>
            </View>
          </View>
        </View>

        {/* Documents Card */}
        <View style={styles.docsCard}>
           <View style={styles.docsHeader}>
              <Text style={styles.docsTitle}>Deal Documents</Text>
              <Text style={styles.docsSub}>Pinned to your group · Download or view any time</Text>
           </View>
           
           <View style={styles.docsContent}>
              <View style={styles.docRow}>
                 <View style={[styles.docIconBox, {backgroundColor: '#F1F5F9'}]}><FileText size={20} color="#EAB308" /></View>
                 <View style={styles.docTextCol}>
                    <Text style={styles.docName}>Signed Deal Agreement</Text>
                    <Text style={styles.docDesc}>REF: CBT-2026-05-0042 · Both parties signed</Text>
                 </View>
                 <TouchableOpacity style={styles.dlBtn}><Download size={14} color="#FFF" /></TouchableOpacity>
              </View>
              <View style={styles.docDivider} />

              <View style={styles.docRow}>
                 <View style={[styles.docIconBox, {backgroundColor: '#F1F5F9'}]}><BarChart2 size={20} color="#3B82F6" /></View>
                 <View style={styles.docTextCol}>
                    <Text style={styles.docName}>Price Quotation</Text>
                    <Text style={styles.docDesc}>On-road ₹13,18,000 · Savings ₹42,000 locked</Text>
                 </View>
                 <TouchableOpacity style={styles.dlBtn}><Download size={14} color="#FFF" /></TouchableOpacity>
              </View>
              <View style={styles.docDivider} />

              <View style={styles.docRow}>
                 <View style={[styles.docIconBox, {backgroundColor: '#F1F5F9'}]}><PenTool size={20} color="#F97316" /></View>
                 <View style={styles.docTextCol}>
                    <Text style={styles.docName}>Accessory & Perks List</Text>
                    <Text style={styles.docDesc}>Seat covers, floor mats, dash cam · 3 free services</Text>
                 </View>
                 <TouchableOpacity style={styles.dlBtn}><Download size={14} color="#FFF" /></TouchableOpacity>
              </View>
           </View>
        </View>

        {/* Loan Box */}
        <TouchableOpacity style={styles.loanBox} onPress={() => navigation.navigate('CarLoanPreApproval', { returnTo: 'DealLockStep4' })}>
          <Text style={styles.loanEmoji}>🏦</Text>
          <View style={styles.loanBoxTextCol}>
            <Text style={styles.loanTitle}>Need a car loan ?</Text>
            <Text style={styles.loanSub}>SBI · HDFC · ICICI — Pre-approval in 24 hrs</Text>
          </View>
          <View style={styles.loanApplyBtn}>
            <Text style={styles.loanApplyBtnText}>Apply →</Text>
          </View>
        </TouchableOpacity>

        {/* Bottom Actions */}
        <TouchableOpacity style={styles.openWaBtn}>
           <WhatsAppIcon size={20} />
           <Text style={styles.openWaText}>Open Group in WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.testDriveBtn} onPress={() => navigation.navigate('DealLockStep5')}>
           <SteeringWheelIcon size={18} />
           <Text style={styles.testDriveText}>Schedule Test Drive</Text>
        </TouchableOpacity>

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
  
  progressBarContainer: { height: 4, backgroundColor: '#E2E8F0', width: '100%' },
  progressBarFill: { height: 4, backgroundColor: '#F97316', width: '60%' },

  scrollContent: { padding: 20, paddingBottom: 40 },
  
  successHeaderContainer: { alignItems: 'center', marginBottom: 24, marginTop: 12 },
  waIconHalo: { backgroundColor: '#DCFCE7', padding: 8, borderRadius: 50, marginBottom: 16 },
  waIconCircle: { width: 64, height: 64, backgroundColor: '#207320', borderRadius: 32, justifyContent: 'center', alignItems: 'center' },
  successTitle: { fontFamily: 'Outfit-Bold', fontSize: 20, color: '#0F172A', marginBottom: 8 },
  successSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20, paddingHorizontal: 12 },

  groupCard: { backgroundColor: '#2073200A', borderRadius: 12, borderWidth: 1, borderColor: '#2073201A', overflow: 'hidden', marginBottom: 24 },
  groupCardHeader: { flexDirection: 'row', backgroundColor: '#E2E8F0', padding: 16, alignItems: 'center' },
  groupChatIcon: { width: 32, height: 32, backgroundColor: '#207320', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  groupName: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A' },
  groupSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', marginTop: 2 },
  groupMembersContent: { padding: 16 },
  membersSectionTitle: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#207320', marginBottom: 16 },
  memberRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontFamily: 'Outfit-Bold', fontSize: 14 },
  memberTextCol: { flex: 1 },
  memberName: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A' },
  memberRole: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', marginTop: 2 },
  memberStatus: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#207320' },

  docsCard: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginBottom: 24 },
  docsHeader: { backgroundColor: '#E0E7FF', padding: 16 },
  docsTitle: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A' },
  docsSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', marginTop: 4 },
  docsContent: { padding: 16 },
  docRow: { flexDirection: 'row', alignItems: 'center' },
  docDivider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 16 },
  docIconBox: { width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  docTextCol: { flex: 1, paddingRight: 12 },
  docName: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A' },
  docDesc: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B', marginTop: 4, lineHeight: 16 },
  dlBtn: { width: 28, height: 28, backgroundColor: '#3B82F6', borderRadius: 14, justifyContent: 'center', alignItems: 'center' },

  loanBox: { flexDirection: 'row', backgroundColor: '#FF94410F', borderWidth: 1, borderColor: '#FF944133', borderRadius: 12, padding: 16, marginBottom: 24, alignItems: 'center' },
  loanEmoji: { fontSize: 28, marginRight: 12 },
  loanBoxTextCol: { flex: 1, marginRight: 12 },
  loanTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#F97316', marginBottom: 4 },
  loanSub: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#0F172A', lineHeight: 16 },
  loanApplyBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 24, borderWidth: 1, borderColor: '#F97316', backgroundColor: '#FF94410F' },
  loanApplyBtnText: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#F97316' },

  openWaBtn: { backgroundColor: '#207320', borderRadius: 24, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  openWaText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF', marginLeft: 8 },
  testDriveBtn: { backgroundColor: '#E2E8F0', borderRadius: 24, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  testDriveText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A', marginLeft: 8 },

});
