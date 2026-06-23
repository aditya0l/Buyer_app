import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ArrowLeft, CheckCircle2, Info } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle as SvgCircle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const TOTAL_MS = 5000; // 5 seconds
const CIRCUMFERENCE = 2 * Math.PI * 56;

export const DealPDIStatusScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState(0);      // 0 → 1 driven at 60fps
  const [secondsLeft, setSecondsLeft] = useState(5); // integer for display
  const [isDone, setIsDone] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // All timeline steps done when timer finishes
  const getTimeline = (done: boolean) => [
    { label: 'Team dispatched to dealership', sub: 'Carbounty rep en route', done: true, active: false },
    { label: 'Shooting HD video & photos', sub: 'Exterior, interior, engine bay, under-body', done: done, active: !done },
    { label: 'Generating inspection report', sub: 'Condition grading + defect log', done: done, active: false },
    { label: 'Report delivered to you', sub: 'Review → confirm → join deal group', done: done, active: false },
  ];

  // 60fps requestAnimationFrame loop
  useEffect(() => {
    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const p = Math.min(elapsed / TOTAL_MS, 1);
      setProgress(p);
      setSecondsLeft(Math.max(0, Math.ceil((TOTAL_MS - elapsed) / 1000)));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const strokeDash = CIRCUMFERENCE * progress;
  const timeline = getTimeline(isDone);

  const formatTime = (s: number) => {
    if (s <= 0) return '0s';
    return `${s}s`;
  };

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

        {/* Car Hero */}
        <View style={styles.carHeroContainer}>
          <View style={styles.carHeroArc} />
          <Image
            source={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/123185/grand-vitara-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80' }}
            style={styles.carHeroImg}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.heroTitle}>
          {isDone ? 'PDI Complete!' : 'PDI In Progress'}
        </Text>
        <Text style={styles.heroSub}>
          {isDone
            ? 'Inspection is complete. Your report is ready to review.'
            : 'Carbounty team is at the dealership shooting HD videos and photos. Your report will be ready soon.'}
        </Text>

        {/* Timer Card with ellipse cutout */}
        <View style={styles.timerSection}>
          {/* Blue Card */}
          <View style={[styles.timerCard, isDone && styles.timerCardDone]}>
            <View style={{ height: 70 }} />
            <Text style={styles.timerLabel}>
              {isDone ? 'Report Ready!' : 'Estimated Time Remaining'}
            </Text>
            <View style={styles.timerInfoRow}>
              <Info size={14} color={isDone ? '#86EFAC' : '#93C5FD'} style={{ marginRight: 6 }} />
              <Text style={styles.timerInfoText}>
                {isDone ? 'Your inspection report is ready below.' : 'You will be notified when report is ready.'}
              </Text>
            </View>
          </View>

          {/* Circle overlaid - white bg creates cutout */}
          <View style={styles.timerCircleOuter}>
            <Svg width={133} height={133} viewBox="0 0 133 133">
              <SvgCircle cx="66.5" cy="66.5" r="63" fill="#FFF" />
              {/* Track */}
              <SvgCircle cx="66.5" cy="66.5" r="56" stroke={isDone ? '#DCFCE7' : '#DBEAFE'} strokeWidth="8" fill="none" />
              {/* Progress arc */}
              <SvgCircle
                cx="66.5" cy="66.5" r="56"
                stroke={isDone ? '#16A34A' : '#2563EB'}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${strokeDash} ${CIRCUMFERENCE}`}
                strokeLinecap="round"
                rotation="-90"
                origin="66.5, 66.5"
              />
            </Svg>
            <View style={styles.timerCircleText}>
              {isDone ? (
                <CheckCircle2 size={36} color="#16A34A" fill="#DCFCE7" />
              ) : (
                <>
                  <Text style={styles.timerValue}>{formatTime(secondsLeft)}</Text>
                  <Text style={styles.timerUnit}>Remaining</Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineCard}>
          {timeline.map((item, i) => (
            <View key={i} style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                {item.done ? (
                  <CheckCircle2 size={22} color="#16A34A" fill="#DCFCE7" />
                ) : item.active ? (
                  <View style={styles.timelineActiveCircle}>
                    <Text style={styles.timelineNum}>{i + 1}</Text>
                  </View>
                ) : (
                  <View style={styles.timelineInactiveCircle}>
                    <Text style={styles.timelineInactiveNum}>{i + 1}</Text>
                  </View>
                )}
                {i < timeline.length - 1 && (
                  <View style={[styles.timelineLine, item.done && styles.timelineLineDone]} />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineLabel, item.done && styles.timelineLabelDone, item.active && styles.timelineLabelActive]}>{item.label}</Text>
                <Text style={styles.timelineSub}>{item.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* View Report Button - appears when done */}
        {isDone && (
          <TouchableOpacity style={styles.reportBtn} onPress={() => navigation.navigate('DealPDIReport')}>
            <CheckCircle2 size={18} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.reportBtnText}>View Inspection Report</Text>
          </TouchableOpacity>
        )}

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

  carHeroContainer: { alignItems: 'center', marginBottom: 16, position: 'relative', height: 120, justifyContent: 'flex-end' },
  carHeroArc: { position: 'absolute', bottom: 0, width: 200, height: 100, backgroundColor: '#EFF6FF', borderRadius: 100, borderWidth: 1, borderColor: '#DBEAFE' },
  carHeroImg: { width: 200, height: 100, position: 'absolute', bottom: 0 },

  heroTitle: { fontFamily: 'Outfit-Bold', fontSize: 20, color: '#0F172A', textAlign: 'center', marginBottom: 6 },
  heroSub: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20, marginBottom: 24 },

  // Timer cutout card
  timerSection: { position: 'relative', height: 165 + 67, marginBottom: 24 },
  timerCard: {
    position: 'absolute',
    top: 67,
    left: 0,
    right: 0,
    height: 165,
    backgroundColor: '#2563EB',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  timerCardDone: { backgroundColor: '#15803D' },
  timerCircleOuter: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    width: 133,
    height: 133,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  timerCircleText: { position: 'absolute', alignItems: 'center' },
  timerValue: { fontFamily: 'Outfit-Bold', fontSize: 24, color: '#2563EB' },
  timerUnit: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B' },
  timerLabel: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#FFF', marginBottom: 10, textAlign: 'center' },
  timerInfoRow: { flexDirection: 'row', alignItems: 'center' },
  timerInfoText: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#93C5FD' },

  timelineCard: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 16, marginBottom: 20 },
  timelineRow: { flexDirection: 'row', marginBottom: 4 },
  timelineIconCol: { alignItems: 'center', width: 26, marginRight: 14 },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#E2E8F0', marginVertical: 4, minHeight: 24 },
  timelineLineDone: { backgroundColor: '#16A34A' },
  timelineActiveCircle: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#2563EB', justifyContent: 'center', alignItems: 'center' },
  timelineNum: { fontFamily: 'Outfit-Bold', fontSize: 11, color: '#FFF' },
  timelineInactiveCircle: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
  timelineInactiveNum: { fontFamily: 'Outfit-Bold', fontSize: 11, color: '#94A3B8' },
  timelineContent: { flex: 1, paddingBottom: 20 },
  timelineLabel: { fontFamily: 'Outfit-Bold', fontSize: 13, color: '#475569', marginBottom: 2 },
  timelineLabelActive: { color: '#0F172A' },
  timelineLabelDone: { color: '#16A34A' },
  timelineSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#94A3B8' },

  reportBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#207320', borderRadius: 24, paddingVertical: 14, marginBottom: 24 },
  reportBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },

  bottomDash: { width: 134, height: 5, backgroundColor: '#0F172A', borderRadius: 100, alignSelf: 'center' },
});
