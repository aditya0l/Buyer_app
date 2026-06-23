import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { useBidRoomStore } from '../../store/bidRoomStore';
import Svg, { Path, Circle, Rect, LinearGradient, Stop, Defs, Ellipse, Line } from 'react-native-svg';
import { ArrowLeft, Clock, TrendingDown } from 'lucide-react-native';
import { LiveBidCard } from '../../components/cards/LiveBidCard';
import CarBountyLightSvg from '../../../carbountylight.svg';
import Group94Svg from '../../../Group 94.svg';

const { width: screenWidth } = Dimensions.get('window');
const scale = screenWidth / 390;

const generateHeroPath = (w: number, h: number) => {
  const cr = 24;
  const nr = 24;
  const cutoutW = w * 0.63; // 63% based on 230/364 ratio
  const cutoutH = 188; // target height

  const cw = Math.min(cutoutW, w - cr - nr);
  const ch = Math.min(cutoutH, h - cr - nr);

  return `
    M ${cr} 0
    L ${w - cw - nr} 0
    A ${nr} ${nr} 0 0 1 ${w - cw} ${nr}
    L ${w - cw} ${ch - nr}
    A ${nr} ${nr} 0 0 0 ${w - cw + nr} ${ch}
    L ${w - cr} ${ch}
    A ${cr} ${cr} 0 0 1 ${w} ${ch + cr}
    L ${w} ${h - cr}
    A ${cr} ${cr} 0 0 1 ${w - cr} ${h}
    L ${cr} ${h}
    A ${cr} ${cr} 0 0 1 0 ${h - cr}
    L 0 ${cr}
    A ${cr} ${cr} 0 0 1 ${cr} 0
    Z
  `;
};

type Props = NativeStackScreenProps<MainStackParamList, 'BidRoom'>;

