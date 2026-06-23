import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Car, Gift, Star, ArrowDown, ArrowUp, CheckCircle2, Settings, MessageCircle, Check, Zap, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';

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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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

  const handleLayout = (e: LayoutChangeEvent) => {
    setDimensions(e.nativeEvent.layout);
  };

  const generatePath = (w: number, h: number) => {
    if (w === 0 || h === 0) return '';
    const cr = 12; // corner radius
    
    // Precise dimensions from Figma
    const ir = 11.77;
    const or = 9.29;
    const notchW = 21.06;
    const flatH = 23;
    const notchY = isExpanded ? 50.37 : h / 2;
    const startY = notchY - flatH / 2 - ir - or;

    return `
      M ${cr} 0
      L ${w - cr} 0
      A ${cr} ${cr} 0 0 1 ${w} ${cr}
      
      L ${w} ${startY}
      A ${or} ${or} 0 0 1 ${w - or} ${startY + or}
      A ${ir} ${ir} 0 0 0 ${w - notchW} ${startY + or + ir}
      
      L ${w - notchW} ${notchY + flatH / 2}
      
      A ${ir} ${ir} 0 0 0 ${w - or} ${notchY + flatH / 2 + ir}
      A ${or} ${or} 0 0 1 ${w} ${notchY + flatH / 2 + ir + or}
      
      L ${w} ${h - cr}
      A ${cr} ${cr} 0 0 1 ${w - cr} ${h}
      L ${cr} ${h}
      A ${cr} ${cr} 0 0 1 0 ${h - cr}
      L 0 ${cr}
      A ${cr} ${cr} 0 0 1 ${cr} 0
      Z
    `;
  };

  const cardBg = isWinning ? '#F0FDF4' : '#EBF1FF';
  const cardBorder = isWinning ? '#207320' : '#E2E8F0';

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={handlePress} 
      style={styles.cardContainer}
      onLayout={handleLayout}
    >
      {/* SVG Background Layer */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <View style={StyleSheet.absoluteFill}>
          <Svg width={dimensions.width} height={dimensions.height} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
            <Path 
              d={generatePath(dimensions.width, dimensions.height)} 
              fill={cardBg} 
              stroke={cardBorder} 
              strokeWidth={1.5} 
            />
          </Svg>
        </View>
      )}

      {/* Content Layer */}
      <View style={styles.contentWrapper}>
        <View style={styles.leftContent}>
          {/* Top Row: Rank & Dealer */}
          <View style={styles.dealerRow}>
            <View style={styles.rankBadge}>
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

          {/* Tags Row */}
          <View style={styles.tagsRow}>
            {hasTestDrive && (
              <View style={styles.tagPill}>
                <Car size={14} color="#EF4444" style={styles.tagIcon} />
                <Text style={styles.tagText}>Test Drive</Text>
              </View>
            )}
            {!!perksCount && (
              <View style={styles.tagPill}>
                <Gift size={14} color="#F59E0B" style={styles.tagIcon} />
                <Text style={styles.tagText}>{perksCount} Perks</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.rightContent}>
          {/* Price & Delivery */}
          <Text style={[styles.priceText, isWinning && styles.priceWinning]}>
            {formattedPrice}
          </Text>
          <Text style={styles.timeText}>{timeAgo}</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.deliveryText}>{delivery}</Text>
        </View>
      </View>

      {/* Expanded Content Layer */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.dividerLine} />
          
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
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
          
          <View style={styles.dividerLine} />
          <View style={styles.priceRowItem}>
            <Text style={styles.onRoadLabel}>On-Road Total</Text>
            <Text style={styles.onRoadValue}>₹13,18,000</Text>
          </View>

          <Text style={styles.sectionTitle}>Perks Offered</Text>
          <View style={styles.testDriveBox}>
            <View style={styles.avatarCircle}>
              <User size={20} color="#3B82F6" />
            </View>
            <View style={styles.testDriveTextCol}>
              <Text style={styles.testDriveTitle}>Free Test Drive</Text>
              <Text style={styles.testDriveSub}>at your preferred location or showroom</Text>
            </View>
          </View>

          <View style={styles.perkListItem}>
            <CheckCircle2 size={16} color="#3B82F6" style={styles.perkIcon} />
            <Text style={styles.perkListText}>5-year extended warranty (₹18,000 Value)</Text>
          </View>
          <View style={styles.perkListItem}>
            <Settings size={16} color="#3B82F6" style={styles.perkIcon} />
            <Text style={styles.perkListText}>Free accessories kit -- mats, covers, camera (₹12,000)</Text>
          </View>
          <View style={styles.perkListItem}>
            <Star size={16} color="#F59E0B" style={styles.perkIcon} />
            <Text style={styles.perkListText}>3 free services at dealership</Text>
          </View>

          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
            <Text style={styles.deliveryValueBold}>7 Days</Text>
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
                <View style={[styles.radioCircleFilled, { backgroundColor: '#DC2626' }]} />
                <Text style={styles.radioText}>Red</Text>
              </View>
            </View>
          </View>

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
            <Zap size={14} color="#F59E0B" fill="#F59E0B" style={{marginRight: 4}} />
            <Text style={styles.instantBookText}>Instant Book</Text>
          </TouchableOpacity>
          <Text style={styles.btnSubtext}>Pay ₹10,000 now - Lock instantly</Text>
        </View>
      )}

      {/* Elongated Arrow Pill */}
      {dimensions.height > 0 && (
        <View style={[
          styles.arrowPill, 
          isWinning ? styles.arrowWinning : styles.arrowRegular,
          { top: isExpanded ? 50.37 - 20.5 : (dimensions.height / 2) - 20.5 } // Centered vertically (41 / 2 = 20.5)
        ]}>
          {isExpanded ? (
            <ArrowUp size={16} color="#FFF" strokeWidth={2.5} />
          ) : (
            <ArrowDown size={16} color="#FFF" strokeWidth={2.5} />
          )}
        </View>
      )}

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
    marginRight: 10, // Ensure arrow pill doesn't clip
    position: 'relative',
    overflow: 'visible',
    minHeight: 90,
  },
  contentWrapper: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    paddingRight: 24, // Keep text away from the cutout
  },
  leftContent: {
    flex: 1,
  },
  dealerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#207320',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
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
    color: '#CBD5E1',
    marginHorizontal: 6,
    fontSize: 16,
  },
  ratingText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
  dealsText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 11,
    color: '#0F172A',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  priceText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: '#0F172A',
  },
  priceWinning: {
    color: '#207320',
  },
  timeText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  deliveryText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#0F172A',
    marginBottom: 4,
  },
  arrowPill: {
    position: 'absolute',
    right: 0,
    width: 18,
    height: 41,
    borderRadius: 9, // Width / 2 for perfect semi-circles
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowWinning: {
    backgroundColor: '#207320',
  },
  arrowRegular: {
    backgroundColor: '#3B82F6',
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingRight: 32, // to keep away from cutout column
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#E2E8F0',
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
    backgroundColor: '#DCFCE7', // or '#D1FAE5'
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
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
