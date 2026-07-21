import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { useAuthStore } from '../../store/authStore';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Svg, {
  Polygon,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Ellipse,
  G,
} from 'react-native-svg';

// Icons
import {
  ArrowRight,
  Car,
  UserCheck,
  CheckCircle2,
  ChevronDown,
  Check,
} from 'lucide-react-native';

// SVGs
import TyreStraight from '../../assets/tyrestraight.svg';
import TyreCurve from '../../assets/tyrecurve.svg';
import TopBarLogo from '../../assets/blacklogo.svg';
import CarOnboard from '../../assets/caronboard.svg';
import SuvImage from '../../assets/image-4.svg';
import SalesmanOnboard from '../../assets/salesmanonboard.svg';
import TyreOnboard2 from '../../assets/tyreonboard2.svg';
import CarBountyLight from '../../assets/carbountylight.svg';
import CarTyreOnboarding from '../../assets/cartyreonboarding.svg';
import CarLoading from '../../assets/carloading.svg';
import CarBountyLoading from '../../assets/carbountyloading.svg';
import CarOnboard3 from '../../assets/caronboard3.svg';
import TyreMarkOnboard3 from '../../assets/tyremarkonboard3.svg';
import LoginTyreMark from '../../assets/logintyremark.svg';
import BlackLogo from '../../assets/blacklogo.svg';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HERO_BASE_WIDTH = 440;
const HERO_BASE_HEIGHT = 718;

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export const OnboardingFlowScreen: React.FC<Props> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappUpdate, setWhatsappUpdate] = useState(true);
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const HERO_CONTAINER_HEIGHT = SCREEN_HEIGHT * 0.7;
  const heroScale = Math.min(
    SCREEN_WIDTH / HERO_BASE_WIDTH,
    HERO_CONTAINER_HEIGHT / HERO_BASE_HEIGHT,
  );

  const originalHeroOffsetX = (SCREEN_WIDTH - HERO_BASE_WIDTH * heroScale) / 2;

  // The X offset centers the 440px wide graphic inside the screen
  const polyPtX = (x: number) => x * heroScale + originalHeroOffsetX;
  const polyPtY = (y: number) => (y - 49.44) * heroScale;
  const bgPoints = `${polyPtX(-2000)},${polyPtY(-2000)} ${polyPtX(
    3000,
  )},${polyPtY(-2000)} ${polyPtX(3000)},${polyPtY(1819)} ${polyPtX(
    -2000,
  )},${polyPtY(-583.3)}`;

  const { isLoggedIn } = useAuthStore();

  // Animation value for the car loading (0 to 1)
  const loadingProgress = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isLoggedIn) {
      // Root navigator handles this switch
      return;
    }

    if (currentStep === 0) {
      // Run the car animation over 2 seconds
      Animated.timing(loadingProgress, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false, // Must be false to animate width
      }).start();

      const timer = setTimeout(() => {
        handleNext();
      }, 2500); // 2.5 seconds total
      return () => clearTimeout(timer);
    }
  }, [currentStep, isLoggedIn, loadingProgress]);

  const handleNext = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (currentStep >= 1 && currentStep < 3) {
      scrollViewRef.current?.scrollTo({
        x: currentStep * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentStep(currentStep + 1);
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentStep(4);
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(scrollPosition / SCREEN_WIDTH);
    const newStep = pageIndex + 1;
    if (currentStep !== newStep && newStep >= 1 && newStep <= 3) {
      setCurrentStep(newStep);
    }
  };

  const renderTopBar = (color: string) => (
    <View
      style={[
        styles.topBar,
        {
          paddingTop: insets.top + 10,
          justifyContent: 'flex-end',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          paddingRight: 20,
        },
      ]}
    >
      <TouchableOpacity
        onPress={handleSkip}
        style={[
          styles.skipBtn,
          {
            borderColor:
              color === '#FFF' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)',
            backgroundColor: color === '#FFF' ? '#FFFFFF1A' : 'transparent',
          },
        ]}
      >
        <Text style={[styles.skipText, { color }]}>Skip</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* =======================
          STEP 0: SPLASH SCREEN 
          ======================= */}
      {currentStep === 0 && (
        <View style={[styles.stepContainer, { backgroundColor: '#F4F4F5' }]}>
          {/* Top Blue Container */}
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '65%',
              top: 0,
              zIndex: 1,
            }}
          >
            <Svg
              style={{ position: 'absolute', top: 0, left: 0 }}
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <Polygon points="0,0 100,0 100,90 0,60" fill="#2563EB" />
            </Svg>
            <View
              style={{
                position: 'absolute',
                bottom: -5,
                left: 0,
                width: '100%',
                height: '50%',
              }}
            >
              <CarTyreOnboarding
                width="100%"
                height="100%"
                preserveAspectRatio="none"
              />
            </View>
          </View>

          {/* Splash Content Logo */}
          <View
            style={{
              position: 'absolute',
              top: '25%',
              width: '100%',
              alignItems: 'center',
              zIndex: 3,
            }}
          >
            <CarBountyLoading width={220} height={65} />
          </View>

          {/* Loading Animation Area */}
          <View
            style={{
              position: 'absolute',
              bottom: 60,
              width: '100%',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            <View style={{ width: '80%', maxWidth: 400, height: 40 }}>
              {/* Background Track */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  width: '100%',
                  height: 4,
                  backgroundColor: '#DBEAFE',
                  borderRadius: 2,
                }}
              />

              {/* Foreground Track (Animated) */}
              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  height: 4,
                  backgroundColor: '#2563EB',
                  borderRadius: 2,
                  width: loadingProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                }}
              />

              {/* Animated Car */}
              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: 12,
                  width: 100,
                  height: 35,
                  alignItems: 'center',
                  left: loadingProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-10%', '90%'],
                  }),
                }}
              >
                <CarLoading width={110} height={35} />
              </Animated.View>
            </View>
          </View>
        </View>
      )}

      {/* =======================
          STEPS 1 to 3: SWIPEABLE
          ======================= */}
      {currentStep >= 1 && currentStep <= 3 && (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          bounces={false}
          style={{ flex: 1, backgroundColor: '#F9F9FF' }}
        >
          {/* STEP 1 */}
          <View
            style={{
              width: SCREEN_WIDTH,
              height: '100%',
              backgroundColor: '#F9F9FF',
              overflow: 'hidden',
            }}
          >
            {/* Top Blue Container */}
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '70%',
                top: 0,
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: SCREEN_WIDTH,
                  height: HERO_BASE_HEIGHT * heroScale,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* 
                  Background Polygon rendered OUTSIDE the transformed view to avoid 
                  CoreAnimation layout clipping boundaries on iPads.
                  We mathematically align the viewBox so its internal coordinate space
                  perfectly matches the transformed 440x718 inner view!
                */}
                <Svg
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  width={SCREEN_WIDTH}
                  height={HERO_BASE_HEIGHT * heroScale}
                >
                  {/* Raw physical screen coordinates perfectly mirroring the scaled layout, avoiding all native clipping bugs! */}
                  <Polygon points={bgPoints} fill="#2563EB" />
                </Svg>

                <View
                  style={{
                    width: 2000,
                    height: 2000,
                    transform: [{ scale: heroScale }],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      width: HERO_BASE_WIDTH,
                      height: HERO_BASE_HEIGHT,
                      overflow: 'visible',
                    }}
                  >
                    {/* Tiled Tire Marks to reach screen edges without ruining aspect ratio/angle */}
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 440,
                        height: 718,
                      }}
                      pointerEvents="none"
                    >
                      {/* Left Tile (Overlap: 140px, dx: 300, dy: 144.135) */}
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 194.775,
                          left: -300,
                          width: 440,
                          height: 337,
                        }}
                      >
                        <CarTyreOnboarding width={440} height={337} />
                      </View>
                      {/* Center Tile */}
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 50.64,
                          left: 0,
                          width: 440,
                          height: 337,
                        }}
                      >
                        <CarTyreOnboarding width={440} height={337} />
                      </View>
                      {/* Right Tile */}
                      <View
                        style={{
                          position: 'absolute',
                          bottom: -93.495,
                          left: 300,
                          width: 440,
                          height: 337,
                        }}
                      >
                        <CarTyreOnboarding width={440} height={337} />
                      </View>
                      {/* Far Right Tile (for wide iPads since we shifted left) */}
                      <View
                        style={{
                          position: 'absolute',
                          bottom: -237.63,
                          left: 600,
                          width: 440,
                          height: 337,
                        }}
                      >
                        <CarTyreOnboarding width={440} height={337} />
                      </View>
                    </View>

                    {/* Car SVG inside the wrapper, but with overflow visible */}
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: -89,
                        width: 618,
                        height: 718,
                        overflow: 'visible',
                      }}
                      pointerEvents="none"
                    >
                      <CarOnboard width={618} height={718} preserveAspectRatio="xMidYMax meet" />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ height: '70%', width: '100%', zIndex: 10 }}>
              {renderTopBar('#FFF')}
            </View>

            <View
              style={[
                styles.halfBottom,
                {
                  height: '30%',
                  backgroundColor: 'transparent',
                  paddingTop: 0,
                  paddingBottom: Math.max(insets.bottom, 10) + 30,
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.title,
                    { fontSize: 24, lineHeight: 28, marginBottom: 8 },
                  ]}
                >
                  Get the Best{'\n'}Deal on{' '}
                  <Text style={styles.textBlue}>Your Next Car</Text>
                </Text>
                <Text
                  style={[styles.subtitle, { fontSize: 13, lineHeight: 18 }]}
                >
                  Buy Your New Car with Complete Confidence from Verified
                  Dealers Near You
                </Text>
              </View>

              <View style={styles.bottomNav}>
                <View style={styles.dots}>
                  <View style={[styles.dot, styles.dotActive]} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                  <ArrowRight color="#FFF" size={20} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* STEP 2 */}
          <View
            style={{
              width: SCREEN_WIDTH,
              height: '100%',
              backgroundColor: '#F9F9FF',
              overflow: 'hidden',
            }}
          >
            {/* Top 62% Blue Container */}
            <View
              style={{
                height: '62%',
                width: '100%',
                backgroundColor: '#2563EB',
                zIndex: 10,
                overflow: 'hidden',
              }}
            >
              {renderTopBar('#FFF')}

              <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Badges Container */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '15%',
                    paddingTop: '10%',
                  }}
                >
                  {/* Badge 1 */}
                  <View
                    style={[
                      styles.featureItem,
                      {
                        height: 37,
                        paddingLeft: 12,
                        paddingRight: 40,
                        borderRadius: 18.5,
                        alignSelf: 'flex-start',
                        overflow: 'hidden',
                        marginBottom: 16,
                      },
                    ]}
                  >
                    <Svg
                      style={{ position: 'absolute' }}
                      width="100%"
                      height="100%"
                    >
                      <Defs>
                        <LinearGradient
                          id="bgGrad1"
                          x1="0"
                          y1="0"
                          x2="171"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <Stop
                            offset="0%"
                            stopColor="rgba(37, 99, 235, 0.8)"
                          />
                          <Stop
                            offset="100%"
                            stopColor="rgba(21, 56, 133, 0)"
                          />
                        </LinearGradient>
                        <LinearGradient
                          id="borderGrad1"
                          x1="0"
                          y1="0"
                          x2="171"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <Stop
                            offset="0%"
                            stopColor="rgba(37, 99, 235, 0.4)"
                          />
                          <Stop
                            offset="100%"
                            stopColor="rgba(21, 56, 133, 0)"
                          />
                        </LinearGradient>
                      </Defs>
                      <Rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="18"
                        fill="url(#bgGrad1)"
                        stroke="url(#borderGrad1)"
                        strokeWidth="1"
                      />
                    </Svg>
                    <View style={[styles.featureDot, { marginRight: 6 }]} />
                    <Text
                      style={[
                        styles.featureText,
                        { fontFamily: 'Inter', fontSize: 13 },
                      ]}
                      numberOfLines={1}
                    >
                      Choose your
                    </Text>
                  </View>

                  {/* Badge 2 */}
                  <View
                    style={[
                      styles.featureItem,
                      {
                        height: 37,
                        paddingLeft: 12,
                        paddingRight: 40,
                        borderRadius: 18.5,
                        alignSelf: 'flex-start',
                        overflow: 'hidden',
                        marginBottom: 16,
                      },
                    ]}
                  >
                    <Svg
                      style={{ position: 'absolute' }}
                      width="100%"
                      height="100%"
                    >
                      <Defs>
                        <LinearGradient
                          id="bgGrad2"
                          x1="0"
                          y1="0"
                          x2="171"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <Stop
                            offset="0%"
                            stopColor="rgba(37, 99, 235, 0.8)"
                          />
                          <Stop
                            offset="100%"
                            stopColor="rgba(21, 56, 133, 0)"
                          />
                        </LinearGradient>
                        <LinearGradient
                          id="borderGrad2"
                          x1="0"
                          y1="0"
                          x2="171"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <Stop
                            offset="0%"
                            stopColor="rgba(37, 99, 235, 0.4)"
                          />
                          <Stop
                            offset="100%"
                            stopColor="rgba(21, 56, 133, 0)"
                          />
                        </LinearGradient>
                      </Defs>
                      <Rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="18"
                        fill="url(#bgGrad2)"
                        stroke="url(#borderGrad2)"
                        strokeWidth="1"
                      />
                    </Svg>
                    <View style={[styles.featureDot, { marginRight: 6 }]} />
                    <Text
                      style={[
                        styles.featureText,
                        { fontFamily: 'Inter', fontSize: 13 },
                      ]}
                      numberOfLines={1}
                    >
                      Dealers Bid Live
                    </Text>
                  </View>

                  {/* Badge 3 */}
                  <View
                    style={[
                      styles.featureItem,
                      {
                        height: 37,
                        paddingLeft: 12,
                        paddingRight: 40,
                        borderRadius: 18.5,
                        alignSelf: 'flex-start',
                        overflow: 'hidden',
                      },
                    ]}
                  >
                    <Svg
                      style={{ position: 'absolute' }}
                      width="100%"
                      height="100%"
                    >
                      <Defs>
                        <LinearGradient
                          id="bgGrad3"
                          x1="0"
                          y1="0"
                          x2="171"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <Stop
                            offset="0%"
                            stopColor="rgba(37, 99, 235, 0.8)"
                          />
                          <Stop
                            offset="100%"
                            stopColor="rgba(21, 56, 133, 0)"
                          />
                        </LinearGradient>
                        <LinearGradient
                          id="borderGrad3"
                          x1="0"
                          y1="0"
                          x2="171"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <Stop
                            offset="0%"
                            stopColor="rgba(37, 99, 235, 0.4)"
                          />
                          <Stop
                            offset="100%"
                            stopColor="rgba(21, 56, 133, 0)"
                          />
                        </LinearGradient>
                      </Defs>
                      <Rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="18"
                        fill="url(#bgGrad3)"
                        stroke="url(#borderGrad3)"
                        strokeWidth="1"
                      />
                    </Svg>
                    <View style={[styles.featureDot, { marginRight: 6 }]} />
                    <Text
                      style={[
                        styles.featureText,
                        { fontFamily: 'Inter', fontSize: 13 },
                      ]}
                      numberOfLines={1}
                    >
                      You Get the Best Price
                    </Text>
                  </View>
                </View>

                {/* Salesman Image */}
                <View
                  style={{
                    position: 'absolute',
                    top: '25%',
                    left: 30 * (SCREEN_WIDTH / 390),
                    width: 365 * (SCREEN_WIDTH / 390),
                    height: 342 * (SCREEN_WIDTH / 390),
                    zIndex: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: -15, height: -15 },
                    shadowOpacity: 0.5,
                    shadowRadius: 20,
                    elevation: 15,
                  }}
                >
                  <SalesmanOnboard
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMaxYMax meet"
                  />
                </View>
              </View>
            </View>

            {/* Horizontal Tyre Track Border */}
            <View style={{ width: SCREEN_WIDTH, height: 80, zIndex: 10 }}>
              <TyreOnboard2
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
            </View>

            {/* Bottom Text Container */}
            <View
              style={[
                styles.halfBottom,
                {
                  flex: 1,
                  height: 'auto',
                  backgroundColor: 'transparent',
                  paddingTop: 20,
                  paddingBottom: Math.max(insets.bottom, 10) + 30,
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: 24,
                      lineHeight: 28,
                      marginBottom: 8,
                      fontFamily: 'Outfit-Bold',
                    },
                  ]}
                >
                  Dealers{'\n'}Compete.{' '}
                  <Text
                    style={[styles.textBlue, { fontFamily: 'Outfit-Bold' }]}
                  >
                    You Save.
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    {
                      fontSize: 13,
                      lineHeight: 18,
                      fontFamily: 'Outfit-Regular',
                    },
                  ]}
                >
                  No showroom visits, no endless negotiations — just the best
                  car deal, made simple for you.
                </Text>
              </View>

              <View style={styles.bottomNav}>
                <View style={styles.dots}>
                  <View style={styles.dot} />
                  <View style={[styles.dot, styles.dotActive]} />
                  <View style={styles.dot} />
                </View>
                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                  <ArrowRight color="#FFF" size={20} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* STEP 3 */}
          <View
            style={{
              width: SCREEN_WIDTH,
              height: '100%',
              backgroundColor: '#F9F9FF',
              overflow: 'hidden',
            }}
          >
            {/* Top Blue Container */}
            <View
              style={{
                height: '62%',
                width: '100%',
                backgroundColor: '#2563EB',
                zIndex: 10,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {renderTopBar('#FFF')}

              {/* Arch Glow perfectly anchored to bottom */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '85%',
                  maxWidth: 400,
                  height: '75%',
                  borderTopLeftRadius: 200,
                  borderTopRightRadius: 200,
                  backgroundColor: 'rgba(96, 165, 250, 0.2)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  zIndex: 1,
                }}
              />

              <View
                style={{
                  zIndex: 2,
                  alignItems: 'center',
                  paddingBottom: '20%',
                }}
              >
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 44,
                    fontFamily: 'Outfit-Bold',
                  }}
                >
                  BEST DEALS
                </Text>

                {/* Pills Wrapper */}
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    <View
                      style={[
                        styles.pill,
                        {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          borderWidth: 0,
                          paddingHorizontal: 14,
                          height: 32,
                        },
                      ]}
                    >
                      <Check color="#FF8A00" size={14} strokeWidth={4} />
                      <Text
                        style={[
                          styles.pillText,
                          { color: '#FFF', fontSize: 13, marginLeft: 6 },
                        ]}
                      >
                        Verified Dealers
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.pill,
                        {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          borderWidth: 0,
                          paddingHorizontal: 14,
                          height: 32,
                        },
                      ]}
                    >
                      <Check color="#FF8A00" size={14} strokeWidth={4} />
                      <Text
                        style={[
                          styles.pillText,
                          { color: '#FFF', fontSize: 13, marginLeft: 6 },
                        ]}
                      >
                        Secure Payments
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={[
                        styles.pill,
                        {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          borderWidth: 0,
                          paddingHorizontal: 14,
                          height: 32,
                        },
                      ]}
                    >
                      <Check color="#FF8A00" size={14} strokeWidth={4} />
                      <Text
                        style={[
                          styles.pillText,
                          { color: '#FFF', fontSize: 13, marginLeft: 6 },
                        ]}
                      >
                        Transparent Pricing
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Cars at the bottom edge */}
              <View
                style={{
                  position: 'absolute',
                  bottom: '-20%',
                  left: '-25%',
                  width: '130%',
                  height: 160 * (SCREEN_WIDTH / 390),
                  zIndex: 5,
                  transform: [{ scale: 0.93 }],
                }}
              >
                <CarOnboard3
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMax meet"
                />
              </View>
            </View>

            {/* Tyre Track */}
            <View
              style={{ width: '100%', height: 80, zIndex: 1, marginTop: -5 }}
            >
              <TyreMarkOnboard3
                width="100%"
                height="100%"
                preserveAspectRatio="none"
              />
            </View>

            {/* Bottom Text Area */}
            <View
              style={[
                styles.halfBottom,
                {
                  flex: 1,
                  height: 'auto',
                  backgroundColor: 'transparent',
                  paddingTop: 10,
                  paddingBottom: Math.max(insets.bottom, 20) + 30,
                },
              ]}
            >
              <View style={{ paddingHorizontal: 5 }}>
                <Text
                  style={[
                    styles.title,
                    {
                      textAlign: 'left',
                      fontSize: 26,
                      lineHeight: 32,
                      fontFamily: 'Outfit-Bold',
                    },
                  ]}
                >
                  Save More{'\n'}on Every Car{' '}
                  <Text
                    style={[styles.textBlue, { fontFamily: 'Outfit-Bold' }]}
                  >
                    Today
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    {
                      textAlign: 'left',
                      marginTop: 10,
                      fontSize: 14,
                      lineHeight: 20,
                      fontFamily: 'Outfit-Regular',
                      color: '#6B7280',
                    },
                  ]}
                >
                  No showroom visits, no endless negotiations — just the best
                  car deal, made simple for you.
                </Text>
              </View>

              <View
                style={[
                  styles.bottomNav,
                  { marginTop: 20, alignItems: 'center' },
                ]}
              >
                <View style={styles.dots}>
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={[styles.dot, styles.dotActive, { width: 32 }]} />
                </View>
                <TouchableOpacity
                  style={[
                    styles.getStartedBtn,
                    { paddingHorizontal: 20, height: 44, borderRadius: 22 },
                  ]}
                  onPress={handleNext}
                >
                  <Text style={[styles.getStartedText, { fontSize: 15 }]}>
                    Get Started
                  </Text>
                  <ArrowRight
                    color="#FFF"
                    size={18}
                    strokeWidth={2.5}
                    style={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* =======================
          STEP 4: LOGIN / OTP
          ======================= */}
      {currentStep === 4 && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.stepContainer, { backgroundColor: '#F8FAFC' }]}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
            {/* Top Background Pattern */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 350,
                zIndex: 0,
                overflow: 'hidden',
                alignItems: 'center',
              }}
            >
              {/* Circle container: shifted left to cover white space */}
              <View
                style={{
                  position: 'absolute',
                  top: -85 - SCREEN_HEIGHT * 0.015,
                  left: -140 - SCREEN_WIDTH * 0.14,
                  width: SCREEN_WIDTH * 1.5,
                  height: 350,
                  alignItems: 'center',
                }}
              >
                <Svg
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute' }}
                >
                  <Defs>
                    <LinearGradient
                      id="loginGrad"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0.5"
                    >
                      <Stop
                        offset="0.2336"
                        stopColor="#2563EB"
                        stopOpacity="0.2"
                      />
                      <Stop
                        offset="0.8904"
                        stopColor="#2563EB"
                        stopOpacity="0.1"
                      />
                    </LinearGradient>
                  </Defs>
                  <Ellipse
                    cx={(SCREEN_WIDTH * 1.5) / 2}
                    cy={160}
                    rx={(SCREEN_WIDTH * 1.5) / 2}
                    ry={160}
                    fill="url(#loginGrad)"
                  />
                </Svg>
              </View>

              {/* Tyre mark container: strictly centered on the screen */}
              <View
                style={{
                  position: 'absolute',
                  top: -100,
                  left: 0,
                  width: SCREEN_WIDTH,
                  height: 350,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '55%',
                    bottom: -2,
                  }}
                >
                  <LoginTyreMark
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: 80,
                marginLeft: 30,
                zIndex: 1,
                alignSelf: 'flex-start',
              }}
            >
              <BlackLogo width={180} height={50} />
            </View>

            <View style={[styles.loginBody, { marginTop: 150, zIndex: 1 }]}>
              <Text style={styles.loginTitle}>
                Welcome to <Text style={styles.textBlue}>CarBounty</Text>
              </Text>
              <Text style={styles.loginSubtitle}>
                Enter your mobile number to continue and access the best car
                deals near you.
              </Text>

              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Mobile Number</Text>
                <View style={styles.inputRow}>
                  <View style={styles.countryPicker}>
                    <Text>🇮🇳</Text>
                    <ChevronDown color="#94A3B8" size={16} />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="+91 000 000 0000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.whatsappToggle}
                onPress={() => setWhatsappUpdate(!whatsappUpdate)}
              >
                <View
                  style={[
                    styles.checkbox,
                    whatsappUpdate && styles.checkboxActive,
                  ]}
                >
                  {whatsappUpdate && (
                    <Check color="#FFF" size={12} strokeWidth={3} />
                  )}
                </View>
                <Text style={styles.whatsappText}>
                  Get Updates On{' '}
                  <Text style={{ color: '#2563EB', fontFamily: 'Outfit-Bold' }}>
                    WhatsApp
                  </Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => navigation.navigate('OTP')}
              >
                <Text style={styles.submitText}>Get OTP</Text>
              </TouchableOpacity>

              <Text style={styles.termsText}>
                By continuing, you agree to our Terms of Service &{'\n'}
                <Text style={styles.textBlue}>Privacy Policy</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  stepContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  skipBtn: {
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 4.5,
    borderRadius: 20,
  },
  skipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  absoluteWatermark: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  absoluteWatermarkBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 0,
  },
  absoluteWatermarkLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    justifyContent: 'center',
  },
  halfTop: {
    height: '60%',
    width: '100%',
    overflow: 'hidden',
  },
  halfBottom: {
    height: '40%',
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    color: '#1E293B',
    lineHeight: 34,
    marginBottom: 12,
  },
  textBlue: {
    color: '#2563EB',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    paddingRight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#2563EB',
  },
  nextBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  getStartedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  getStartedText: {
    color: '#FFF',
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
  },
  // Step 0 Specific
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    paddingBottom: 60,
  },
  splashEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  splashLogo: {
    fontSize: 32,
    color: '#FFF',
    fontFamily: 'Outfit-Bold',
  },
  loadingTrack: {
    position: 'absolute',
    bottom: 80,
    left: 40,
    right: 40,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  loadingCar: {
    position: 'absolute',
    bottom: 4,
    left: '50%',
    transform: [{ translateX: -12 }],
  },
  loadingFill: {
    height: '100%',
    width: '60%',
    backgroundColor: '#FFF',
  },
  // Step 1 Specific
  suvContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    zIndex: 10,
  },
  // Step 2 Specific
  featuresList: {
    paddingHorizontal: 30,
    marginTop: 20,
    zIndex: 10,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF9441',
    shadowColor: '#FF9441',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  featureText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  manPlaceholder: {
    position: 'absolute',
    right: -20,
    bottom: 0,
    width: 200,
    height: 250,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    zIndex: 5,
  },
  manGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#60A5FA',
    borderTopLeftRadius: 100,
    opacity: 0.3,
  },
  // Step 3 Specific
  arcGlow: {
    position: 'absolute',
    top: 115,
    width: 339.3,
    height: 388.5,
    borderTopLeftRadius: 209,
    borderTopRightRadius: 209,
    borderBottomRightRadius: 9.5,
    borderBottomLeftRadius: 9.5,
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 1,
  },
  dealsContent: {
    alignItems: 'center',
    marginTop: 30,
    zIndex: 10,
  },
  dealsTitle: {
    fontSize: 32,
    fontFamily: 'Outfit-Black',
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dealsPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  pillText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '500',
  },
  carsPlaceholder: {
    position: 'absolute',
    bottom: -20,
    width: '100%',
    alignItems: 'center',
    zIndex: 20,
  },
  carMockup: {
    width: 250,
    height: 80,
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 4,
    borderColor: '#334155',
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  carMockupWindow: {
    width: 80,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 10,
  },
  carMockupLight: {
    position: 'absolute',
    bottom: 10,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#EF4444',
  },
  // Step 4 Specific
  loginHeader: {
    height: 220,
    width: '100%',
  },
  loginLogoWrapper: {
    position: 'absolute',
    top: 20,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 10,
  },
  loginLogoEmoji: {
    fontSize: 24,
  },
  loginLogoText: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    fontWeight: '800',
    color: '#1E293B',
  },
  loginWatermark: {
    position: 'absolute',
    right: -40,
    top: 0,
    width: 250,
    height: '100%',
    transform: [{ rotate: '15deg' }],
  },
  loginBody: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  loginTitle: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    color: '#1E293B',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 30,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: 'Outfit-Medium',
    color: '#1E293B',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    height: 52,
    gap: 12,
  },
  countryPicker: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: 'Outfit-Medium',
    color: '#1E293B',
  },
  whatsappToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  whatsappText: {
    fontSize: 13,
    fontFamily: 'Outfit-Medium',
    color: '#475569',
  },
  submitBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 24,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
  termsText: {
    fontSize: 11,
    fontFamily: 'Outfit-Regular',
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 16,
  },
});
