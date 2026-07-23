import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { useBidRoomStore } from '../../store/bidRoomStore';
import { ArrowLeft, Clock, TrendingDown } from 'lucide-react-native';
import { LiveBidCard } from '../../components/cards/LiveBidCard';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, Rect } from 'react-native-svg';
import CoinBagIcon from '../../assets/coinbag.svg';

type Props = NativeStackScreenProps<MainStackParamList, 'BidRoom'>;

export const BidRoomScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId } = route.params;
  const { rooms, tickTimers } = useBidRoomStore();

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
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <TouchableOpacity 
          style={styles.heroCard} 
          activeOpacity={0.9} 
          onPress={() => navigation.navigate('CarDetails', { vehicleId: 'brezza' })}
        >
          {/* SVG Gradient Backgrounds */}
          <View style={[StyleSheet.absoluteFill, { borderRadius: 16, overflow: 'hidden' }]}>
            <Svg height="100%" width="100%" style={{ position: 'absolute' }}>
              <Defs>
                <LinearGradient id="cardGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                  <Stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
                  <Stop offset="100%" stopColor="#2563EB" stopOpacity="0.15" />
                </LinearGradient>
                <LinearGradient id="circleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
                  <Stop offset="100%" stopColor="#2563EB" stopOpacity="0.25" />
                </LinearGradient>
              </Defs>
              
              {/* Full Card Gradient */}
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#cardGrad)" />
              
              {/* Top Left Circle - Hard Shadow Layer */}
              <Circle cx="15" cy="22.22" r="75" fill="#2563EB" fillOpacity="0.3" />
              {/* Top Left Circle - Gradient Layer */}
              <Circle cx="15" cy="15" r="75" fill="url(#circleGrad)" />
            </Svg>
          </View>
          
          <View style={styles.cardBorderBox} pointerEvents="none" />

          {/* Top Info Row */}
          <View style={styles.heroTopRow}>
            <View style={styles.carImageContainer}>
              <Image 
                source={{ uri: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/123185/brezza-exterior-right-front-three-quarter-4.jpeg' }} 
                style={styles.carImage} 
                resizeMode="contain"
              />
            </View>
            <View style={styles.carInfoCol}>
              <Text style={styles.carName}>Maruti Brezza ZXI+</Text>
              <View style={styles.carSubtext}>
                <Text style={styles.textBlue}>Petrol • Automatic • </Text>
                <View style={styles.colorDot} />
                <Text style={styles.textBlue}>Red</Text>
              </View>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>

          {/* Best Bid Divider */}
          <View style={styles.bestBidDividerRow}>
            <Text style={styles.bestBidText}>Best Bid</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Price & Timer Row */}
          <View style={styles.priceTimerRow}>
            <View>
              <Text style={styles.priceLarge}>{formatPrice(bestQuote?.onRoadTotal || 1318000)}</Text>
              <Text style={styles.dealerSubtext}>Dealer #1 <Text style={styles.dot}>•</Text> 7- day delivery</Text>
            </View>
            
            <View style={styles.timerBox}>
              <View style={styles.timerRow}>
                <Clock size={16} color="#F47A1C" />
                <Text style={styles.timerValue}> 57:59 Min</Text>
              </View>
              <Text style={styles.remainingText}>Remaining</Text>
            </View>
          </View>

          {/* Savings & Budget Row */}
          <View style={styles.savingsRow}>
            <View style={styles.savingsPill}>
              <CoinBagIcon width={16} height={16} style={styles.savingsEmoji} />
              <Text style={styles.savingsText}>You Save <Text style={{ fontFamily: 'Outfit-Bold' }}>₹42,000</Text></Text>
            </View>
            <View style={styles.budgetPill}>
              <Text style={styles.budgetText}>Your Budget <Text style={{ fontFamily: 'Outfit-Bold' }}>₹14L</Text></Text>
            </View>
          </View>
        </TouchableOpacity>

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

        {/* All Bids List Header */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.listTitle}>All Bids - Better Offer!</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.dealerCountDot} />
            <Text style={styles.dealerCount}>5 Dealers</Text>
          </View>
        </View>

        {/* Live Bid Cards */}
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
          dealerName="Dealer # 2"
          rating={4.4}
          dealsCount={31}
          price={1318000}
          timeAgo="5 Min ago"
          delivery="10 Days Delivery"
          perksCount={1}
        />

        <LiveBidCard
          rank={3}
          dealerName="Dealer # 3"
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
          dealerName="Dealer # 3" 
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
    backgroundColor: '#EEF2FF', // matches the light blue background of the entire screen
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#EEF2FF',
  },
  backBtn: {
    width: 48,
    height: 48,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: '#0F172A',
  },
  heroCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  cardBgWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'absolute',
  },
  cardBorderBox: {
    ...StyleSheet.absoluteFill,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D9E2FC',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  carImageContainer: {
    width: 90,
    height: 60,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  carInfoCol: {
    flex: 1,
  },
  carName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#0F172A',
  },
  carSubtext: {
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBlue: {
    color: '#3B82F6',
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginHorizontal: 4,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BA1A1A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFF',
    marginRight: 4,
  },
  liveText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 12,
    color: '#FFF',
  },
  bestBidDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bestBidText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#0F172A',
    marginRight: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#BFDBFE',
  },
  priceTimerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLarge: {
    fontFamily: 'Outfit-Bold',
    fontSize: 26,
    color: '#3B82F6',
  },
  dealerSubtext: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#0F172A',
    marginTop: 2,
  },
  dot: {
    color: '#94A3B8',
  },
  timerBox: {
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
    paddingLeft: 12,
    alignItems: 'flex-start',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerValue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#F47A1C',
  },
  remainingText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  savingsRow: {
    flexDirection: 'row',
    height: 36,
  },
  savingsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#207320',
    borderRadius: 18,
    paddingHorizontal: 12,
    zIndex: 2,
  },
  savingsEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  savingsText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#FFF',
  },
  budgetPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2073201A',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    paddingHorizontal: 12,
    paddingLeft: 24, // extra padding to slide under savings pill
    marginLeft: -16,
    borderWidth: 1,
    borderColor: '#20732033',
    borderLeftWidth: 0,
    zIndex: 1,
  },
  budgetText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#16A34A',
  },
  toastBanner: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  toastIconBox: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: '#93C5FD',
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
    color: '#F97316',
    fontFamily: 'Outfit-Bold',
  },
  toastCloseBtn: {
    width: 28,
    height: 28,
    backgroundColor: '#60A5FA',
    borderRadius: 14,
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
  dealerCountDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginRight: 6,
  },
  dealerCount: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#3B82F6',
  },
});

export default BidRoomScreen;
