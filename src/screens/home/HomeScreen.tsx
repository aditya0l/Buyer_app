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
import Svg, { Path, Rect, G, Defs, ClipPath, LinearGradient, Stop, Polygon } from 'react-native-svg';
import { formatPrice } from '../../utils/formatPrice';
import { TimerCountdown } from '../../components/common/TimerCountdown';
import WaveSvg from '../../../wave.svg';
import Group94Svg from '../../../Group 94.svg';
import Rectangle1051Svg from '../../../Rectangle 1051.svg';
import PetrolSvg from '../../../petrol.svg';
import ElectricSvg from '../../../electric.svg';
import DieselSvg from '../../../diesel.svg';
import HybridSvg from '../../../hybrid.svg';
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

const CoinsBagSvg: React.FC = () => (
  <Svg width={50} height={52} viewBox="0 0 50 52" fill="none">
    <Path d="M19.8274 14.9783V6.17479C19.8274 4.71048 17.3188 3.52844 14.2239 3.52844C11.1291 3.52844 8.62048 4.71048 8.62048 6.17479V15.8869C5.72392 15.9928 3.44806 17.1307 3.44806 18.5244V41.6624C1.4222 42.0593 -0.000213623 43.0032 -0.000213623 44.1058V48.5164C-0.000213623 49.9807 2.50841 51.1628 5.60323 51.1628C8.69806 51.1628 11.2067 49.9807 11.2067 48.5164V46.7522C11.2067 48.2165 13.7153 49.3985 16.8101 49.3985C19.905 49.3985 22.4136 48.2165 22.4136 46.7522L22.8446 35.2847L19.8274 14.9783Z" fill="#F29C1F"/>
    <Path d="M47.006 11.7808C46.944 11.6855 45.7465 9.93539 42.2646 9.13443C42.7048 8.7641 43.0615 8.30083 43.3105 7.77633C43.5594 7.25183 43.6946 6.67848 43.7069 6.09553C43.7069 4.0155 41.9776 2.19922 39.5957 1.77757C39.373 1.74341 39.1461 1.79978 38.9635 1.93461C38.7808 2.06944 38.657 2.27203 38.6185 2.49906C38.58 2.72609 38.6298 2.95952 38.7573 3.14944C38.8849 3.33936 39.0799 3.47069 39.3009 3.51534C40.8509 3.79321 41.9827 4.87557 41.9827 6.09553C41.9827 7.54044 40.4526 8.72777 38.5345 8.74189C37.7797 8.7509 37.037 8.54801 36.3871 8.15528C36.1917 8.03374 35.9571 7.99659 35.735 8.05201C35.5129 8.10743 35.3213 8.25088 35.2026 8.45079C35.0838 8.6507 35.0475 8.8907 35.1017 9.118C35.1558 9.3453 35.296 9.54128 35.4914 9.66282C36.4047 10.2159 37.4473 10.5058 38.5086 10.5017C38.5172 10.5017 38.5233 10.5061 38.531 10.5061C43.8871 10.5061 45.5345 12.7114 45.5793 12.7705C45.7076 12.9642 45.9058 13.0979 46.1303 13.142C46.3549 13.1862 46.5874 13.1373 46.7767 13.006C46.966 12.8748 47.0966 12.672 47.1398 12.4422C47.183 12.2124 47.1343 11.9745 47.006 11.7808Z" fill="#F3D55B"/>
    <Path d="M38.9568 45.8701H22.4137V35.2847C22.4137 33.8204 19.9051 32.6383 16.8102 32.6383C16.0872 32.6353 15.3655 32.7033 14.6551 32.8412V23.235C15.9107 20.2034 17.6596 17.4116 19.8275 14.9784V14.9695C21.627 12.9116 23.7695 11.1972 26.1551 9.90619V9.89737C26.8921 10.3561 27.7404 10.5942 28.6033 10.5854H33.4309C34.2973 10.5916 35.1482 10.3503 35.8878 9.88855C37.7671 10.8412 46.2413 15.8164 49.3016 29.1099C52.7499 44.1059 42.4051 45.8701 38.9568 45.8701Z" fill="#A56A43"/>
    <Path d="M38.9569 43.2237C38.7283 43.2237 38.509 43.1308 38.3473 42.9653C38.1856 42.7999 38.0948 42.5755 38.0948 42.3416C38.0948 42.1076 38.1856 41.8833 38.3473 41.7178C38.509 41.5524 38.7283 41.4595 38.9569 41.4595C39.5802 41.4595 42.7715 41.3492 44.4534 39.1757C45.2488 38.0257 45.6729 36.6502 45.6664 35.2414C45.6948 34.7571 46.0957 34.3858 46.569 34.4025C46.6821 34.4081 46.793 34.4364 46.8954 34.4858C46.9978 34.5352 47.0897 34.6048 47.1658 34.6905C47.242 34.7763 47.3008 34.8766 47.3391 34.9856C47.3774 35.0947 47.3942 35.2104 47.3888 35.3261C47.3815 37.1036 46.8277 38.8337 45.806 40.2712C43.6302 43.0817 39.719 43.2237 38.9569 43.2237Z" fill="#FDD7AD"/>
    <Path d="M39.6548 1.03208C39.6635 2.97273 39.2841 7.2069 36.2497 9.63272C36.136 9.72794 36.0149 9.8135 35.8876 9.88853C35.148 10.3502 34.2971 10.5916 33.4307 10.5854H28.6031C27.7402 10.5948 26.892 10.3564 26.1548 9.89735C26.0259 9.81723 26.0259 9.72884 25.7841 9.63272C22.7497 7.2069 22.379 2.97273 22.379 1.03208C22.3797 0.887601 22.415 0.745513 22.482 0.618301C22.5489 0.491089 22.6454 0.382647 22.7628 0.302505C22.8803 0.222364 23.0152 0.172976 23.1557 0.158682C23.2962 0.144388 23.438 0.165626 23.5686 0.220529C24.6721 0.696872 25.0428 1.76423 26.7152 1.76423C28.8617 1.76423 28.8617 0 31.0083 0C33.1548 0 33.1635 1.76423 35.3186 1.76423C36.991 1.76423 37.3617 0.688051 38.4652 0.220529C38.5958 0.165626 38.7376 0.144388 38.8781 0.158682C39.0186 0.172976 39.1535 0.222364 39.271 0.302505C39.3884 0.382647 39.4849 0.491089 39.5518 0.618301C39.6188 0.745513 39.6541 0.887601 39.6548 1.03208Z" fill="#805333"/>
    <Path d="M31.422 10.5697C32.4256 9.12656 33.1807 7.51854 33.6548 5.81508C33.7165 5.58931 33.8633 5.39789 34.063 5.28292C34.2627 5.16794 34.4988 5.13884 34.7194 5.20201C34.9401 5.26517 35.1271 5.41544 35.2395 5.61974C35.3518 5.82405 35.3803 6.06566 35.3186 6.29142C34.8484 7.90686 34.1669 9.44983 33.2927 10.8784L36.172 13.6306C36.3389 13.7909 36.4368 14.0124 36.444 14.2465C36.4513 14.4806 36.3674 14.708 36.2108 14.8788C36.0542 15.0496 35.8377 15.1497 35.6089 15.1572C35.3802 15.1646 35.1579 15.0788 34.991 14.9185L31.8961 11.9634V14.8744C31.8961 15.1084 31.8053 15.3327 31.6436 15.4982C31.482 15.6636 31.2627 15.7565 31.0341 15.7565C30.8054 15.7565 30.5862 15.6636 30.4245 15.4982C30.2628 15.3327 30.172 15.1084 30.172 14.8744V11.9634L27.0858 14.9185C26.9189 15.0788 26.6966 15.1646 26.4678 15.1572C26.2391 15.1497 26.0226 15.0496 25.866 14.8788C25.7094 14.708 25.6255 14.4806 25.6327 14.2465C25.64 14.0124 25.7379 13.7909 25.9048 13.6306L28.7927 10.8784C27.9152 9.45046 27.2308 7.90743 26.7582 6.29142C26.7281 6.17963 26.7199 6.06287 26.7339 5.94782C26.748 5.83276 26.7841 5.72167 26.8401 5.6209C26.8962 5.52013 26.9711 5.43165 27.0606 5.36053C27.15 5.28941 27.2524 5.23704 27.3617 5.20642C27.4703 5.17413 27.5842 5.16431 27.6966 5.17752C27.8091 5.19073 27.9178 5.22672 28.0165 5.28337C28.1152 5.34002 28.2019 5.41621 28.2715 5.5075C28.3411 5.59879 28.3923 5.70335 28.422 5.81508C28.9021 7.51831 29.6662 9.12386 30.6806 10.5609L31.422 10.5697Z" fill="#FDD7AD"/>
    <Path d="M14.6547 18.5246C14.6547 19.989 12.1461 21.171 9.05129 21.171C5.95647 21.171 3.44785 19.989 3.44785 18.5246C3.44785 17.1309 5.72371 15.993 8.62026 15.8871C8.76681 15.8783 8.90474 15.8783 9.05129 15.8783C12.1461 15.8783 14.6547 17.0603 14.6547 18.5246Z" fill="#F0C419"/>
    <Path d="M19.8271 6.1748V14.9783C17.6593 17.4116 15.9104 20.2034 14.6547 23.2349V18.5244C14.6547 17.0601 12.1461 15.8781 9.05127 15.8781C8.90472 15.8781 8.76679 15.8781 8.62024 15.8869V6.1748C8.62024 7.63912 11.1289 8.82116 14.2237 8.82116C17.3185 8.82116 19.8271 7.63912 19.8271 6.1748Z" fill="#E57E25"/>
    <Path d="M11.2067 44.1058C11.2067 45.5701 8.69806 46.7522 5.60324 46.7522C2.50841 46.7522 -0.000213623 45.5701 -0.000213623 44.1058C-0.000213623 43.0032 1.4222 42.0593 3.44806 41.6623C4.15846 41.5244 4.88016 41.4564 5.60324 41.4594C8.69806 41.4594 11.2067 42.6415 11.2067 44.1058Z" fill="#F9EAB0"/>
    <Path d="M11.2067 44.1058V48.5164C11.2067 49.9807 8.69806 51.1627 5.60324 51.1627C2.50841 51.1627 -0.000213623 49.9807 -0.000213623 48.5164V44.1058C-0.000213623 45.5701 2.50841 46.7522 5.60324 46.7522C8.69806 46.7522 11.2067 45.5701 11.2067 44.1058ZM22.4136 35.2846C22.4136 36.7489 19.905 37.931 16.8101 37.931C13.7153 37.931 11.2067 36.7489 11.2067 35.2846C11.2067 34.182 12.6291 33.2381 14.655 32.8412C15.3654 32.7032 16.0871 32.6352 16.8101 32.6383C19.905 32.6383 22.4136 33.8203 22.4136 35.2846Z" fill="#F3D55B"/>
    <Path d="M22.4133 35.2847V46.7522C22.4133 48.2165 19.9047 49.3985 16.8099 49.3985C13.715 49.3985 11.2064 48.2165 11.2064 46.7522V35.2847C11.2064 36.749 13.715 37.931 16.8099 37.931C19.9047 37.931 22.4133 36.749 22.4133 35.2847Z" fill="#F0C419"/>
    <Path d="M33.6207 23.8174C33.6207 24.0513 33.7115 24.2757 33.8732 24.4411C34.0348 24.6065 34.2541 24.6995 34.4827 24.6995C34.7114 24.6995 34.9306 24.6065 35.0923 24.4411C35.254 24.2757 35.3448 24.0513 35.3448 23.8174C35.3448 22.8816 34.9815 21.9841 34.3348 21.3224C33.6882 20.6606 32.8111 20.2889 31.8965 20.2889V19.4068C31.8965 19.1728 31.8057 18.9485 31.644 18.783C31.4824 18.6176 31.2631 18.5247 31.0345 18.5247C30.8058 18.5247 30.5866 18.6176 30.4249 18.783C30.2632 18.9485 30.1724 19.1728 30.1724 19.4068V20.2889C29.2579 20.2889 28.3808 20.6606 27.7341 21.3224C27.0874 21.9841 26.7241 22.8816 26.7241 23.8174C26.7241 24.7532 27.0874 25.6506 27.0874 26.6151C27.0874 27.5796 26.7241 28.4771 26.0774 29.1388C25.4307 29.8006 24.5536 30.1723 23.639 30.1723Z" fill="#FDD7AD"/>
  </Svg>
);

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuthStore();
  const { rooms, initializeRooms, tickTimers } = useBidRoomStore();
  const { unreadCount, initializeNotifications } = useNotificationStore();

  const [cardSizes, setCardSizes] = useState<Record<string, { width: number, height: number }>>({});
  const onCardLayout = (id: string, event: any) => {
    const { width, height } = event.nativeEvent.layout;
    if (!cardSizes[id] || Math.abs(cardSizes[id].height - height) > 1 || Math.abs(cardSizes[id].width - width) > 1) {
      setCardSizes((prev) => ({
        ...prev,
        [id]: { width, height },
      }));
    }
  };

  const BW = 70.89; // cutout width
  const BH = 44.42; // cutout height
  const R = 12;  // corner radius
  const CR = 12;  // cutout radius

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const CARD_DESIGN_WIDTH = 400;
  const cardWidth = screenWidth - 40;
  const scale = cardWidth / CARD_DESIGN_WIDTH;
  const scaled = (val: number) => val * scale;

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
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('SearchCar')}
              style={styles.searchClickableArea}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={styles.searchIcon}>
                <Path
                  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  fill="#64748B"
                />
              </Svg>
              <Text style={styles.searchPlaceholderText}>Search brand, model, Variant...</Text>
            </TouchableOpacity>
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
                <View style={[styles.heroCard, { backgroundColor: index === 0 ? '#D8E3FB' : '#2563EB', width: cardWidth, height: index === 0 ? scaled(264) : scaled(220), borderRadius: scaled(20), alignSelf: 'center' }]}>
                  {index === 0 ? (
                    <Image
                      source={require('../../../image_57.png')}
                      style={[styles.firstBannerImage, { width: scaled(630), height: scaled(337), bottom: scaled(-50), right: scaled(-200) }]}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.heroIllustration}>
                      <Image
                        source={{ uri: banner.illustrationUrl }}
                        style={styles.bannerImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}

                  <View style={styles.heroTextWrapper}>
                    {banner.badge && (
                      index === 0 ? (
                        <View style={[styles.liveBadgeWrapper, { width: scaled(52), height: scaled(22), top: scaled(17), left: scaled(14), borderRadius: scaled(9.95), borderWidth: scaled(1) }]}>
                          <View style={[styles.liveBadgeRedDot, { width: scaled(5), height: scaled(5), borderRadius: scaled(2.5), marginRight: scaled(4) }]} />
                          <Text style={[styles.liveBadgeText, { fontSize: scaled(9) }]}>{banner.badge}</Text>
                        </View>
                      ) : (
                        <View style={[styles.bannerBadge, { backgroundColor: '#EA3356' }]}>
                          <Text style={styles.bannerBadgeText}>{banner.badge}</Text>
                        </View>
                      )
                    )}
                    {banner.title.includes('Compete For You') ? (
                      <Text style={[styles.heroTitle, { color: '#0F172A', fontFamily: 'Outfit-Bold', width: scaled(320), top: scaled(56), left: scaled(16), fontSize: scaled(24), lineHeight: scaled(28) }]}>
                        Get Dealers To{"\n"}
                        <Text style={{ color: '#2563EB', fontFamily: 'Outfit-Bold', fontSize: scaled(24), lineHeight: scaled(28) }}>Compete For You</Text>
                      </Text>
                    ) : (
                      <Text style={[styles.heroTitle, { color: index === 0 ? '#0F172A' : '#FFFFFF' }]}>
                        {banner.title}
                      </Text>
                    )}

                    {index === 0 ? (
                      <View style={[styles.subtitleContainer, { width: scaled(216.01), height: scaled(36), top: scaled(135), left: scaled(16) }]}>
                        <View style={[styles.verticalBlueLine, { width: scaled(3.5), marginRight: scaled(8), borderRadius: scaled(2) }]} />
                        <Text style={[styles.heroSubtitle, { color: '#0F172A', flex: 1, marginTop: 0, marginBottom: 0, fontSize: scaled(14), lineHeight: scaled(18) }]}>
                          Get real-time offers from <Text style={styles.boldSubtitleText}>verified dealers near you</Text>
                        </Text>
                      </View>
                    ) : (
                      <Text style={[styles.heroSubtitle, { color: index === 0 ? '#64748B' : '#E2E8F0' }]}>
                        {banner.subtitle}
                      </Text>
                    )}

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('Brand', { brandId: 'maruti', brandName: 'Maruti Suzuki' })}
                      style={[styles.heroCta, { width: scaled(220), height: scaled(42), top: scaled(200), left: scaled(16), borderRadius: scaled(50), backgroundColor: '#2563EB' }]}
                    >
                      <Text style={[styles.heroCtaText, { fontSize: scaled(16), lineHeight: scaled(20) }]}>
                        {index === 0 ? "Post A Car Requirement" : banner.ctaText}
                      </Text>
                      <Text style={[styles.heroCtaArrow, { fontSize: scaled(16), marginLeft: scaled(6) }]}>→</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Dealer Offer Cards in a row at the top-right */}
                  {index === 0 && (
                    <View style={styles.dealerOffersContainer}>
                      {/* Left card */}
                      <View style={[styles.dealerOfferCardWhite, { width: scaled(57.98), height: scaled(42.24), top: scaled(42), left: scaled(186.81), borderRadius: scaled(4.16), borderWidth: scaled(0.64) }]}>
                        <View style={[styles.dealerOfferCardHeaderWhite, { paddingVertical: scaled(2) }]}>
                          <Text style={[styles.dealerOfferLabelGray, { fontSize: scaled(6) }]}>Dealer Offer</Text>
                        </View>
                        <View style={styles.dealerOfferCardBodyWhite}>
                          <Text style={[styles.dealerOfferPriceBlack, { fontSize: scaled(9.5), marginTop: scaled(1) }]}>₹12.80L</Text>
                          <Text style={[styles.dealerOfferLabelGraySub, { fontSize: scaled(5.5) }]}>Good Offer</Text>
                        </View>
                      </View>

                      {/* Middle card (Best Offer, Blue) */}
                      <View style={[styles.dealerOfferCardBlue, { width: scaled(70.48), height: scaled(51.35), top: scaled(30), left: scaled(252.76), borderRadius: scaled(5.06), borderWidth: scaled(0.78) }]}>
                        <View style={[styles.dealerOfferCardHeaderBlue, { paddingVertical: scaled(2.5) }]}>
                          <Text style={[styles.dealerOfferLabelWhite, { fontSize: scaled(7) }]}>Dealer Offer</Text>
                        </View>
                        <View style={styles.dealerOfferCardBodyBlue}>
                          <Text style={[styles.bestOfferSublabel, { fontSize: scaled(6.5), marginTop: scaled(1) }]}>Best Offer</Text>
                          <Text style={[styles.dealerOfferPriceWhite, { fontSize: scaled(10.5), marginTop: scaled(0.5) }]}>₹12.35L</Text>
                        </View>
                      </View>

                      {/* Right card */}
                      <View style={[styles.dealerOfferCardWhite, { width: scaled(57.98), height: scaled(42.24), top: scaled(42), left: scaled(331.24), borderRadius: scaled(4.16), borderWidth: scaled(0.64) }]}>
                        <View style={[styles.dealerOfferCardHeaderWhite, { paddingVertical: scaled(2) }]}>
                          <Text style={[styles.dealerOfferLabelGray, { fontSize: scaled(6) }]}>Dealer Offer</Text>
                        </View>
                        <View style={styles.dealerOfferCardBodyWhite}>
                          <Text style={[styles.dealerOfferPriceBlack, { fontSize: scaled(9.5), marginTop: scaled(1) }]}>₹13.35L</Text>
                          <Text style={[styles.dealerOfferLabelGraySub, { fontSize: scaled(5.5) }]}>Good Offer</Text>
                        </View>
                      </View>
                    </View>
                  )}

                  {/* Cutout Indicator Pagination */}
                  <View style={styles.cutoutIndicatorContainer}>
                    <Svg width={140} height={17} viewBox="0 0 140 17" style={StyleSheet.absoluteFill}>
                      <Path
                        d="M 0,17 C 25,17 15,0 40,0 L 100,0 C 125,0 115,17 140,17 Z"
                        fill="#F9F9FF"
                      />
                    </Svg>
                    <View style={styles.cutoutDotsWrapper}>
                      {mockLiveBanners.map((_, dotIndex) => (
                        <View
                          key={dotIndex}
                          style={[
                            styles.cutoutDot,
                            dotIndex === activeBannerIndex ? styles.cutoutDotActive : styles.cutoutDotInactive,
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
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
                {fuel.name.toLowerCase() === 'petrol' && <PetrolSvg width={78} height={56} style={styles.fuelSvg} />}
                {fuel.name.toLowerCase() === 'electric' && <ElectricSvg width={78} height={56} style={styles.fuelSvg} />}
                {fuel.name.toLowerCase() === 'diesel' && <DieselSvg width={78} height={56} style={styles.fuelSvg} />}
                {fuel.name.toLowerCase() === 'hybrid' && <HybridSvg width={78} height={56} style={styles.fuelSvg} />}
                {fuel.name.toLowerCase() === 'cng' && <PetrolSvg width={78} height={56} style={styles.fuelSvg} />}
                
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
                  <Image source={brand.logo} style={styles.brandLogoImage} resizeMode="contain" />
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
          <Svg width={56} height={56} viewBox="0 0 70 70" fill="none" style={{ marginRight: 12 }}>
            <Rect x={0.5} y={0.5} width={68.8862} height={68.8862} rx={8.5} fill="url(#paint0_linear_11910_236)"/>
            <Rect x={0.5} y={0.5} width={68.8862} height={68.8862} rx={8.5} stroke="url(#paint1_linear_11910_236)" strokeDasharray="2 2"/>
            <G clipPath="url(#clip0_11910_236)">
              <Path fillRule="evenodd" clipRule="evenodd" d="M27.9018 32.5881C26.8004 32.5881 26.2146 31.2524 27.0113 30.4557L28.9562 28.5342H22.0201C20.3798 28.5342 20.3798 26.0269 22.0201 26.0269L28.9562 26.0503L27.0113 24.1054C25.8397 22.9337 27.6206 21.1763 28.7688 22.3245L32.8695 26.4252C33.3382 26.9173 33.3382 27.6906 32.8461 28.1827L28.7688 32.2366C28.5345 32.4709 28.2064 32.5881 27.9018 32.5881ZM29.3312 39.4071H21.8092C18.0599 39.4071 14.9668 36.3374 14.9668 32.5647V22.0198C14.9668 18.2471 18.0365 15.1774 21.8092 15.1774H32.1666C35.9393 15.1774 39.009 18.2471 39.009 22.0198V28.6748L46.3903 20.4498C47.4917 19.2079 49.3663 20.8716 48.265 22.1136L40.5555 30.6666L48.0775 30.69C51.8502 30.69 54.9199 33.7597 54.9199 37.5324V47.8664C54.9199 51.6391 51.8502 54.7088 48.0775 54.7088H37.7436C33.9709 54.7088 30.9012 51.6391 30.9012 47.8664V41.3989L24.2462 48.8037C23.1917 50.0222 21.2702 48.3819 22.395 47.1399L29.3312 39.4071ZM36.5016 31.4399V22.0198C36.5016 19.6297 34.5567 17.6848 32.1666 17.6848H21.8092C19.419 17.6848 17.4507 19.6297 17.4507 22.0198V32.5647C17.4507 34.9782 19.419 36.9232 21.8092 36.9232H31.5807L36.5016 31.4399ZM33.4085 38.6338V47.8664C33.4085 50.2565 35.3534 52.2014 37.7436 52.2014H48.0775C50.4677 52.2014 52.4126 50.2565 52.4126 47.8664V37.5324C52.4126 35.1188 50.4677 33.1739 48.0775 33.1739H38.306L33.4085 38.6338ZM47.89 43.9296H40.9539L42.8988 45.8746C44.0705 47.0462 42.2896 48.8037 41.1179 47.6555L37.0406 43.5781C36.5485 43.0626 36.5485 42.2425 37.1343 41.7269L41.1414 37.7433C42.313 36.5951 44.047 38.376 42.8988 39.5242L40.9539 41.4457H47.89C49.5304 41.4457 49.5304 43.9296 47.89 43.9296Z" fill="white"/>
            </G>
            <Defs>
              <LinearGradient id="paint0_linear_11910_236" x1={1} y1={34.9431} x2={68.8862} y2={34.9431} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#2563EB"/>
                <Stop offset={1} stopColor="#3373FF"/>
              </LinearGradient>
              <LinearGradient id="paint1_linear_11910_236" x1={68.8862} y1={34.9431} x2={1} y2={34.9431} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#2563EB"/>
                <Stop offset={0.5} stopColor="#2563EB"/>
                <Stop offset={0.503656} stopColor="#FF9441"/>
                <Stop offset={1} stopColor="#FF9441"/>
              </LinearGradient>
              <ClipPath id="clip0_11910_236">
                <Rect width={40} height={40} fill="white" transform="translate(14.9434 14.9431)"/>
              </ClipPath>
            </Defs>
          </Svg>
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
              {activeRooms.map((room) => {
                const size = { width: 238, height: 347 };
                return (
                  <TouchableOpacity
                    key={room.id}
                    activeOpacity={0.95}
                    style={styles.roomSliderCard}
                    onLayout={(e) => onCardLayout(room.id, e)}
                    onPress={() => navigation.navigate('BidRoom', { roomId: room.id })}
                  >
                    <Svg style={StyleSheet.absoluteFill} width={size.width} height={size.height}>
                      <Path
                        d={`
                          M ${R} 0
                          L ${size.width - R} 0
                          A ${R} ${R} 0 0 1 ${size.width} ${R}
                          L ${size.width} ${size.height - BH - CR}
                          A ${CR} ${CR} 0 0 1 ${size.width - CR} ${size.height - BH}
                          L ${size.width - BW + CR} ${size.height - BH}
                          A ${CR} ${CR} 0 0 0 ${size.width - BW} ${size.height - BH + CR}
                          L ${size.width - BW} ${size.height - R}
                          A ${R} ${R} 0 0 1 ${size.width - BW - R} ${size.height}
                          L ${R} ${size.height}
                          A ${R} ${R} 0 0 1 0 ${size.height - R}
                          L 0 ${R}
                          A ${R} ${R} 0 0 1 ${R} 0
                          Z
                        `}
                        fill="#FFFFFF"
                        stroke="#EDEEF3"
                        strokeWidth={1.2}
                      />
                    </Svg>

                    <View style={styles.roomImageContainer}>
                      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
                        <Defs>
                          <LinearGradient id={`carGrad-${room.id}`} x1="1" y1="0" x2="0" y2="0">
                            <Stop offset="0" stopColor="#CDDCF1" />
                            <Stop offset="1" stopColor="#FAFBFF" />
                          </LinearGradient>
                        </Defs>
                        <Path 
                          d="M 75.5 10 L 200 10 L 180 140 L 10 140 L 10 42.5 L 59.5 42.5 A 16 16 0 0 0 75.5 26.5 Z"
                          fill={`url(#carGrad-${room.id})`}
                          stroke={`url(#carGrad-${room.id})`}
                          strokeWidth={20}
                          strokeLinejoin="round"
                        />
                      </Svg>
                      <Image source={{ uri: room.image }} style={styles.roomCarImage} resizeMode="contain" />
                      <View style={styles.roomLiveBadge}>
                        <View style={styles.roomLiveBadgeRedDot} />
                        <Text style={styles.roomLiveBadgeText}>Live</Text>
                      </View>
                    </View>

                    <View style={styles.roomMetaContent}>
                      <View style={styles.roomLocationRow}>
                        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
                          <Path
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                            fill="#64748B"
                          />
                        </Svg>
                        <Text style={styles.roomLocationText}>{room.city}</Text>
                      </View>
                      <Text style={styles.roomCarName}>{room.carName} {room.variantName}</Text>
                      <View style={styles.roomCarSpecsRow}>
                        <Text style={styles.roomCarSpecs}>{room.fuel} • {room.transmission} • </Text>
                        <View style={[styles.colorBadge, { backgroundColor: '#2563EB' }]}>
                          <View style={[styles.colorDot, { backgroundColor: room.color || 'red' }]} />
                          <Text style={styles.colorBadgeText}>{room.color || 'Red'}</Text>
                        </View>
                      </View>

                      <View style={styles.roomStatsGrid}>
                        <View style={styles.roomStatCell}>
                          <Text style={styles.roomStatLabel}>Dealers</Text>
                          <Text style={styles.roomStatValue}>{room.dealersCount}</Text>
                        </View>
                        <View style={styles.verticalStatDivider} />
                        <View style={styles.roomStatCell}>
                          <Text style={styles.roomStatLabel}>Best Bid</Text>
                          <Text style={[styles.roomStatValue, { color: '#2563EB' }]}>
                            {room.bestBid > 0 ? `₹${(room.bestBid / 100000).toFixed(1)}L` : '—'}
                          </Text>
                        </View>
                        <View style={styles.verticalStatDivider} />
                        <View style={styles.roomStatCell}>
                          <Text style={styles.roomStatLabel}>Savings</Text>
                          <Text style={[styles.roomStatValue, { color: '#16A34A' }]}>
                            {room.savings > 0 ? `₹${(room.savings / 1000).toFixed(0)}K` : '—'}
                          </Text>
                        </View>
                      </View>

                      <View style={[styles.progressBarContainer, { width: size.width - BW - 28 }]}>
                        <View style={styles.progressBarFill} />
                      </View>

                      <View style={[styles.roomCardBottomRow, { width: size.width - BW - 28 }]}>
                        <View style={styles.roomTimeContainer}>
                          <Text style={styles.roomTimeLabel}>17:15 Min</Text>
                          <View style={styles.verticalTimeDivider} />
                          <Text style={styles.roomTimeSub}>Remaining</Text>
                        </View>
                      </View>

                      <View style={[styles.cutoutButtonContainer, { width: 64, height: 36, bottom: 0, right: -11 }]}>
                        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                          <Path d="M5 12h14M12 5l7 7-7 7" stroke="#FFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
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
          <View style={[StyleSheet.absoluteFill, { borderRadius: 12, overflow: 'hidden', opacity: 0.45 }]}>
            <WaveSvg
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </View>
          <View style={[StyleSheet.absoluteFill, { borderRadius: 12, overflow: 'hidden', opacity: 0.45 }]}>
            <WaveSvg
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 10, left: 10 }}
            />
          </View>
          <View style={styles.savingsBannerContent}>
            <View style={styles.savingsTitleRow}>
              <View style={styles.orangeSavingsBar} />
              <Text style={styles.savingsBannerTitle}>₹38,400</Text>
            </View>
            <Text style={styles.savingsBannerSub}>
              Average savings per deal in <Text style={styles.orangeHighlightText}>Delhi NCR</Text> this month
            </Text>
          </View>
          <View style={styles.savingsGoldBagContainer}>
            <CoinsBagSvg />
          </View>
        </View>

        {/* Recent NCR Purchases Live Feed section */}
        <View style={styles.recentPurchasesSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.recentTitleContainer}>
              <Text style={styles.sectionHeading}>Recent NCR Purchases</Text>
              <View style={styles.liveFeedBadge}>
                <Text style={styles.liveFeedBadgeText}>● Live Feed</Text>
              </View>
            </View>
          </View>

          {mockRecentPurchases.map((purchase) => {
            const P_W = screenWidth - 68;
            return (
            <View key={purchase.id} style={styles.purchaseFeedCard}>
              <View style={styles.purchaseTopHeaderCard}>
                <Svg width={P_W} height={80} style={StyleSheet.absoluteFill}>
                  <Polygon 
                    points={`50,10 ${P_W - 10},10 ${P_W - 10},70 20,70`}
                    fill="#F0F5FF"
                    stroke="#F0F5FF"
                    strokeWidth={20}
                    strokeLinejoin="round"
                  />
                </Svg>
                <View style={styles.purchaseTopHeader}>
                  <Image source={{ uri: purchase.imageUrl }} style={[styles.purchaseThumbImage, { marginLeft: -4, marginTop: -8 }]} resizeMode="contain" />
                  <View style={styles.purchaseHeaderTextContainer}>
                    <View style={styles.purchaseTopRow}>
                      <Text style={styles.purchaseModelName}>{purchase.modelName}</Text>
                    </View>
                    <Text style={styles.purchaseDealerSub}>
                      <Text style={styles.purchaseDealerName}>{purchase.dealerName}</Text>
                      {' • '}{purchase.city}
                    </Text>
                    <Text style={styles.purchaseDateText}>{purchase.date}</Text>
                  </View>
                </View>
                <View style={styles.purchaseDoneBadge}>
                  <Text style={styles.purchaseDoneText}>● Done</Text>
                </View>
              </View>
              <View style={styles.purchaseStatsRow}>
                <View style={styles.purchaseStatCol}>
                  <Text style={styles.purchaseStatLabel}>On-Road Price Paid</Text>
                  <Text style={styles.purchaseStatValue}>{purchase.onRoadPrice}</Text>
                </View>
                <View style={styles.purchaseStatDivider} />
                <View style={styles.purchaseStatCol}>
                  <Text style={styles.purchaseStatLabel}>Ex-Showroom</Text>
                  <Text style={styles.purchaseStatValue}>{purchase.exShowroom}</Text>
                </View>
                <View style={styles.purchaseStatDivider} />
                <View style={styles.purchaseStatCol}>
                  <Text style={styles.purchaseStatLabel}>Saved VIA Carbounty</Text>
                  <Text style={[styles.purchaseStatValue, { color: '#207320' }]}>{purchase.savings}</Text>
                </View>
              </View>

              <View style={styles.purchasePerksStrip}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                  <Path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </Svg>
                <Text style={styles.purchasePerksText}>{purchase.perks}</Text>
              </View>
            </View>
            );
          })}
        </View>



        {/* My Purchases Section - 2 column grid */}
        <View style={styles.myPurchasesSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>My Purchases</Text>
          </View>
          <View style={styles.myPurchasesGrid}>
            {mockMyPurchases.map((purchase) => (
              <View key={purchase.id} style={styles.myPurchaseCard}>
                <View style={styles.myPurchaseImageContainer}>
                  {(() => {
                    const P_W2 = (screenWidth - 40) * 0.485;
                    return (
                      <Svg width={P_W2} height={110} style={StyleSheet.absoluteFill}>
                        <Polygon 
                          points={`10,10 ${P_W2 - 10},10 ${P_W2 - 30},100 10,100`}
                          fill="#D8E8F8"
                          stroke="#D8E8F8"
                          strokeWidth={20}
                          strokeLinejoin="round"
                        />
                      </Svg>
                    );
                  })()}
                  <Image source={{ uri: purchase.imageUrl }} style={styles.myPurchaseImage} resizeMode="contain" />
                </View>
                <View style={styles.myPurchaseContent}>
                  <Text style={styles.myPurchaseDate}>🕒 {purchase.date}</Text>
                  <Text style={styles.myPurchaseModel} numberOfLines={1}>{purchase.modelName}</Text>
                  <Text style={styles.myPurchaseDealer} numberOfLines={1}>{purchase.dealerName}</Text>
                  <View style={styles.myPurchaseSavingsBadge}>
                    <Text style={styles.myPurchaseSavingsText}>{purchase.savings}</Text>
                    <Text style={styles.myPurchasePriceText}>{purchase.priceOnRoad}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Smarter Deals. Branding Footer */}
        <View style={styles.brandingIllustrationBlock}>
          <Text style={styles.smarterDealsText}>Smarter Deals.</Text>
          <Text style={styles.smarterDealsSub}>Better Decisions.</Text>
          <View style={styles.footerSvgContainer}>
            <Rectangle1051Svg width={300} height={16} style={styles.footerShadowSvg} />
            <Group94Svg width={300} height={95} style={styles.footerGroupSvg} />
          </View>
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
    fontFamily: 'Outfit-ExtraBold',
  },
  welcomeTextWrapper: {
    marginLeft: 12,
  },
  greeting: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationSub: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
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
    fontFamily: 'Outfit-ExtraBold',
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
  searchClickableArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  searchPlaceholderText: {
    fontSize: 15,
    color: '#94A3B8',
    fontFamily: 'Outfit-Medium',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontFamily: 'Outfit-Medium',
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
    borderRadius: 20,
    width: 400,
    height: 220,
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
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
    fontFamily: 'Outfit-Bold',
  },
  liveBadgeWrapper: {
    position: 'absolute',
    width: 52,
    height: 22,
    top: 17,
    left: 14,
    borderRadius: 9.95,
    borderWidth: 1,
    borderColor: '#EDEEF3',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadgeRedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#9E322A',
    marginRight: 4,
  },
  liveBadgeText: {
    color: '#9E322A',
    fontSize: 9,
    fontFamily: 'Outfit-ExtraBold',
    letterSpacing: 0.5,
  },
  heroTitle: {
    position: 'absolute',
    width: 180.65,
    top: 46.43,
    left: 14.84,
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    lineHeight: 24,
    textTransform: 'capitalize',
  },
  subtitleContainer: {
    position: 'absolute',
    width: 216.01,
    height: 36,
    top: 105.64,
    left: 14.36,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  verticalBlueLine: {
    width: 3.5,
    backgroundColor: '#2563EB',
    marginRight: 8,
    borderRadius: 2,
  },
  boldSubtitleText: {
    fontFamily: 'Outfit-Bold',
    color: '#0F172A',
  },
  heroSubtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
  heroCta: {
    position: 'absolute',
    width: 196,
    height: 36,
    top: 162,
    left: 15,
    borderRadius: 50,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCtaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  heroCtaArrow: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 6,
    fontFamily: 'Outfit-Regular',
  },
  heroIllustration: {
    flex: 0.8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bannerImage: {
    width: 240,
    height: 140,
    marginTop: 20,
  },
  firstBannerImage: {
    position: 'absolute',
    zIndex: 2,
  },
  dealerOffersContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  dealerOfferCardWhite: {
    position: 'absolute',
    width: 57.98,
    height: 42.24,
    borderRadius: 4.16,
    borderWidth: 0.64,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  dealerOfferCardHeaderWhite: {
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 0.5,
    borderBottomColor: '#EDEEF3',
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dealerOfferCardBodyWhite: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 1,
  },
  dealerOfferCardBlue: {
    position: 'absolute',
    width: 70.48,
    height: 51.35,
    borderRadius: 5.06,
    borderWidth: 0.78,
    borderColor: '#2563EB',
    backgroundColor: '#2563EB',
    overflow: 'hidden',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dealerOfferCardHeaderBlue: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dealerOfferCardBodyBlue: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },
  dealerOfferLabelGray: {
    fontSize: 6,
    fontFamily: 'Outfit-Bold',
    color: '#94A3B8',
  },
  dealerOfferLabelGraySub: {
    fontSize: 5.5,
    fontFamily: 'Outfit-Bold',
    color: '#94A3B8',
  },
  dealerOfferPriceBlack: {
    fontSize: 9.5,
    fontFamily: 'Outfit-ExtraBold',
    color: '#0F172A',
    marginTop: 1,
  },
  dealerOfferLabelWhite: {
    fontSize: 7,
    fontFamily: 'Outfit-Bold',
    color: '#E0EAFF',
  },
  bestOfferSublabel: {
    fontSize: 6.5,
    fontFamily: 'Outfit-Bold',
    color: '#E0EAFF',
    marginTop: 1,
  },
  dealerOfferPriceWhite: {
    fontSize: 10.5,
    fontFamily: 'Outfit-ExtraBold',
    color: '#FFFFFF',
    marginTop: 0.5,
  },
  cutoutIndicatorContainer: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 140,
    height: 17,
  },
  cutoutDotsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 0,
  },
  cutoutDot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  cutoutDotActive: {
    width: 24,
    backgroundColor: '#2563EB',
  },
  cutoutDotInactive: {
    width: 12,
    backgroundColor: '#CBD5E1',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#0F172A',
  },
  viewAllLink: {
    fontSize: 14,
    color: '#2563EB',
    fontFamily: 'Outfit-Bold',
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
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    marginRight: 12,
    padding: 12,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  fuelSvg: {
    position: 'absolute',
    top: 8,
    right: -4,
  },
  fuelNameText: {
    fontSize: 15,
    fontFamily: 'Outfit-Medium',
    color: '#0F172A',
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
    fontSize: 16,
    fontFamily: 'Outfit-ExtraBold',
    color: '#FFFFFF',
  },
  compareSubtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 11,
    color: '#E0EAFF',
    marginTop: 2,
    lineHeight: 14,
  },
  brandColorText: {
    color: '#FF9441',
    fontFamily: 'Outfit-Bold',
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
    fontFamily: 'Outfit-Bold',
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
    fontSize: 11,
    fontFamily: 'Outfit-Bold',
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
    fontSize: 12,
    color: '#207320',
    fontFamily: 'Outfit-SemiBold',
    flex: 1,
    lineHeight: 16,
  },
  bidRoomsSection: {
    marginBottom: 24,
  },
  roomSliderCard: {
    width: 238,
    height: 347,
    marginRight: 16,
    position: 'relative',
    padding: 14,
    paddingBottom: 0,
  },
  roomImageContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
  },
  roomCarImage: {
    width: '100%',
    height: '100%',
  },
  roomLiveBadge: {
    position: 'absolute',
    top: 10.33,
    left: 8.87,
    width: 55.67,
    height: 21.21,
    backgroundColor: '#65B16F',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  roomLiveBadgeRedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  roomLiveBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Outfit-Bold',
  },
  roomMetaContent: {
    marginTop: 6,
  },
  roomLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomLocationText: {
    fontSize: 11,
    color: '#64748B',
    fontFamily: 'Outfit-SemiBold',
  },
  roomCarName: {
    fontSize: 15,
    fontFamily: 'Outfit-ExtraBold',
    color: '#0F172A',
    marginTop: 2,
  },
  roomCarSpecs: {
    fontSize: 11,
    color: '#2563EB',
    fontFamily: 'Outfit-SemiBold',
  },
  roomCarSpecsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  colorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  colorBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Outfit-Bold',
  },
  roomStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: '#2563EB1A',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.07)',
    overflow: 'hidden',
  },
  roomStatCell: {
    alignItems: 'center',
    flex: 1,
  },
  verticalStatDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#94A3B8',
    opacity: 0.2,
    alignSelf: 'center',
  },
  roomStatLabel: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: 'Outfit-SemiBold',
  },
  roomStatValue: {
    fontSize: 12,
    fontFamily: 'Outfit-ExtraBold',
    marginTop: 2,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginTop: 4,
    marginBottom: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  roomCardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginTop: 2,
  },
  roomTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomTimeLabel: {
    fontSize: 12,
    color: '#FF7A45',
    fontFamily: 'Outfit-Bold',
  },
  verticalTimeDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#000000',
    opacity: 0.1,
    marginHorizontal: 8,
  },
  roomTimeSub: {
    fontSize: 11,
    color: '#0F172A',
    fontFamily: 'Outfit-Bold',
  },
  cutoutButtonContainer: {
    position: 'absolute',
    right: 4,
    bottom: 0,
    width: 64,
    height: 36,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 6,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomActionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
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
    fontFamily: 'Outfit-Bold',
    color: '#0F172A',
  },
  emptyRoomsSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Outfit-Regular',
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
    position: 'relative',
    overflow: 'hidden',
  },
  savingsBannerContent: {
    flex: 1.4,
  },
  savingsBannerTitle: {
    fontSize: 24,
    fontFamily: 'Outfit-ExtraBold',
    color: '#FFFFFF',
  },
  savingsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orangeSavingsBar: {
    width: 3.5,
    height: 20,
    backgroundColor: '#FF9441',
    marginRight: 8,
    borderRadius: 2,
  },
  savingsBannerSub: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: '#E0EAFF',
    marginTop: 4,
    lineHeight: 16,
  },
  orangeHighlightText: {
    color: '#FF9441',
    fontFamily: 'Outfit-Bold',
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
    paddingHorizontal: 20,
  },
  recentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveFeedBadge: {
    backgroundColor: '#6AB46A1A',
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#27AF4D33',
  },
  liveFeedBadgeText: {
    color: '#207320',
    fontSize: 11,
    fontFamily: 'Outfit-Bold',
  },
  purchaseFeedCard: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    marginBottom: 14,
    padding: 14,
  },
  purchaseTopHeaderCard: {
    height: 80,
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 12,
  },
  purchaseTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  purchaseThumbImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  purchaseHeaderTextContainer: {
    flex: 1,
  },
  purchaseModelName: {
    fontSize: 14,
    fontFamily: 'Outfit-ExtraBold',
    color: '#0F172A',
    flex: 1,
    marginRight: 6,
  },
  purchaseDealerName: {
    color: '#2563EB',
    fontFamily: 'Outfit-Bold',
  },
  purchaseDealerSub: {
    fontFamily: 'Outfit-Regular',
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  purchaseRightBadgeBlock: {
    alignItems: 'flex-end',
  },
  purchaseDoneBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 61.4,
    height: 21.2,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#6AB46A',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  purchaseDoneText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Outfit-Bold',
  },
  purchaseDateText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 3,
    fontFamily: 'Outfit-Medium',
  },
  purchaseStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
    marginTop: 12,
    marginBottom: 10,
  },
  purchaseStatDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },
  purchaseStatCol: {
    alignItems: 'center',
    flex: 1,
  },
  purchaseStatLabel: {
    fontSize: 9,
    color: '#94A3B8',
    fontFamily: 'Outfit-Medium',
    textAlign: 'center',
  },
  purchaseStatValue: {
    fontSize: 12,
    fontFamily: 'Outfit-ExtraBold',
    marginTop: 3,
    color: '#0F172A',
  },
  purchasePerksStrip: {
    backgroundColor: '#EEF4FF',
    marginHorizontal: -14,
    marginBottom: -14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
    borderTopWidth: 1,
    borderTopColor: '#DBEAFE',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchasePerksText: {
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Outfit-Medium',
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
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  priceLockSub: {
    fontFamily: 'Outfit-Regular',
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
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  dealModel: {
    fontFamily: 'Outfit-Regular',
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
    fontFamily: 'Outfit-Regular',
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
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    fontWeight: '800',
    color: '#2563EB',
  },
  dealSavings: {
    fontFamily: 'Outfit-Regular',
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
    fontFamily: 'Outfit-Regular',
    fontSize: 15,
    fontWeight: '800',
    color: '#207320',
    textAlign: 'center',
  },
  bottomSavingsSub: {
    fontFamily: 'Outfit-Regular',
    fontSize: 11,
    color: '#207320',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 14,
  },
  brandNameText: {
    fontSize: 12,
    color: '#475569',
    marginTop: 6,
    fontFamily: 'Outfit-SemiBold',
  },
  myPurchasesSection: {
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  myPurchasesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  myPurchaseCard: {
    width: '48.5%',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDEEF3',
    marginBottom: 12,
    overflow: 'hidden',
  },
  myPurchaseImageContainer: {
    width: '100%',
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  myPurchaseImage: {
    width: '90%',
    height: '90%',
  },
  myPurchaseContent: {
    padding: 10,
  },
  myPurchaseDate: {
    fontSize: 9,
    color: '#64748B',
    fontFamily: 'Outfit-Medium',
  },
  myPurchaseModel: {
    fontSize: 13,
    fontFamily: 'Outfit-ExtraBold',
    color: '#0F172A',
    marginTop: 4,
    lineHeight: 17,
  },
  myPurchaseDealer: {
    fontSize: 10,
    color: '#2563EB',
    marginTop: 3,
    fontFamily: 'Outfit-SemiBold',
  },
  myPurchaseSavingsRow: {
    marginTop: 8,
  },
  myPurchaseSavingsBadge: {
    backgroundColor: '#2073201A',
    borderWidth: 1,
    borderColor: '#2073202E',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  myPurchaseSavingsText: {
    color: '#16A34A',
    fontSize: 12,
    fontFamily: 'Outfit-ExtraBold',
  },
  myPurchasePriceText: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: 'Outfit-Medium',
    marginTop: 2,
  },
  brandingIllustrationBlock: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  brandingFooterImage: {
    width: screenWidth - 40,
    height: 180,
    alignSelf: 'center',
  },
  smarterDealsText: {
    fontSize: 40,
    fontFamily: 'Outfit-Black',
    color: '#2563EB',
    textAlign: 'center',
    letterSpacing: -1,
  },
  smarterDealsSub: {
    fontSize: 40,
    fontFamily: 'Outfit-Black',
    color: '#2563EB',
    textAlign: 'center',
    marginTop: 2,
    letterSpacing: -1,
  },
  footerSvgContainer: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 95,
  },
  footerGroupSvg: {
    position: 'absolute',
  },
  footerShadowSvg: {
    position: 'absolute',
    bottom: 0,
    opacity: 0.9,
  },
});
