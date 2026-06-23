import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const CarLoanPreApprovalScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackParamList, any>>();
  const returnTo = route.params?.returnTo;

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
        <View style={{ flex: 1 }} />
        <View style={{ width: 44 }} />
      </View>

      {/* Content - vertically centered */}
      <View style={styles.content}>
        {/* Bank icon */}
        <View style={styles.iconCircle}>
          <Text style={styles.iconEmoji}>🏛️</Text>
        </View>

        <Text style={styles.title}>Car Loan Pre – Approval</Text>
        <Text style={styles.subtitle}>
          Get your loan approved before you visit the showroom.{'\n'}Zero branch visits – all digital.
        </Text>

        {/* Stat Pills */}
        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <Text style={styles.statValue}>24 hrs</Text>
            <Text style={styles.statLabel}>Pre-approval</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statValue}>8.5%+</Text>
            <Text style={styles.statLabel}>Rate p.a.</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statValue}>0 docs</Text>
            <Text style={styles.statLabel}>To submit Now</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('CarLoanForm', { returnTo })}
        >
          <Text style={styles.primaryBtnText}>Yes, Apply for Finance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryBtnText}>No thanks – I'll pay cash</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom dash */}
      <View style={[styles.bottomDash, { marginBottom: insets.bottom + 16 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#BFDBFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconEmoji: { fontSize: 44 },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 36,
  },
  statPill: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  statValue: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A', marginBottom: 2 },
  statLabel: { fontFamily: 'Outfit-Regular', fontSize: 10, color: '#64748B', textAlign: 'center' },
  primaryBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  primaryBtnText: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#FFF' },
  secondaryBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  secondaryBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#475569' },
  bottomDash: {
    width: 134,
    height: 5,
    backgroundColor: '#0F172A',
    borderRadius: 100,
    alignSelf: 'center',
  },
});