export const BidRoomScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId } = route.params;
  const { rooms, tickTimers } = useBidRoomStore();
  const [heroDim, setHeroDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      tickTimers();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTimers]);

  let room = rooms.find((r) => r.id === roomId);
  if (!room && rooms.length > 0) {
    room = rooms[0];
  }

  if (!room) return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Room not found</Text></View>;

  const sortedQuotes = [...room.quotes].sort((a, b) => a.onRoadTotal - b.onRoadTotal);
  const bestQuote = sortedQuotes[0];

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(p);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dealer Live Room</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroWrapper}>
          {/* Thick Blue Vertical Bar */}
          <View style={styles.blueVerticalBar}>
            {/* Scroll Indicator segment */}
            <View style={styles.scrollIndicator}>
              <View style={styles.scrollIndicatorSegment} />
              <View style={[styles.scrollIndicatorSegment, styles.scrollIndicatorSegmentSmall]} />
            </View>
          </View>

          {/* Elements Outside the Card (in the Cutout area) */}
          <View style={[styles.cutoutContent, { width: heroDim.width > 0 ? heroDim.width * 0.63 : 230 }]}>
            <View style={styles.titleTextCol}>
              <Text style={styles.carName} numberOfLines={1} adjustsFontSizeToFit>{room.carName}</Text>
              <Text style={styles.subtext} numberOfLines={1} adjustsFontSizeToFit>Budget ₹14L • Delhi NCR</Text>
            </View>

            {/* Color Pin with Dashed Line & Dot/Arrow */}
            <View style={styles.colorPinArea}>
              <Svg width={110} height={40} style={{ position: 'absolute', right: 55, top: 0 }}>
                <Circle cx={4} cy={4} r={3} fill="#3B82F6" />
                <Path d="M4 4 L76 4 L106 24" stroke="#3B82F6" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
                <Path d="M96 22 L106 24 L104 14" stroke="#3B82F6" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <View style={styles.colorBadge}>
                <View style={[styles.redDot, { backgroundColor: '#DC2626' }]} />
                <Text style={styles.colorBadgeText}>Red</Text>
              </View>
            </View>
          </View>

          {/* Hero Container */}
          <View 
            style={styles.heroContainer}
            onLayout={(e) => setHeroDim({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}
          >
            {heroDim.width > 0 && (
              <Svg style={StyleSheet.absoluteFill}>
                <Path d={generateHeroPath(heroDim.width, heroDim.height)} fill="#EBF1FF" />
              </Svg>
            )}

            {/* Top Row: Just Badge */}
            <View style={styles.titleRow}>
              <View style={styles.liveRoomBadge}>
                <View style={styles.redDot} />
                <Text style={styles.liveRoomText}>Live Room</Text>
              </View>
            </View>

            {/* Car Image Overlay (Removed for now) */}
            <View style={styles.carImageWrapper}>
              {/* <Group94Svg width={280} height={180} /> */}
            </View>

            {/* Best Bid Card Content */}
            <View style={styles.bestBidCard}>
              <View style={styles.watermarkContainer}>
                <CarBountyLightSvg width={220} height={70} />
              </View>

              <Text style={styles.bestBidLabel}>Best Bid</Text>
              <View style={styles.priceRow}>
                <Text style={styles.bestBidPrice}>{formatPrice(bestQuote?.onRoadTotal || 1318000)}</Text>
                <Text style={styles.exShowroom}> ex-showroom</Text>
              </View>

              <View style={styles.dealerInfoBox}>
                <View style={styles.dealerBoxLeft}>
                  <Text style={styles.dealerTitle}>Dealer #1</Text>
                  <Text style={styles.deliverySubtext}>7- day delivery</Text>
                </View>
                <View style={styles.dealerBoxDivider} />
                <View style={styles.dealerBoxRight}>
                  <View style={styles.timerRow}>
                    <Clock size={14} color="#F97316" />
                    <Text style={styles.timerText}> 57:59 Min</Text>
                  </View>
                  <Text style={styles.remainingText}>Remaining</Text>
                </View>
              </View>

              {/* Savings Bar */}
              <View style={styles.savingsBar}>
                <View style={styles.savingsGreen}>
                  <Image source={{ uri: 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4b0.png' }} style={styles.emojiSack} />
                  <Text style={styles.savingsGreenText}>You Save <Text style={styles.boldAmount}>₹42,000</Text></Text>
                </View>
                <View style={styles.budgetBox}>
                  <Text style={styles.budgetText}>Your Budget <Text style={styles.boldAmount}>₹14L</Text></Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Notification Toast */}
        <View style={styles.toastBanner}>
          <View style={styles.toastIconBox}>
            <TrendingDown size={20} color="#FFF" />
          </View>
          <View style={styles.toastTextCol}>
            <Text style={styles.toastTitle}>Bid Updated - Better Offer!</Text>
            <Text style={styles.toastSub}>
              <Text style={styles.toastDealer}>Dealer #2</Text> Dropped their price by <Text style={styles.toastDealer}>₹4,000</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.toastCloseBtn}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M18 6L6 18M6 6L18 18" stroke="#FFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* All Bids List */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.listTitle}>All Bids - Better Offer!</Text>
          <Text style={styles.dealerCount}>• 5 Dealers</Text>
        </View>

        <LiveBidCard
          rank={1}
          dealerName="Dealer #1"
          rating={4.8}
          dealsCount={47}
          price={1318000}
          timeAgo="2 Min ago"
          delivery="7 Days Delivery"
          hasTestDrive={true}
          perksCount={3}
          isWinning={true}
        />
        
        <LiveBidCard
          rank={2}
          dealerName="Dealer #2"
          rating={4.4}
          dealsCount={31}
          price={1318000}
          timeAgo="5 Min ago"
          delivery="10 Days Delivery"
          perksCount={1}
        />

        <LiveBidCard
          rank={3}
          dealerName="Dealer #3"
          rating={4.7}
          dealsCount={31}
          price={1329000}
          timeAgo="8 Min ago"
          delivery="15 Days Delivery"
          hasTestDrive={true}
          perksCount={2}
        />

        <LiveBidCard
          rank={4}
          dealerName="Dealer #4"
          rating={4.7}
          dealsCount={31}
          price={1344000}
          timeAgo="Just Now"
          delivery="Updating Bid..."
          statusText="Updating Bid..."
        />

      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC', // slightly lighter outer background
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#F8FAFC',
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#0F172A',
  },
  heroWrapper: {
    position: 'relative',
    marginBottom: 20,
    minHeight: 460,
  },
  blueVerticalBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 20,
    width: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  scrollIndicator: {
    width: 4,
    alignItems: 'center',
  },
  scrollIndicatorSegment: {
    width: 4,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 2,
    marginBottom: 8,
  },
  scrollIndicatorSegmentSmall: {
    height: 16,
    opacity: 0.5,
  },
  heroContainer: {
    backgroundColor: 'transparent',
    marginLeft: 36, // Space from the blue bar
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 20,
    minHeight: 430,
    position: 'relative',
    zIndex: 1, 
  },
  cutoutContent: {
    position: 'absolute',
    top: 0,
    right: 0, // Aligned with right edge of heroContainer
    height: 188, // Exact height of the cutout
    paddingTop: 20, // Match the padding of heroContainer
    paddingLeft: 12, // Subtle margin from the card edge
    zIndex: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  titleTextCol: {
    paddingTop: 2,
  },
  liveRoomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  redDot: {
    width: 6,
    height: 6,
    backgroundColor: '#FFF',
    borderRadius: 3,
    marginRight: 4,
  },
  liveRoomText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 10,
    color: '#FFF',
  },
  carName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20 * scale,
    color: '#0F172A',
  },
  subtext: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12 * scale,
    color: '#3B82F6',
    marginTop: 2,
  },
  colorPinArea: {
    position: 'absolute',
    right: 0,
    top: 98, // Adjust relative to heroWrapper

    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  colorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginTop: 18,
  },
  colorBadgeText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#0F172A',
  },
  carImageWrapper: {
    position: 'absolute',
    top: 55, // Adjust relative to heroWrapper
    left: -15, // Let it bleed out over the blue bar
    zIndex: 10,
    transform: [{ scale: 1.1 }],
  },
  bestBidCard: {
    marginTop: 180, // Space for the car
    position: 'relative',
  },
  watermarkContainer: {
    position: 'absolute',
    top: -60, // Moved up 30% more
    right: 0,
    opacity: 0.3,
  },
  bestBidLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#334155',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  bestBidPrice: {
    fontFamily: 'Outfit-Bold',
    fontSize: 32,
    color: '#3B82F6',
  },
  exShowroom: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  dealerInfoBox: {
    flexDirection: 'row',
    backgroundColor: '#2563EB1A',
    borderWidth: 1,
    borderColor: '#2563EB1A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  dealerBoxLeft: {
    flex: 1,
  },
  dealerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#0F172A',
  },
  deliverySubtext: {
    fontFamily: 'Outfit-Regular',
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
  },
  dealerBoxDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#94A3B8',
    marginHorizontal: 12,
  },
  dealerBoxRight: {
    flex: 1,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#F97316',
  },
  remainingText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
  },
  savingsBar: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    alignItems: 'center',
  },
  savingsGreen: {
    backgroundColor: '#207320',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: '100%',
    zIndex: 2,
  },
  budgetBox: {
    backgroundColor: '#2073201A',
    borderWidth: 1,
    borderColor: '#20732033',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingLeft: 22,
    marginLeft: -16,
    height: '100%',
    zIndex: 1,
  },
  budgetText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#166534',
  },
  boldAmount: {
    fontFamily: 'Outfit-Bold',
  },
  emojiSack: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  savingsGreenText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#FFF',
  },

  toastBanner: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  toastIconBox: {
    width: 36,
    height: 36,
    backgroundColor: '#60A5FA33', // light color card
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  toastTextCol: {
    flex: 1,
  },
  toastTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#FFF',
  },
  toastSub: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#E0E7FF',
    marginTop: 2,
  },
  toastDealer: {
    color: '#F97316', // Orange text for dealer name in toast
    fontFamily: 'Outfit-Bold',
  },
  toastCloseBtn: {
    width: 24,
    height: 24,
    backgroundColor: '#60A5FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
  },
  dealerCount: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#3B82F6',
  },
});
