import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { BidRoomCard } from '../../components/cards/BidRoomCard';
import { PurchaseHistoryCard } from '../../components/cards/PurchaseHistoryCard';
import { Avatar } from '../../components/common/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useBidRoomStore } from '../../store/bidRoomStore';
import { useNotificationStore } from '../../store/notificationStore';
import { mockOrders } from '../../mocks/mockOrders';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuthStore();
  const { rooms, initializeRooms, tickTimers } = useBidRoomStore();
  const { unreadCount, initializeNotifications } = useNotificationStore();

  useEffect(() => {
    initializeRooms();
    initializeNotifications();
  }, [initializeRooms, initializeNotifications]);

  // Set up timer ticks for countdowns
  useEffect(() => {
    const timer = setInterval(() => {
      tickTimers();
    }, 1000);
    return () => clearInterval(timer);
  }, [tickTimers]);

  const activeRooms = rooms.filter((r) => r.status === 'LIVE' || r.status === 'WAITING');
  const pastOrders = mockOrders.filter((o) => o.status === 'DELIVERED');

  return (
    <ScreenWrapper style={styles.wrapper}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Avatar name={user?.name || 'User'} sourceUrl={user?.avatarUrl} size={42} />
          <View style={styles.welcomeTextWrapper}>
            <Text style={styles.greeting}>Hello, {user?.name || 'Guest'}</Text>
            <Text style={styles.locationSub}>{user?.city || 'Delhi NCR'}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('NotificationCenter')}
          style={styles.notificationBtn}
        >
          <Text style={styles.bellIcon}>🔔</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroTextWrapper}>
            <Text style={styles.heroTitle}>Buy Cars, Save Big</Text>
            <Text style={styles.heroSubtitle}>
              Post a bid requirement and let certified dealers compete live.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Brand', { brandId: 'maruti', brandName: 'Maruti Suzuki' })}
              style={styles.heroCta}
            >
              <Text style={styles.heroCtaText}>Create Intent</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroIllustration}>
            <Text style={styles.heroEmoji}>🏎️</Text>
          </View>
        </View>

        {/* Perks Strip */}
        <View style={styles.perksStrip}>
          <Text style={styles.giftIcon}>🎁</Text>
          <Text style={styles.perksText}>
            Up to ₹50,000 cash discount guaranteed on your next purchase!
          </Text>
        </View>

        {/* Active Bid Rooms Section */}
        <SectionHeader
          title="Your Active Bid Rooms"
          onViewAllPress={() => navigation.navigate('MainTabs', { screen: 'RoomTab' } as any)}
        />
        {activeRooms.length > 0 ? (
          activeRooms.map((room) => (
            <BidRoomCard
              key={room.id}
              room={room}
              onPress={() => navigation.navigate('BidRoom', { roomId: room.id })}
            />
          ))
        ) : (
          <View style={styles.emptyRoomsCard}>
            <Text style={styles.emptyRoomsEmoji}>🔍</Text>
            <Text style={styles.emptyRoomsTitle}>No Active Rooms</Text>
            <Text style={styles.emptyRoomsSub}>
              Start searching for models to create your first live bid intent.
            </Text>
          </View>
        )}

        {/* Past Purchases Section */}
        {pastOrders.length > 0 && (
          <View style={styles.pastPurchasesSection}>
            <SectionHeader
              title="Recent Purchases"
              onViewAllPress={() => navigation.navigate('PurchaseHistory')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {pastOrders.map((order) => (
                <PurchaseHistoryCard
                  key={order.id}
                  order={order}
                  onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeTextWrapper: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  locationSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '800',
  },
  heroCard: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTextWrapper: {
    flex: 1.3,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  heroSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginVertical: 8,
    lineHeight: 18,
  },
  heroCta: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  heroCtaText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  heroIllustration: {
    flex: 0.7,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 48,
  },
  perksStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    marginBottom: 20,
  },
  giftIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  perksText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    flex: 1,
  },
  emptyRoomsCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 24,
  },
  emptyRoomsEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyRoomsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyRoomsSub: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  pastPurchasesSection: {
    marginTop: 8,
  },
  horizontalScroll: {
    paddingBottom: 8,
  },
});
