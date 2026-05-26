import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { useAuthStore } from '../../store/authStore';
import { useBidRoomStore } from '../../store/bidRoomStore';
import { useNotificationStore } from '../../store/notificationStore';
import Svg, { Path, Rect, G, Defs, ClipPath } from 'react-native-svg';
import { formatPrice } from '../../utils/formatPrice';
import { TimerCountdown } from '../../components/common/TimerCountdown';
import {
  mockLiveBanners,
  mockFuelTypes,
  mockBrandCategories,
  mockCircularBrands,
  mockCertifiedCarDeals,
  mockRecentPurchases,
  mockMyPurchases,
} from '../../mocks/mockHomeData';

const { width: screenWidth } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuthStore();
  const { rooms, initializeRooms, tickTimers } = useBidRoomStore();
  const { unreadCount, initializeNotifications } = useNotificationStore();

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    initializeRooms();
    initializeNotifications();
  }, [initializeRooms, initializeNotifications]);

  useEffect(() => {
    const timer = setInterval(() => {
      tickTimers();
    }, 1000);
    return () => clearInterval(timer);
  }, [tickTimers]);

  const activeRooms = rooms.filter((r) => r.status === 'LIVE' || r.status === 'WAITING');

  const handleBannerScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveBannerIndex(Math.round(index));
  };

  return (
    <ScreenWrapper style={styles.wrapper} edges={['top', 'left', 'right']}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MainTabs', { screen: 'ProfileTab' } as any)}
            style={styles.avatarWrapper}
          >
            <AvatarWrapper sourceUrl={user?.avatarUrl} name={user?.name || 'Neha Sharma'} />
          </TouchableOpacity>
          <View style={styles.welcomeTextWrapper}>
            <Text style={styles.greeting}>Hi, {user?.name || 'Neha Sharma'}</Text>
            <View style={styles.locationContainer}>
              <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="#64748B"
                />
              </Svg>
              <Text style={styles.locationSub}>{user?.city || 'Delhi NCR'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('NotificationCenter')}
          style={styles.notificationBtn}
        >
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
              fill="#0F172A"
            />
          </Svg>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={styles.searchIcon}>
              <Path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                fill="#64748B"
              />
            </Svg>
            <TextInput
              style={styles.searchInput}
              placeholder="Search brand, model, Variant..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.filterBtn}>
              <Svg width={48} height={48} viewBox="0 0 50 50" fill="none">
                <Rect width={50} height={50} rx={25} fill="#2563EB" />
                <G clipPath="url(#clip0_11811_497)">
                  <Path
                    d="M13.75 19.2628H25.9615C26.2984 20.6238 27.5295 21.636 28.9931 21.636C30.4567 21.636 31.6878 20.6238 32.0246 19.2628H36.25C36.6642 19.2628 37 18.927 37 18.5128C37 18.0986 36.6642 17.7628 36.25 17.7628H32.0246C31.6878 16.4019 30.4567 15.3896 28.993 15.3896C27.5294 15.3896 26.2983 16.4019 25.9615 17.7628H13.75C13.3358 17.7628 13 18.0986 13 18.5128C13 18.927 13.3358 19.2628 13.75 19.2628ZM28.9931 16.8896C29.8881 16.8896 30.6163 17.6178 30.6163 18.5128C30.6163 19.4078 29.8881 20.136 28.9931 20.136C28.0981 20.136 27.3699 19.4078 27.3699 18.5128C27.3699 17.6178 28.0981 16.8896 28.9931 16.8896ZM13.75 25.7498H17.9754C18.3123 27.1107 19.5433 28.1229 21.007 28.1229C22.4706 28.1229 23.7017 27.1107 24.0385 25.7498H36.25C36.6642 25.7498 37 25.414 37 24.9998C37 24.5856 36.6642 24.2498 36.25 24.2498H24.0385C23.7016 22.8888 22.4705 21.8766 21.0069 21.8766C19.5433 21.8766 18.3122 22.8888 17.9754 24.2498H13.75C13.3358 24.2498 13 24.5856 13 24.9998C13 25.414 13.3358 25.7498 13.75 25.7498ZM21.0069 23.3766C21.9019 23.3766 22.6301 24.1047 22.6301 24.9998C22.6301 25.8948 21.9019 26.6229 21.0069 26.6229C20.1119 26.6229 19.3837 25.8948 19.3837 24.9998C19.3837 24.1047 20.1119 23.3766 21.0069 23.3766ZM36.25 30.7367H32.0246C31.6877 29.3757 30.4567 28.3635 28.993 28.3635C27.5294 28.3635 26.2983 29.3757 25.9615 30.7367H13.75C13.3358 30.7367 13 31.0725 13 31.4867C13 31.9009 13.3358 32.2367 13.75 32.2367H25.9615C26.2984 33.5977 27.5295 34.6099 28.9931 34.6099C30.4567 34.6099 31.6878 33.5977 32.0246 32.2367H36.25C36.6642 32.2367 37 31.9009 37 31.4867C37 31.0725 36.6642 30.7367 36.25 30.7367ZM28.9931 33.1099C28.0981 33.1099 27.3699 32.3817 27.3699 31.4867C27.3699 30.5917 28.0981 29.8635 28.9931 29.8635C29.8881 29.8635 30.6163 30.5917 30.6163 31.4867C30.6163 32.3817 29.8881 33.1099 28.9931 33.1099Z"
                    fill="white"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0_11811_497">
                    <Rect width={24} height={24} fill="white" transform="translate(13 13)" />
                  </ClipPath>
                </Defs>
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Slider Banners (API Banners with Floating Quote Pills) */}
        <View style={styles.bannerContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleBannerScroll}
            scrollEventThrottle={16}
          >
            {mockLiveBanners.map((banner, index) => (
              <View key={banner.id} style={styles.bannerSlide}>
                <View style={[styles.heroCard, { backgroundColor: index === 0 ? '#E8F0FE' : '#2563EB' }]}>
                  <View style={styles.heroTextWrapper}>
                    {banner.badge && (
                      <View style={[styles.bannerBadge, { backgroundColor: '#EA3356' }]}>
                        <Text style={styles.bannerBadgeText}>{banner.badge}</Text>
                      </View>
                    )}
                    <Text style={[styles.heroTitle, { color: index === 0 ? '#0F172A' : '#FFFFFF' }]}>
                      {banner.title}
                    </Text>
                    <Text style={[styles.heroSubtitle, { color: index === 0 ? '#64748B' : '#E2E8F0' }]}>
                      {banner.subtitle}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('Brand', { brandId: 'maruti', brandName: 'Maruti Suzuki' })}
                      style={[styles.heroCta, { backgroundColor: '#2563EB' }]}
                    >
                      <Text style={styles.heroCtaText}>{banner.ctaText}</Text>
                      <Text style={styles.heroCtaArrow}>→</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.heroIllustration}>
                    <Image source={{ uri: banner.illustrationUrl }} style={styles.bannerImage} resizeMode="contain" />
                    {/* Floating Quote Pills for Slide 1 */}
                    {index === 0 && (
                      <View style={styles.quotesContainer}>
                        <View style={[styles.quotePill, styles.quotePill1]}>
                          <Text style={styles.quotePillTitle}>Dealer Offer</Text>
                          <Text style={styles.quotePillPrice}>₹12.80L</Text>
                          <Text style={styles.quotePillTag}>Good Offer</Text>
                        </View>
                        <View style={[styles.quotePill, styles.quotePill2]}>
                          <Text style={[styles.quotePillTitle, { color: '#2563EB' }]}>Best Offer</Text>
                          <Text style={[styles.quotePillPrice, { color: '#2563EB' }]}>₹12.35L</Text>
                          <Text style={[styles.quotePillTag, { color: '#2563EB' }]}>Good Offer</Text>
                        </View>
                        <View style={[styles.quotePill, styles.quotePill3]}>
                          <Text style={styles.quotePillTitle}>Dealer Offer</Text>
                          <Text style={styles.quotePillPrice}>₹13.35L</Text>
                          <Text style={styles.quotePillTag}>Good Offer</Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.indicatorsWrapper}>
            {mockLiveBanners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicatorDot,
                  index === activeBannerIndex && styles.indicatorDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Browse by Fuel Section (Figma white cards y=230) */}
        <View style={styles.fuelSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Browse by Fuel</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'BrowseTab' } as any)}>
              <Text style={styles.viewAllLink}>View All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {mockFuelTypes.map((fuel) => (
              <TouchableOpacity
                key={fuel.id}
                activeOpacity={0.9}
                style={styles.fuelCard}
                onPress={() => navigation.navigate('FuelType', { fuelType: fuel.name })}
              >
                <View style={styles.fuelIconContainer}>
                  <Text style={styles.fuelIcon}>{fuel.emoji}</Text>
                </View>
                <Text style={styles.fuelNameText}>{fuel.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Browse by Brand Section (Figma circular brand logos y=635) */}
        <View style={styles.circularBrandsSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Browse by Brand</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'BrowseTab' } as any)}>
              <Text style={styles.viewAllLink}>View All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsScroll}
          >
            {mockCircularBrands.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                activeOpacity={0.8}
                style={styles.brandCol}
                onPress={() => navigation.navigate('Brand', { brandId: brand.id, brandName: brand.name })}
              >
                <View style={styles.circleBrand}>
                  <Image source={{ uri: brand.logoUrl }} style={styles.brandLogoImage} resizeMode="contain" />
                </View>
                <Text style={styles.brandNameText}>{brand.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Compare Models Promo card (Figma compare models y=1440) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Brand', { brandId: 'maruti', brandName: 'Maruti Suzuki' })}
          style={styles.compareBannerCard}
        >
          <View style={styles.compareIconContainer}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M9 3L5 7h3v10H5l4 4 4-4h-3V7h3L9 3zm6 14v-3h-3l4-4 4 4h-3v3h3l-4 4-4-4h3z"
                fill="#FFFFFF"
              />
            </Svg>
          </View>
          <View style={styles.compareContent}>
            <Text style={styles.compareTitle}>Compare Models</Text>
            <Text style={styles.compareSubtitle}>
              Pick any 2 cars Side-by-side specs, price & <Text style={styles.brandColorText}>CarBounty</Text> savings
            </Text>
          </View>
          <View style={styles.compareActionCircle}>
            <Text style={styles.compareActionText}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Browse by Body Type Section (Figma white categories y=488) */}
        <View style={styles.bodyTypeSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Browse by Body Type</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'BrowseTab' } as any)}>
              <Text style={styles.viewAllLink}>View All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {mockBrandCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                activeOpacity={0.9}
                style={styles.bodyTypeCard}
                onPress={() => navigation.navigate('BodyType', { bodyType: category.name })}
              >
                <Image source={{ uri: category.image }} style={styles.bodyTypeImage} resizeMode="contain" />
                <Text style={styles.bodyTypeName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Guaranteed Strip Discount strip (Figma green promo) */}
        <View style={styles.promoStripContainer}>
          <View style={styles.promoStrip}>
            <Text style={styles.promoEmoji}>🎁</Text>
            <Text style={styles.promoText} numberOfLines={2}>
              Get up to ₹50,000 cash discount guaranteed on your next bid purchase!
            </Text>
          </View>
        </View>

        {/* Your Bid Room Section (Figma horizontal sliders y=1077) */}
        <View style={styles.bidRoomsSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Your Bid Room</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'RoomTab' } as any)}>
              <Text style={styles.viewAllLink}>View All →</Text>
            </TouchableOpacity>
          </View>
          {activeRooms.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {activeRooms.map((room) => (
                <TouchableOpacity
                  key={room.id}
                  activeOpacity={0.95}
                  style={styles.roomSliderCard}
                  onPress={() => navigation.navigate('BidRoom', { roomId: room.id })}
                >
                  <View style={styles.roomImageContainer}>
                    <Image source={{ uri: room.image }} style={styles.roomCarImage} resizeMode="cover" />
                    <View style={styles.roomLiveBadge}>
                      <Text style={styles.roomLiveBadgeText}>• Live</Text>
                    </View>
                  </View>

                  <View style={styles.roomMetaContent}>
                    <View style={styles.roomLocationRow}>
                      <Text style={styles.roomLocationText}>📍 {room.city}</Text>
                    </View>
                    <Text style={styles.roomCarName}>{room.carName} {room.variantName}</Text>
                    <Text style={styles.roomCarSpecs}>{room.fuel} • {room.transmission} • Red</Text>

                    <View style={styles.roomStatsGrid}>
                      <View style={styles.roomStatCell}>
                        <Text style={styles.roomStatLabel}>Dealers</Text>
                        <Text style={styles.roomStatValue}>{room.dealersCount}</Text>
                      </View>
                      <View style={styles.roomStatCell}>
                        <Text style={styles.roomStatLabel}>Best Bid</Text>
                        <Text style={[styles.roomStatValue, { color: '#2563EB' }]}>
                          {room.bestBid > 0 ? `₹${(room.bestBid / 100000).toFixed(1)}L` : '—'}
                        </Text>
                      </View>
                      <View style={styles.roomStatCell}>
                        <Text style={styles.roomStatLabel}>Savings</Text>
                        <Text style={[styles.roomStatValue, { color: '#16A34A' }]}>
                          {room.savings > 0 ? `₹${(room.savings / 1000).toFixed(0)}K` : '—'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.roomCardDivider} />

                    <View style={styles.roomCardBottomRow}>
                      <View style={styles.roomTimeContainer}>
                        <Text style={styles.roomTimeLabel}>17:15 Min</Text>
                        <Text style={styles.roomTimeSub}>Remaining</Text>
                      </View>
                      <View style={styles.roomActionBtn}>
                        <Text style={styles.roomActionBtnText}>→</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyRoomsCard}>
              <Text style={styles.emptyRoomsEmoji}>🔍</Text>
              <Text style={styles.emptyRoomsTitle}>No Live Auctions</Text>
              <Text style={styles.emptyRoomsSub}>
                Start searching for models to create your first live bid intent.
              </Text>
            </View>
          )}
        </View>

        {/* Price Savings Average banner (Figma blue savings y=1440) */}
        <View style={styles.savingsBannerCard}>
          <View style={styles.savingsBannerContent}>
            <Text style={styles.savingsBannerTitle}>₹38,400</Text>
            <Text style={styles.savingsBannerSub}>
              Average savings per deal in <Text style={styles.orangeHighlightText}>Delhi NCR</Text> this month
            </Text>
          </View>
          <View style={styles.savingsGoldBagContainer}>
            <Text style={styles.goldCoinsEmoji}>💰</Text>
          </View>
        </View>

        {/* Recent NCR Purchases Live Feed section (y=1589) */}
        <View style={styles.recentPurchasesSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.recentTitleContainer}>
              <Text style={styles.sectionHeading}>Recent NCR Purchases</Text>
              <View style={styles.liveFeedBadge}>
                <Text style={styles.liveFeedBadgeText}>• Live Feed</Text>
              </View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {mockRecentPurchases.map((purchase) => (
              <View key={purchase.id} style={styles.purchaseFeedCard}>
                <View style={styles.purchaseTopHeader}>
                  <Image source={{ uri: purchase.imageUrl }} style={styles.purchaseThumbImage} resizeMode="cover" />
                  <View style={styles.purchaseHeaderTextContainer}>
                    <Text style={styles.purchaseModelName}>{purchase.modelName}</Text>
                    <Text style={styles.purchaseDealerSub}>{purchase.dealerName} • {purchase.city}</Text>
                  </View>
                  <View style={styles.purchaseRightBadgeBlock}>
                    <View style={styles.purchaseDoneBadge}>
                      <Text style={styles.purchaseDoneText}>• Done</Text>
                    </View>
                    <Text style={styles.purchaseDateText}>{purchase.date}</Text>
                  </View>
                </View>

                <View style={styles.purchaseStatsRow}>
                  <View style={styles.purchaseStatCol}>
                    <Text style={styles.purchaseStatLabel}>On-Road Price Paid</Text>
                    <Text style={styles.purchaseStatValue}>{purchase.onRoadPrice}</Text>
                  </View>
                  <View style={styles.purchaseStatCol}>
                    <Text style={styles.purchaseStatLabel}>Ex-Showroom</Text>
                    <Text style={styles.purchaseStatValue}>{purchase.exShowroom}</Text>
                  </View>
                  <View style={styles.purchaseStatCol}>
                    <Text style={styles.purchaseStatLabel}>Saved VIA CarBounty</Text>
                    <Text style={[styles.purchaseStatValue, { color: '#16A34A' }]}>{purchase.savings}</Text>
                  </View>
                </View>

                <View style={styles.purchasePerksStrip}>
                  <Text style={styles.purchasePerksText}>🎁 {purchase.perks}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Lock On-Road Price banner (y=1440) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('PriceLock', { orderId: 'order-1' })}
          style={styles.priceLockBanner}
        >
          <View style={styles.priceLockIndicator} />
          <View style={styles.priceLockContent}>
            <Text style={styles.priceLockTitle}>Lock On-Road Price</Text>
            <Text style={styles.priceLockSub}>Secure dealership rates and guard against price hikes.</Text>
          </View>
          <Text style={styles.priceLockArrow}>→</Text>
        </TouchableOpacity>

        {/* Antigravity Certified Deals Section (y=1589) */}
        <View style={styles.certifiedDealsSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Antigravity Certified Deals</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'BrowseTab' } as any)}>
              <Text style={styles.viewAllLink}>View All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {mockCertifiedCarDeals.map((deal) => (
              <TouchableOpacity
                key={deal.id}
                activeOpacity={0.9}
                style={styles.dealCard}
                onPress={() => navigation.navigate('Brand', { brandId: 'maruti', brandName: 'Maruti Suzuki' })}
              >
                <Image source={{ uri: deal.imageUrl }} style={styles.dealImage} resizeMode="cover" />
                <View style={styles.dealBadge}>
                  <Text style={styles.dealBadgeText}>{deal.badgeText}</Text>
                </View>
                <View style={styles.dealContent}>
                  <Text style={styles.dealBrand} numberOfLines={1}>{deal.brand}</Text>
                  <Text style={styles.dealModel} numberOfLines={1}>{deal.model}</Text>
                  <View style={styles.dealRatingRow}>
                    <Text style={styles.starIcon}>★</Text>
                    <Text style={styles.ratingText}>{deal.rating.toFixed(1)} verified</Text>
                  </View>
                  <View style={styles.dealPriceRow}>
                    <Text style={styles.dealPrice}>{deal.price}</Text>
                    <Text style={styles.dealSavings}>{deal.savings}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Green Savings Banner (y=2115) */}
        <View style={styles.bottomSavingsBanner}>
          <Text style={styles.bottomSavingsTitle}>Guaranteed 10% Extra Savings</Text>
          <Text style={styles.bottomSavingsSub}>
            Save big on Maruti, Hyundai, Tata & Kia car deals with direct dealer bidding.
          </Text>
        </View>

        {/* My Purchases Section (Figma horizontal scroll) */}
        <View style={styles.myPurchasesSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>My Purchases</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {mockMyPurchases.map((purchase) => (
              <View key={purchase.id} style={styles.myPurchaseCard}>
                <Image source={{ uri: purchase.imageUrl }} style={styles.myPurchaseImage} resizeMode="cover" />
                <View style={styles.myPurchaseContent}>
                  <Text style={styles.myPurchaseDate}>🕒 {purchase.date}</Text>
                  <Text style={styles.myPurchaseModel} numberOfLines={1}>{purchase.modelName}</Text>
                  <Text style={styles.myPurchaseDealer} numberOfLines={1}>{purchase.dealerName}</Text>
                  <View style={styles.myPurchaseSavingsRow}>
                    <View style={styles.myPurchaseSavingsBadge}>
                      <Text style={styles.myPurchaseSavingsText}>{purchase.savings}</Text>
                    </View>
                    <Text style={styles.myPurchasePriceText}>{purchase.priceOnRoad}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Smarter Deals. Better Decisions Branding Footer */}
        <View style={styles.brandingIllustrationBlock}>
          <Image
            source={require('../../../Group 33398.png')}
            style={styles.brandingFooterImage}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

// Internal Custom Avatar Component
const AvatarWrapper: React.FC<{ sourceUrl?: string; name: string }> = ({ sourceUrl, name }) => {
  return (
    <View style={styles.customAvatar}>
      {sourceUrl ? (
        <Image source={{ uri: sourceUrl }} style={styles.customAvatarImage} />
      ) : (
        <Text style={styles.customAvatarText}>{name.charAt(0)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F9F9FF',
  },
  scrollContent: {
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEEF3',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#EDEEF3',
    padding: 2,
    backgroundColor: '#FFFFFF',
  },
  customAvatar: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#0166FF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  customAvatarImage: {
    width: '100%',
    height: '100%',
  },
  customAvatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'Outfit',
  },
  welcomeTextWrapper: {
    marginLeft: 12,
  },
  greeting: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationSub: {
    fontFamily: 'Outfit',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
    fontWeight: '500',
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EDEEF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EA3356',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1.5,
    borderColor: 'rgba(194, 198, 216, 0.3)',
    borderRadius: 28,
    backgroundColor: '#F0F3FF',
    paddingLeft: 20,
    paddingRight: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    padding: 0,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    marginTop: 12,
    marginBottom: 20,
  },
  bannerSlide: {
    width: screenWidth,
    paddingHorizontal: 20,
  },
  heroCard: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200,
  },
  heroTextWrapper: {
    flex: 1.3,
  },
  bannerBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  heroTitle: {
    fontFamily: 'Outfit',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
  },
  heroSubtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 12,
    lineHeight: 16,
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    alignSelf: 'flex-start',
  },
  heroCtaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Inter',
  },
  heroCtaArrow: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 6,
  },
  heroIllustration: {
    flex: 0.8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bannerImage: {
    width: 120,
    height: 100,
  },
  quotesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  quotePill: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#EDEEF3',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  quotePill1: {
    top: 10,
    right: -10,
  },
  quotePill2: {
    top: 70,
    left: -20,
    borderColor: '#2563EB',
    backgroundColor: '#FFFFFF',
  },
  quotePill3: {
    bottom: 10,
    right: -10,
  },
  quotePillTitle: {
    fontSize: 8,
    fontFamily: 'Inter',
    color: '#64748B',
    fontWeight: '500',
  },
  quotePillPrice: {
    fontSize: 11,
    fontFamily: 'Outfit',
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 1,
  },
  quotePillTag: {
    fontSize: 8,
    fontFamily: 'Inter',
    color: '#64748B',
    fontWeight: '700',
  },
  indicatorsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicatorDot: {
    width: 14.8,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  indicatorDotActive: {
    width: 24,
    backgroundColor: '#2563EB',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionHeading: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  viewAllLink: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '700',
  },
  horizontalScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    paddingBottom: 4,
  },
  fuelSection: {
    marginBottom: 20,
  },
  fuelCard: {
    width: 86,
    height: 86,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuelIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  fuelIcon: {
    fontSize: 20,
  },
  fuelNameText: {
    fontFamily: 'Outfit',
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  circularBrandsSection: {
    marginBottom: 20,
  },
  brandsScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    paddingBottom: 4,
  },
  brandCol: {
    alignItems: 'center',
    marginRight: 16,
  },
  circleBrand: {
    width: 69,
    height: 69,
    borderRadius: 34.5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogoImage: {
    width: 44,
    height: 44,
  },
  brandNameTextText: {
    fontFamily: 'Outfit',
    fontSize: 12,
    color: '#475569',
    marginTop: 6,
    fontWeight: '600',
  },
  compareBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  compareIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  compareContent: {
    flex: 1,
  },
  compareTitle: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  compareSubtitle: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#E0EAFF',
    marginTop: 2,
    lineHeight: 14,
  },
  brandColorText: {
    color: '#FF9441',
    fontWeight: '700',
  },
  compareActionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compareActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bodyTypeSection: {
    marginBottom: 20,
  },
  bodyTypeCard: {
    width: 100,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  bodyTypeImage: {
    width: 70,
    height: 45,
    marginBottom: 4,
  },
  bodyTypeName: {
    fontFamily: 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  promoStripContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  promoStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#E6F4EA',
  },
  promoEmoji: {
    fontSize: 18,
    marginRight: 10,
  },
  promoText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#207320',
    fontWeight: '600',
    flex: 1,
    lineHeight: 16,
  },
  bidRoomsSection: {
    marginBottom: 24,
  },
  roomSliderCard: {
    width: 280,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    marginRight: 16,
    padding: 14,
  },
  roomImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
  },
  roomCarImage: {
    width: '100%',
    height: '100%',
  },
  roomLiveBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#E6F4EA',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  roomLiveBadgeText: {
    color: '#207320',
    fontSize: 10,
    fontWeight: '700',
  },
  roomMetaContent: {
    marginTop: 10,
  },
  roomLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomLocationText: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  roomCarName: {
    fontFamily: 'Outfit',
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  roomCarSpecs: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  roomStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  roomStatCell: {
    alignItems: 'center',
  },
  roomStatLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  roomStatValue: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Outfit',
    marginTop: 2,
  },
  roomCardDivider: {
    height: 1,
    backgroundColor: '#EDEEF3',
    marginVertical: 4,
  },
  roomCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  roomTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomTimeLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#D97706',
    fontWeight: '700',
    marginRight: 4,
  },
  roomTimeSub: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  roomActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomActionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyRoomsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    marginHorizontal: 20,
  },
  emptyRoomsEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyRoomsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  emptyRoomsSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  savingsBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  savingsBannerContent: {
    flex: 1.4,
  },
  savingsBannerTitle: {
    fontFamily: 'Outfit',
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  savingsBannerSub: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#E0EAFF',
    marginTop: 4,
    lineHeight: 16,
  },
  orangeHighlightText: {
    color: '#FF9441',
    fontWeight: '700',
  },
  savingsGoldBagContainer: {
    flex: 0.6,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  goldCoinsEmoji: {
    fontSize: 44,
  },
  recentPurchasesSection: {
    marginBottom: 24,
  },
  recentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveFeedBadge: {
    backgroundColor: '#E6F4EA',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  liveFeedBadgeText: {
    color: '#207320',
    fontSize: 10,
    fontWeight: '700',
  },
  purchaseFeedCard: {
    width: 320,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    marginRight: 16,
    padding: 14,
  },
  purchaseTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseThumbImage: {
    width: 60,
    height: 45,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  purchaseHeaderTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  purchaseModelName: {
    fontFamily: 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  purchaseDealerSub: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  purchaseRightBadgeBlock: {
    alignItems: 'flex-end',
  },
  purchaseDoneBadge: {
    backgroundColor: '#E6F4EA',
    borderRadius: 6,
    paddingVertical: 1,
    paddingHorizontal: 6,
  },
  purchaseDoneText: {
    color: '#207320',
    fontSize: 8,
    fontWeight: '700',
  },
  purchaseDateText: {
    fontSize: 8,
    fontFamily: 'Inter',
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },
  purchaseStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 12,
    marginBottom: 10,
  },
  purchaseStatCol: {
    alignItems: 'center',
    flex: 1,
  },
  purchaseStatLabel: {
    fontSize: 8,
    color: '#64748B',
    fontWeight: '600',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  purchaseStatValue: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'Outfit',
    marginTop: 2,
  },
  purchasePerksStrip: {
    backgroundColor: '#E0EAFF',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  purchasePerksText: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#2563EB',
    fontWeight: '600',
  },
  priceLockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  priceLockIndicator: {
    width: 4,
    height: '100%',
    backgroundColor: '#FF9441',
    borderRadius: 2,
    marginRight: 12,
  },
  priceLockContent: {
    flex: 1,
  },
  priceLockTitle: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  priceLockSub: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#E0EAFF',
    marginTop: 2,
    lineHeight: 14,
  },
  priceLockArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 12,
  },
  certifiedDealsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dealCard: {
    width: 200,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    marginRight: 12,
    overflow: 'hidden',
  },
  dealImage: {
    width: '100%',
    height: 120,
  },
  dealBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  dealBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  dealContent: {
    padding: 12,
  },
  dealBrand: {
    fontFamily: 'Outfit',
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  dealModel: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  dealRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starIcon: {
    color: '#F59E0B',
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#64748B',
  },
  dealPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  dealPrice: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#2563EB',
  },
  dealSavings: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: '#16A34A',
    fontWeight: '700',
  },
  bottomSavingsBanner: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(32, 115, 32, 0.08)',
    borderWidth: 1.2,
    borderColor: 'rgba(32, 115, 32, 0.15)',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bottomSavingsTitle: {
    fontFamily: 'Outfit',
    fontSize: 15,
    fontWeight: '800',
    color: '#207320',
    textAlign: 'center',
  },
  bottomSavingsSub: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#207320',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 14,
  },
  brandNameText: {
    fontFamily: 'Outfit',
    fontSize: 12,
    color: '#475569',
    marginTop: 6,
    fontWeight: '600',
  },
  myPurchasesSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  myPurchaseCard: {
    width: 175,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    marginRight: 12,
    overflow: 'hidden',
  },
  myPurchaseImage: {
    width: '100%',
    height: 105,
    backgroundColor: '#F8FAFC',
  },
  myPurchaseContent: {
    padding: 10,
  },
  myPurchaseDate: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
  },
  myPurchaseModel: {
    fontFamily: 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  myPurchaseDealer: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#2563EB',
    marginTop: 2,
    fontWeight: '600',
  },
  myPurchaseSavingsRow: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  myPurchaseSavingsBadge: {
    backgroundColor: '#E6F4EA',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  myPurchaseSavingsText: {
    color: '#207320',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  myPurchasePriceText: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  brandingIllustrationBlock: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 20,
  },
  brandingFooterImage: {
    width: screenWidth - 40,
    height: 180,
    alignSelf: 'center',
  },
});
