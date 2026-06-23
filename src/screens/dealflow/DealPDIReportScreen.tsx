import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, Check, AlertTriangle, Play } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const CHECKLIST = [
  'Chassis Number Match',
  'Body & Paint',
  'Tyres & Wheels',
  'Electricals & AC',
  'Interior Condition',
  'Documents Ready',
];

const PHOTOS = [
  { label: 'Front', uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-exterior-right-front-three-quarter.jpeg?isig=0&q=80' },
  { label: 'Rear', uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-exterior-right-rear-three-quarter.jpeg?isig=0&q=80' },
  { label: 'Interior', uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-interior-dashboard.jpeg?isig=0&q=80' },
  { label: 'Engine', uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-exterior-engine.jpeg?isig=0&q=80' },
  { label: 'Left', uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-exterior-left-front-three-quarter.jpeg?isig=0&q=80' },
  { label: 'Right', uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-exterior-right-front-three-quarter.jpeg?isig=0&q=80' },
];

export const DealPDIReportScreen = () => {
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
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stepText}>Step 3 of 5</Text>
          <Text style={styles.headerTitle}>PDI Status</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: '60%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero - chart emoji icon */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroEmoji}>📊</Text>
          <Text style={styles.heroTitle}>Inspection Report Ready!</Text>
          <Text style={styles.heroSub}>Carbounty team has completed the inspection. Review the report below and confirm if you are satisfied.</Text>
        </View>

        {/* Grade Badge Card */}
        <View style={styles.gradeCard}>
          <View style={styles.gradeBox}>
            <Text style={styles.gradeText}>A</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.gradeLabel}>GRADE BADGE</Text>
            <Text style={styles.gradeValue}>Excellent – Delivery Ready</Text>
          </View>
        </View>

        {/* Car Info Strip */}
        <View style={styles.carInfoCard}>
          <Image
            source={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-exterior-right-front-three-quarter.jpeg?isig=0&q=80' }}
            style={styles.carInfoImg}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.carInfoName}>Maruti Brezza ZXI+</Text>
            <Text style={styles.carInfoChassis}>Chassis :- MA3...4782</Text>
          </View>
        </View>

        {/* Photo Grid */}
        <Text style={styles.sectionTitle}>🖼 Inspection Photos & Video</Text>
        <View style={styles.photoGrid}>
          {PHOTOS.map((p) => (
            <View key={p.label} style={styles.photoCell}>
              <Image
                source={{ uri: p.uri }}
                style={styles.photoImg}
                resizeMode="cover"
                defaultSource={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/brezza-exterior-right-front-three-quarter.jpeg?isig=0&q=80' }}
              />
              <View style={styles.photoLabelBg}>
                <Text style={styles.photoLabel}>{p.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 360 Video Button */}
        <TouchableOpacity style={styles.videoBtn}>
          <View style={styles.videoPlayCircle}>
            <Play size={14} color="#2563EB" fill="#2563EB" />
          </View>
          <Text style={styles.videoBtnText}>Watch 360° Inspection Video</Text>
        </TouchableOpacity>

        {/* Checklist */}
        <Text style={styles.sectionTitle}>📋 Inspection Checklist</Text>
        <View style={styles.checklistCard}>
          {CHECKLIST.map((item, i) => (
            <View key={item} style={[styles.checklistRow, i < CHECKLIST.length - 1 && styles.checklistRowBorder]}>
              <Text style={styles.checklistLabel}>{item}</Text>
              <View style={styles.checklistPassRow}>
                <Check size={13} color="#16A34A" style={{ marginRight: 3 }} />
                <Text style={styles.checklistPass}>Pass</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Inspector Note */}
        <View style={styles.inspectorNote}>
          <Text style={styles.inspectorNoteTitle}>Inspector Note</Text>
          <Text style={styles.inspectorNoteText}>"Vehicle is in excellent factory-fresh condition. No scratches, dents or defects noted. All agreed accessories are fitted. Chassis matches booking. Cleared for delivery."</Text>
          <Text style={styles.inspectorNoteRef}>Inspected by Carbounty Certified Rep · Ref: CBT-PDI-2026-0042</Text>
        </View>

        {/* CTA Buttons */}
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('DealDeliveryDashboard')}>
          <Text style={styles.primaryBtnText}>I'm Satisfied – Proceed To Deal Group</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.concernBtn}>
          <Text style={styles.concernBtnText}>⚠️  Raise A Concern</Text>
        </TouchableOpacity>

        <View style={styles.bottomDash} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'transparent' },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  headerTitleContainer: { flex: 1, alignItems: 'center' },
  stepText: { fontFamily: 'Outfit-Medium', fontSize: 13, color: '#2563EB' },
  headerTitle: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A' },
  progressBarBg: { height: 4, backgroundColor: '#F1F5F9' },
  progressBarFill: { height: '100%', backgroundColor: '#F97316' },
  scrollContent: { padding: 16, paddingBottom: 40 },

  // Hero
  heroContainer: { alignItems: 'center', marginBottom: 16, marginTop: 8 },
  heroEmoji: { fontSize: 52, marginBottom: 10 },
  heroTitle: { fontFamily: 'Outfit-Bold', fontSize: 20, color: '#0F172A', marginBottom: 6 },
  heroSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20 },

  // Grade Badge
  gradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: 14,
    marginBottom: 10,
  },
  gradeBox: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  gradeText: { fontFamily: 'Outfit-Bold', fontSize: 28, color: '#FFF' },
  gradeLabel: { fontFamily: 'Outfit-Bold', fontSize: 10, color: '#2563EB', letterSpacing: 0.8, marginBottom: 3 },
  gradeValue: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A' },

  // Car Info
  carInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: 12,
    marginBottom: 20,
  },
  carInfoImg: { width: 72, height: 45, marginRight: 12, borderRadius: 6 },
  carInfoName: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A' },
  carInfoChassis: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#2563EB', marginTop: 2 },

  sectionTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 10 },

  // Photo Grid
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  photoCell: { width: '32%', borderRadius: 8, overflow: 'hidden', position: 'relative', aspectRatio: 1.3 },
  photoImg: { width: '100%', height: '100%', backgroundColor: '#CBD5E1' },
  photoLabelBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.52)',
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  photoLabel: { fontFamily: 'Outfit-Medium', fontSize: 10, color: '#FFF' },

  // Video Button
  videoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 28,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 20,
  },
  videoPlayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  videoBtnText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#2563EB' },

  // Checklist
  checklistCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  checklistRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  checklistRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  checklistLabel: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#0F172A' },
  checklistPassRow: { flexDirection: 'row', alignItems: 'center' },
  checklistPass: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#16A34A' },

  // Inspector Note
  inspectorNote: {
    backgroundColor: '#FF94410F',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FED7AA',
    padding: 16,
    marginBottom: 20,
  },
  inspectorNoteTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#C2410C', marginBottom: 8 },
  inspectorNoteText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
    color: '#0F172A',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 10,
  },
  inspectorNoteRef: { fontFamily: 'Outfit-Bold', fontSize: 11, color: '#92400E' },

  // Buttons
  primaryBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },
  concernBtn: { alignItems: 'center', paddingVertical: 8, marginBottom: 24 },
  concernBtnText: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#D97706' },

  bottomDash: { width: 134, height: 5, backgroundColor: '#0F172A', borderRadius: 100, alignSelf: 'center' },
});
