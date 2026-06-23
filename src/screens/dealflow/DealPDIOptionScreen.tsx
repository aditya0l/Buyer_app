import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, Video, Users, SkipForward, CheckCircle2 } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const DealPDIOptionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<'virtual' | 'physical' | 'skip'>('virtual');

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
          <Text style={styles.stepText}>Step 2 of 5</Text>
          <Text style={styles.headerTitle}>Vehicle Inspection (PDI)</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: '40%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.heroContainer}>
          <View style={styles.heroIconCircle}>
            <Text style={{ fontSize: 32 }}>🔍</Text>
          </View>
          <Text style={styles.heroTitle}>Inspect Before You Commit</Text>
          <Text style={styles.heroSub}>Your identity is still anonymous. Choose how you want the car inspected before joining the deal group. This is your last checkpoint before revealing yourself.</Text>
        </View>

        {/* Virtual PDI Card */}
        <TouchableOpacity
          style={[styles.optionCard, selected === 'virtual' && styles.optionCardSelected]}
          onPress={() => setSelected('virtual')}
          activeOpacity={0.9}
        >
          <View style={styles.optionCardHeader}>
            <View style={[styles.optionIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Video size={20} color="#2563EB" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.optionTitle}>Virtual Carbounty PDI</Text>
              <View style={styles.pillRow}>
                <View style={styles.pillBlue}><Text style={styles.pillBlueText}>Free</Text></View>
                <View style={styles.pillGreen}><Text style={styles.pillGreenText}>Recommended</Text></View>
              </View>
            </View>
            <View style={[styles.radioOuter, selected === 'virtual' && styles.radioOuterSelected]}>
              {selected === 'virtual' && <View style={styles.radioInner} />}
            </View>
          </View>
          <Text style={styles.optionDesc}>Carbounty team visits the dealership and shoots HD videos & photos of the car from all angles. You receive a detailed inspection report — all without revealing your identity.</Text>
          <View style={styles.featurePillRow}>
            {['📹 HD Video', '🔄 360° Photos', '📋 Full Report'].map(f => (
              <View key={f} style={styles.featurePill}><Text style={styles.featurePillText}>{f}</Text></View>
            ))}
            <View style={[styles.featurePill, { borderColor: '#F97316', backgroundColor: '#FF94410F' }]}><Text style={[styles.featurePillText, { color: '#C2410C' }]}>⏱ 3-4 hrs</Text></View>
          </View>
        </TouchableOpacity>

        {/* Physical PDI Card */}
        <TouchableOpacity
          style={[styles.optionCard, selected === 'physical' && styles.optionCardSelected]}
          onPress={() => setSelected('physical')}
          activeOpacity={0.9}
        >
          <View style={styles.optionCardHeader}>
            <View style={[styles.optionIconBox, { backgroundColor: '#F0FDF4' }]}>
              <Users size={20} color="#16A34A" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.optionTitle}>Physical PDI</Text>
              <View style={styles.pillRow}>
                <View style={styles.pillBlue}><Text style={styles.pillBlueText}>Free</Text></View>
              </View>
            </View>
            <View style={[styles.radioOuter, selected === 'physical' && styles.radioOuterSelected]}>
              {selected === 'physical' && <View style={styles.radioInner} />}
            </View>
          </View>
          <Text style={styles.optionDesc}>Visit the dealership with a Carbounty representative. Inspect the car yourself — our rep is present as a neutral witness. Your identity stays anonymous until you confirm satisfaction.</Text>
          <View style={styles.featurePillRow}>
            {['👤 Rep Present', '🔍 You Inspect', '📝 Report Signed'].map(f => (
              <View key={f} style={styles.featurePill}><Text style={styles.featurePillText}>{f}</Text></View>
            ))}
          </View>
        </TouchableOpacity>

        {/* Skip PDI Card */}
        <TouchableOpacity
          style={[styles.optionCard, selected === 'skip' && styles.optionCardSelected]}
          onPress={() => setSelected('skip')}
          activeOpacity={0.9}
        >
          <View style={styles.optionCardHeader}>
            <View style={[styles.optionIconBox, { backgroundColor: '#F8FAFC' }]}>
              <SkipForward size={20} color="#64748B" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.optionTitle}>Skip PDI</Text>
            </View>
            <View style={[styles.radioOuter, selected === 'skip' && styles.radioOuterSelected]}>
              {selected === 'skip' && <View style={styles.radioInner} />}
            </View>
          </View>
          <Text style={styles.optionDesc}>Proceed directly to the deal group. You acknowledge that no pre-delivery inspection was requested. Any post-delivery disputes on vehicle condition may not be covered.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('DealPDIStatus')}>
          <Text style={styles.primaryBtnText}>
            {selected === 'virtual' ? 'Request Virtual PDI' : selected === 'physical' ? 'Schedule Physical PDI' : 'Skip & Join Deal Group'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.anonText}>Your identity remains <Text style={{ fontFamily: 'Outfit-Bold' }}>100% anonymous</Text> until you confirm satisfaction after PDI. Dealer does not know who you are at this stage.</Text>

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
  scrollContent: { padding: 20, paddingBottom: 40 },

  heroContainer: { alignItems: 'center', marginBottom: 24 },
  heroIconCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  heroTitle: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A', marginBottom: 8 },
  heroSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20 },

  optionCard: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1.5, borderColor: '#E2E8F0', padding: 16, marginBottom: 12 },
  optionCardSelected: { borderColor: '#2563EB', backgroundColor: '#FAFCFF' },
  optionCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  optionIconBox: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  optionTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 4 },
  pillRow: { flexDirection: 'row', gap: 6 },
  pillGreen: { backgroundColor: '#2073201A', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: '#2073204D' },
  pillGreenText: { fontFamily: 'Outfit-Bold', fontSize: 11, color: '#207320' },
  pillBlue: { backgroundColor: '#EFF6FF', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: '#BFDBFE' },
  pillBlueText: { fontFamily: 'Outfit-Bold', fontSize: 11, color: '#2563EB' },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
  radioOuterSelected: { borderColor: '#2563EB' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2563EB' },
  optionDesc: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', lineHeight: 18, marginBottom: 10 },
  featurePillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  featurePill: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  featurePillText: { fontFamily: 'Outfit-Medium', fontSize: 11, color: '#475569' },

  primaryBtn: { backgroundColor: '#2563EB', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 14, marginTop: 8 },
  primaryBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },
  anonText: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B', textAlign: 'center', lineHeight: 18, marginBottom: 24 },

  bottomDash: { width: 134, height: 5, backgroundColor: '#0F172A', borderRadius: 100, alignSelf: 'center' },
});
