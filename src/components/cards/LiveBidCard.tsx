import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Car, Gift, Star, ArrowDown, ArrowUp, CheckCircle2, Settings, MessageCircle, Check, Zap, User, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';

import TestDriveIcon from '../../assets/testdrive.svg';
import ShieldIcon from '../../assets/shield.svg';
import GearsIcon from '../../assets/gears.svg';
import MechanicHandIcon from '../../assets/mechanichand.svg';
import TestDriveCarIcon from '../../assets/testdrivecar.svg';
import GiftIcon from '../../assets/gift.svg';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface LiveBidCardProps {
  rank: number;
  dealerName: string;
  rating: number;
  dealsCount: number;
  price: number;
  timeAgo: string;
  delivery: string;
  perksCount?: number;
  hasTestDrive?: boolean;
  isWinning?: boolean;
  onPress?: () => void;
  statusText?: string;
}

export const LiveBidCard: React.FC<LiveBidCardProps> = ({
  rank,
  dealerName,
  rating,
  dealsCount,
  price,
  timeAgo,
  delivery,
  perksCount,
  hasTestDrive,
  isWinning,
  onPress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    if (onPress) onPress();
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={handlePress} 
      style={[
        styles.cardContainer,
        isWinning ? styles.cardWinning : styles.cardRegular
      ]}
    >
      {/* Top Section */}
      <View style={styles.cardHeader}>
        {/* Left Side: Rank and Dealer Info */}
        <View style={styles.headerLeft}>
          <View style={[styles.rankBadge, !isWinning && styles.rankBadgeRegular]}>
            <Text style={styles.rankText}>#{rank}</Text>
          </View>
          <View style={styles.dealerInfoCol}>
            <View style={styles.dealerNameLine}>
              <Text style={styles.dealerName}>{dealerName}</Text>
              <Text style={styles.divider}>|</Text>
              <Star size={14} color="#FACC15" fill="#FACC15" />
              <Text style={styles.ratingText}> {rating}</Text>
            </View>
            <Text style={styles.dealsText}>{dealsCount} Successful deals</Text>
          </View>
        </View>

        {/* Right Side: Price, Time and Caret */}
        <View style={styles.headerRight}>
          <Text style={[styles.priceText, isWinning && styles.priceWinning]}>
            {formattedPrice}
          </Text>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{timeAgo}</Text>
            {isExpanded ? (
              <ChevronUp size={20} color="#000" style={styles.caretIcon} />
            ) : (
              <ChevronDown size={20} color="#000" style={styles.caretIcon} />
            )}
          </View>
        </View>
      </View>

      {/* Footer Section: Tags and Delivery */}
      <View style={styles.cardFooter}>
        <View style={styles.tagsRow}>
          {hasTestDrive && (
            <View style={styles.tagPill}>
              <TestDriveCarIcon width={16} height={16} style={styles.tagIcon} />
              <Text style={styles.tagText}>Test Drive</Text>
            </View>
          )}
          {!!perksCount && (
            <View style={styles.tagPill}>
              <GiftIcon width={16} height={16} style={styles.tagIcon} />
              <Text style={styles.tagText}>{perksCount} Perks</Text>
            </View>
          )}
        </View>
        <Text style={styles.deliveryText}>{delivery}</Text>
      </View>

      {/* Expanded Content Layer */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={[styles.dividerLine, isWinning && { backgroundColor: '#207320' }]} />
          
          <Text style={[styles.sectionTitle, { color: '#207320' }]}>Price Breakdown</Text>
          <View style={styles.priceRowItem}>
            <Text style={styles.priceRowLabel}>Ex-Showroom</Text>
            <Text style={styles.priceRowValue}>₹13,18,900</Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={styles.priceRowLabel}>Registration (RTO)</Text>
            <Text style={styles.priceRowValue}>₹78,000</Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={styles.priceRowLabel}>Insurance (Comprehensive)</Text>
            <Text style={styles.priceRowValue}>₹52,000</Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={styles.priceRowLabel}>Hypothecation</Text>
            <Text style={styles.priceRowValue}>₹1,500</Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={styles.priceRowLabel}>Dealer Discount Applied</Text>
            <Text style={styles.priceRowDiscount}>-₹42,000</Text>
          </View>
          
          <View style={[styles.dividerLine, { marginVertical: 12 }]} />
          <View style={styles.priceRowItem}>
            <Text style={styles.onRoadLabel}>On-Road Total</Text>
            <Text style={styles.onRoadValue}>₹13,18,000</Text>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Perks Offered</Text>
          <View style={styles.testDriveBox}>
            <TestDriveIcon width={44} height={44} style={{ marginRight: 12 }} />
            <View style={styles.testDriveTextCol}>
              <Text style={styles.testDriveTitle}>Free Test Drive</Text>
              <Text style={styles.testDriveSub}>at your preferred location or showroom</Text>
            </View>
          </View>

          <View style={styles.perkListItem}>
            <ShieldIcon width={20} height={20} style={styles.perkIcon} />
            <Text style={styles.perkListText}>5-year extended warranty (₹18,000 Value)</Text>
          </View>
          <View style={styles.perkListItem}>
            <GearsIcon width={20} height={20} style={styles.perkIcon} />
            <Text style={styles.perkListText}>Free accessories kit -- mats, covers, camera (₹12,000)</Text>
          </View>
          <View style={styles.perkListItem}>
            <MechanicHandIcon width={20} height={20} style={styles.perkIcon} />
            <Text style={styles.perkListText}>3 free services at dealership</Text>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Delivery Details</Text>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
            <Text style={styles.deliveryValueBold}>₹13,18,900</Text>
          </View>
          
          <View style={styles.colorSelectionRow}>
            <Text style={styles.deliveryLabel}>Color Available</Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioOption}>
                <View style={styles.radioCircleOutline} />
                <Text style={styles.radioText}>Silver</Text>
              </View>
              <View style={styles.radioOption}>
                <View style={styles.radioCircleOutline} />
                <Text style={styles.radioText}>White</Text>
              </View>
              <View style={styles.radioOption}>
                <View style={[styles.radioCircleFilled, { backgroundColor: '#BA1A1A' }]} />
                <Text style={styles.radioText}>Red</Text>
              </View>
            </View>
          </View>
          
          <View style={[styles.dividerLine, { marginVertical: 16 }]} />

          <TouchableOpacity style={styles.askDealerBtn}>
            <MessageCircle size={16} color="#3B82F6" style={styles.btnIcon} />
            <Text style={styles.askDealerText}>Ask Dealer a Question</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.selectBidBtn}
            onPress={() => navigation.navigate('DealLockStep1')}
          >
            <Check size={18} color="#FFF" style={styles.btnIcon} />
            <Text style={styles.selectBidText}>Select This Bid</Text>
          </TouchableOpacity>
          <Text style={styles.btnSubtext}>WhatsApp group - Discuss -Pay later</Text>

          <TouchableOpacity style={styles.instantBookBtn} onPress={() => navigation.navigate('DealBooked')}>
            <Zap size={16} color="#FFF" fill="#FFF" style={{marginRight: 6}} />
            <Text style={styles.instantBookText}>Instant Book</Text>
          </TouchableOpacity>
          <Text style={styles.btnSubtext}>Pay ₹10,000 now - Lock instantly</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
  },
  cardWinning: {
    backgroundColor: '#E8EEEE', // updated to match requested background
    borderColor: '#207320', // dark green border
  },
  cardRegular: {
    backgroundColor: '#ECF0FE',
    borderColor: '#D9E2FC',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  rankBadge: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#207320', // winning green
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankBadgeRegular: {
    backgroundColor: '#64748B', // gray for non-winning
  },
  rankText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#FFF',
  },
  dealerInfoCol: {
    justifyContent: 'center',
  },
  dealerNameLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealerName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
  },
  divider: {
    color: '#94A3B8',
    marginHorizontal: 8,
    fontSize: 16,
  },
  ratingText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
  dealsText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#0F172A',
  },
  priceWinning: {
    color: '#207320',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timeText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
    color: '#64748B',
  },
  caretIcon: {
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagIcon: {
    marginRight: 6,
  },
  tagText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 12,
    color: '#0F172A',
  },
  deliveryText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#0F172A',
  },
  
  // Expanded Styles (Retained exactly as before)
  expandedContent: {
    marginTop: 16,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#CBD5E1',
    marginVertical: 12,
  },
  sectionTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 12,
  },
  priceRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceRowLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  priceRowValue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#0F172A',
  },
  priceRowDiscount: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#F97316',
  },
  onRoadLabel: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
  },
  onRoadValue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#3B82F6',
  },
  testDriveBox: {
    flexDirection: 'row',
    backgroundColor: '#2073201A', 
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#20732033',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FECACA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testDriveTextCol: {
    flex: 1,
  },
  testDriveTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#0F172A',
  },
  testDriveSub: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  perkListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  perkIcon: {
    marginRight: 8,
  },
  perkListText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#0F172A',
    flex: 1,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  deliveryLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  deliveryValueBold: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#0F172A',
  },
  colorSelectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  radioCircleOutline: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    marginRight: 4,
  },
  radioCircleFilled: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 4,
  },
  radioText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#0F172A',
  },
  askDealerBtn: {
    flexDirection: 'row',
    backgroundColor: '#DBEAFE',
    borderWidth: 1,
    borderColor: '#93C5FD',
    borderRadius: 24,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  askDealerText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#2563EB',
  },
  btnIcon: {
    marginRight: 8,
  },
  selectBidBtn: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    borderRadius: 24,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBidText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#FFF',
  },
  instantBookBtn: {
    flexDirection: 'row',
    backgroundColor: '#F97316',
    borderRadius: 24,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  instantBookText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#FFF',
  },
  btnSubtext: {
    fontFamily: 'Outfit-Regular',
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
});
