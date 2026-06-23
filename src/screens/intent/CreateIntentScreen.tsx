import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import Svg, { Path, Rect, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Group94Svg from '../../../Group 94.svg';
import CarBountyLightSvg from '../../../carbountylight.svg';

const { width: screenWidth } = Dimensions.get('window');

type Props = NativeStackScreenProps<MainStackParamList, 'CreateIntent'>;

export const CreateIntentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { vehicleId, variantId } = route.params;
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State: Timeline
  const [timeline, setTimeline] = useState('Within this week');

  // Step 2 State: Insurance
  const [insurance, setInsurance] = useState("No — I'll arrange myself");

  // Step 3 State: Registration
  const [registerTo, setRegisterTo] = useState('Myself');
  const [legalName, setLegalName] = useState('');

  // Step 4 State: Location
  const [proximity, setProximity] = useState('Anywhere in NCR');
  const deliveryCity = 'Delhi NCR';

  // Step 5 State: Room Duration
  const [roomDuration, setRoomDuration] = useState('24 Hours');

  const handleNext = () => {
    if (currentStep < 5) {
      if (currentStep === 3 && registerTo === 'Myself' && !legalName.trim()) {
        Alert.alert('Name Required', 'Please enter your full legal name as on Aadhaar / PAN.');
        return;
      }
      setCurrentStep(currentStep + 1);
    } else {
      // Proceed to CommitmentPay
      navigation.navigate('CommitmentPay', {
        intentId: `int_${Math.floor(Math.random() * 900000) + 100000}`,
        variantId: variantId,
        price: 1599000, // default mock price
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const progressPercentage = currentStep * 20;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Background Linear Gradient */}
      <View style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
              <Stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#bgGrad)" />
        </Svg>
      </View>

      <ScreenWrapper style={styles.wrapper} edges={['top', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleBack} style={styles.backBtn}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#0F172A" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step {currentStep} of 5</Text>
        {currentStep === 5 ? (
          <View style={styles.finalStepBadge}>
            <Text style={styles.finalStepBadgeText}>Final Step</Text>
          </View>
        ) : (
          <View style={styles.placeholderBtn} />
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressText}>{progressPercentage}% Complete</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {currentStep === 1 && (
          /* Step 1: planning timeline */
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>When are you planning to buy?</Text>
            <Text style={styles.questionSub}>
              This helps dealers prioritise your bid room and make better offers.
            </Text>

            <View style={styles.optionsList}>
              {[
                {
                  title: 'Within this week',
                  sub: 'Highest dealer urgency - Best bids expected',
                  icon: '⚡',
                },
                {
                  title: '1-2 weeks',
                  sub: 'Standard timeline - Good dealer engagement',
                  icon: '📅',
                },
                {
                  title: 'This month',
                  sub: 'Dealers will bid but may not rush',
                  icon: '📆',
                },
                {
                  title: 'Just exploring',
                  sub: 'Research mode - see real market prices',
                  icon: '🔍',
                },
              ].map((item) => {
                const isSelected = timeline === item.title;
                return (
                  <TouchableOpacity
                    key={item.title}
                    activeOpacity={0.9}
                    onPress={() => setTimeline(item.title)}
                    style={[styles.optionCard, isSelected && styles.optionCardActive]}
                  >
                    <Text style={styles.optionEmoji}>{item.icon}</Text>
                    <View style={styles.optionTextContainer}>
                      <Text style={[styles.optionTitle, isSelected && styles.optionTextActive]}>{item.title}</Text>
                      <Text style={styles.optionSubText}>{item.sub}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {currentStep === 2 && (
          /* Step 2: insurance options */
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>Do you want insurance options from dealers?</Text>
            <Text style={styles.questionSub}>
              Dealers can include insurance quotes as part of their bid — bundled or separate.
            </Text>

            <View style={styles.optionsList}>
              {[
                {
                  title: 'Yes — bundled in bid price',
                  sub: 'Comprehensive + 3rd party included in on-road quote',
                  icon: '📦',
                },
                {
                  title: 'Yes — show separately',
                  sub: "I'll compare insurance quotes independently",
                  icon: '📋',
                },
                {
                  title: '3rd party only (mandatory)',
                  sub: 'Minimum legal requirement • Own damage self-arranged',
                  icon: '🛡️',
                },
                {
                  title: "No — I'll arrange myself",
                  sub: 'Exclude insurance from dealer bids',
                  icon: '🚫',
                },
              ].map((item) => {
                const isSelected = insurance === item.title;
                return (
                  <TouchableOpacity
                    key={item.title}
                    activeOpacity={0.9}
                    onPress={() => setInsurance(item.title)}
                    style={[styles.optionCard, isSelected && styles.optionCardActive]}
                  >
                    <Text style={styles.optionEmoji}>{item.icon}</Text>
                    <View style={styles.optionTextContainer}>
                      <Text style={[styles.optionTitle, isSelected && styles.optionTextActive]}>{item.title}</Text>
                      <Text style={styles.optionSubText}>{item.sub}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {currentStep === 3 && (
          /* Step 3: Registration */
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>Who will the car be registered to?</Text>
            <Text style={styles.questionSub}>
              This name appears on the Registration Certificate (RC). It affects loan eligibility.
            </Text>

            <View style={styles.optionsList}>
              {[
                {
                  title: 'Myself',
                  sub: 'Most common',
                  icon: '👤',
                },
                {
                  title: 'Spouse / Partner',
                  sub: 'Different name on RC — affects EMI eligibility',
                  icon: '👥',
                },
                {
                  title: 'Company / Business',
                  sub: 'Corporate registration • GST benefits may apply',
                  icon: '🏢',
                },
                {
                  title: 'Other family member',
                  sub: 'Parent, sibling — specify during booking',
                  icon: '👪',
                },
              ].map((item) => {
                const isSelected = registerTo === item.title;
                return (
                  <View key={item.title} style={{ marginBottom: 12 }}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => setRegisterTo(item.title)}
                      style={[styles.optionCard, isSelected && styles.optionCardActive, { marginBottom: 0 }]}
                    >
                      <Text style={styles.optionEmoji}>{item.icon}</Text>
                      <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>{item.title}</Text>
                        <Text style={styles.optionSubText}>{item.sub}</Text>
                      </View>
                    </TouchableOpacity>

                    {/* Nested Input with dashed arrow for Myself */}
                    {isSelected && item.title === 'Myself' && (
                      <View>
                        {/* Dashed curved arrow */}
                        <Svg width={40} height={48} style={{ marginLeft: 16 }}>
                          <Path
                            d="M 12 4 C 12 28, 28 32, 32 44"
                            stroke="#2563EB"
                            strokeWidth={1.8}
                            strokeDasharray="4,3"
                            fill="none"
                            strokeLinecap="round"
                          />
                          {/* Arrowhead */}
                          <Path
                            d="M 28 41 L 32 44 L 35 40"
                            stroke="#2563EB"
                            strokeWidth={1.8}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Dot at top */}
                          <Path d="M 12 4" stroke="#2563EB" strokeWidth={4} strokeLinecap="round" fill="#2563EB" />
                        </Svg>
                        <View style={styles.nestedInputContainer}>
                          <Text style={styles.inputLabel}>Name as on Aadhaar / PAN</Text>
                          <TextInput
                            style={styles.textInput}
                            placeholder="Full legal name"
                            placeholderTextColor="#94A3B8"
                            value={legalName}
                            onChangeText={setLegalName}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {currentStep === 4 && (
          /* Step 4: Location */
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>Where are you located?</Text>
            <Text style={styles.questionSub}>
              We'll show you dealers within your preferred delivery zone.
            </Text>

            {/* Detected Location Card */}
            <View style={styles.locationDetectedCard}>
              <View style={styles.locationDetectedTop}>
                <View style={styles.locationIconCircle}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FFFFFF" />
                  </Svg>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.locationCityText}>Delhi NCR</Text>
                  <Text style={styles.locationSubText}>South Delhi • PIN 110025</Text>
                </View>
                <TouchableOpacity style={styles.useThisBtn} activeOpacity={0.85}>
                  <Text style={styles.useThisBtnText}>Use this</Text>
                </TouchableOpacity>
              </View>
              {/* Map placeholder */}
              <View style={styles.mapPlaceholder}>
                <Svg width="100%" height="100%" viewBox="0 0 340 120">
                  <Rect width="340" height="120" fill="#E8F0FE" />
                  {/* Grid lines */}
                  {[0,40,80,120,160,200,240,280,320].map(x => (
                    <Path key={`v${x}`} d={`M ${x} 0 L ${x} 120`} stroke="#C5D5F0" strokeWidth={0.5} />
                  ))}
                  {[0,30,60,90,120].map(y => (
                    <Path key={`h${y}`} d={`M 0 ${y} L 340 ${y}`} stroke="#C5D5F0" strokeWidth={0.5} />
                  ))}
                  {/* Roads */}
                  <Path d="M 60 60 Q 120 40 180 60 Q 240 80 300 55" stroke="#FFFFFF" strokeWidth={5} fill="none" />
                  <Path d="M 0 75 L 340 70" stroke="#FFFFFF" strokeWidth={3} fill="none" />
                  <Path d="M 170 0 L 165 120" stroke="#FFFFFF" strokeWidth={3} fill="none" />
                  {/* Location pin */}
                  <Circle cx={170} cy={58} r={8} fill="#EF4444" />
                  <Circle cx={170} cy={58} r={4} fill="#FFFFFF" />
                </Svg>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.orDivider}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR ENTER MANUALLY</Text>
              <View style={styles.orLine} />
            </View>

            {/* City Input */}
            <Text style={styles.locationFieldLabel}>City</Text>
            <View style={styles.locationInputRow}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
                <Path d="M17 11H7a2 2 0 000 4h10a2 2 0 000-4zM17 7H7a2 2 0 000 4h10a2 2 0 000-4zM7 15h10v2H7z" fill="#94A3B8" />
              </Svg>
              <TextInput
                style={styles.locationInput}
                placeholder="e.g. Gurugram"
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* Area + PIN Row */}
            <View style={styles.twoColRow}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.locationFieldLabel}>Area / Colony (Optional)</Text>
                <TextInput
                  style={styles.locationInputBox}
                  placeholder="Sector 44"
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.locationFieldLabel}>PIN Code</Text>
                <TextInput
                  style={styles.locationInputBox}
                  placeholder="110001"
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
            </View>

            {/* Dealer Proximity */}
            <Text style={[styles.locationFieldLabel, { marginTop: 16 }]}>Dealer Proximity Preference</Text>
            <View style={styles.proximityChipRow}>
              {['Anywhere in NCR', 'Within 10 km', 'Within 20 km', 'Doorstep delivery only'].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  activeOpacity={0.8}
                  onPress={() => setProximity(opt)}
                  style={[
                    styles.proximityChip,
                    proximity === opt && styles.proximityChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.proximityChipText,
                      proximity === opt && styles.proximityChipTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {currentStep === 5 && (
          /* Step 5: Review Your Room */
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>Review Your Room</Text>

            {/* Car Card with gradient + ellipse + CarBounty watermark */}
            <View style={styles.reviewCarCard}>
              {/* Gradient background via SVG */}
              <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
                <Defs>
                  <LinearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor="#2563EB" stopOpacity={0} />
                    <Stop offset="100%" stopColor="#2563EB" stopOpacity={0.2} />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#cardGrad)" rx={14} />
                {/* Ellipse in top-left */}
                <Circle cx={-20} cy={-20} r={90} fill="none" stroke="#2563EB" strokeWidth={2.5} strokeOpacity={0.3} />
                <Circle cx={-20} cy={-20} r={60} fill="none" stroke="#2563EB" strokeWidth={2.5} strokeOpacity={0.2} />
                <Circle cx={-20} cy={-20} r={35} fill="#2563EB" fillOpacity={0.08} />
              </Svg>

              {/* CarBounty watermark top-right */}
              <View style={styles.carbountyWatermark} pointerEvents="none">
                <CarBountyLightSvg width={180} height={50} opacity={0.6} />
              </View>

              {/* Car image */}
              <View style={styles.reviewCarImageArea}>
                <Group94Svg width="90%" height={140} />
              </View>

              {/* Edit button */}
              <TouchableOpacity style={styles.editCarBtn} onPress={() => setCurrentStep(1)}>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </Svg>
                <Text style={styles.editCarBtnText}>Edit</Text>
              </TouchableOpacity>

              {/* Car info bottom */}
              <View style={styles.reviewCarInfo}>
                <View style={styles.reviewCarNameRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewCarName}>Maruti Brezza ZXI+</Text>
                    <View style={styles.reviewCarSpecsRow}>
                      <Text style={styles.reviewCarSpecBlue}>Petrol</Text>
                      <Text style={styles.reviewCarSpecSep}> • </Text>
                      <Text style={styles.reviewCarSpecBlue}>Automatic</Text>
                      <Text style={styles.reviewCarSpecSep}> • </Text>
                      <View style={styles.colorBadge}>
                        <View style={[styles.specDot, { backgroundColor: '#EF4444' }]} />
                        <Text style={styles.colorBadgeText}>Red</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.variantsContainer}>
                    <View style={styles.variantsBadge}>
                      <Text style={styles.variantsBadgeNum}>06</Text>
                    </View>
                    <Text style={styles.variantsBadgeLabel}>
                      <Text style={styles.variantsBold}>Variants</Text>{`\n`}Available
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Your Requirements - flat list, no card */}
            <Text style={styles.sectionHeading}>Your Requirements</Text>
            <View style={{ marginBottom: 20 }}>
              {[
                { icon: '👤', label: 'Registered to', value: `${legalName || 'Neha Anand'} (Self)`, step: 3 },
                { icon: '📍', label: 'Location', value: `${deliveryCity} • 110025`, step: 4 },
                { icon: '⏰', label: 'Timeline', value: timeline, step: 1 },
                { icon: '🛡️', label: 'Insurance', value: insurance.includes('bundled') || insurance.includes('Yes — bundled') ? 'Bundled in bid' : insurance, step: 2 },
              ].map((item, idx, arr) => (
                <View key={item.label} style={[styles.requirementRow, idx < arr.length - 1 && styles.requirementRowBorder]}>
                  <View style={styles.requirementIconBox}>
                    <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.requirementLabel}>{item.label}</Text>
                    <Text style={styles.requirementValue}>{item.value}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setCurrentStep(item.step)} style={styles.editRowBtn}>
                    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </Svg>
                    <Text style={styles.editRowBtnText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* What Happens Next */}
            <Text style={styles.sectionHeading}>What Happens Next</Text>
            <View style={styles.whatNextCard}>
              {[
                { text: 'Your requirements are shared with verified dealers in your area', hasCarbounty: true },
                { text: 'Dealers submit competitive bids — you see dealer #1, #2 etc. (anonymous)' },
                { text: 'Pick the best offer — not just lowest price, check perks & delivery time too' },
                { text: 'Dealer uploads chassis details → Agreement & Quotation auto-generated' },
              ].map((item, i) => (
                <View key={i} style={styles.whatNextRow}>
                  <View style={styles.whatNextDot} />
                  {item.hasCarbounty ? (
                    <Text style={styles.whatNextText}>
                      Your requirements are shared with verified <Text style={{ color: '#2563EB', fontFamily: 'Outfit-Bold' }}>CarBounty</Text> dealers in your area
                    </Text>
                  ) : (
                    <Text style={styles.whatNextText}>{item.text}</Text>
                  )}
                </View>
              ))}
            </View>

            {/* Room Duration */}
            <Text style={styles.sectionHeading}>Room Duration</Text>
            <View style={styles.durationChipRow}>
              {['30 Min', '1 Hour', '2 Hours', '24 Hours'].map((d) => (
                <TouchableOpacity
                  key={d}
                  activeOpacity={0.8}
                  onPress={() => setRoomDuration(d)}
                  style={[styles.durationChip, roomDuration === d && styles.durationChipActive]}
                >
                  <Text style={[styles.durationChipText, roomDuration === d && styles.durationChipTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleNext} style={styles.nextBtn}>
          <Text style={styles.nextBtnText}>{currentStep === 5 ? 'Choose Seriousness Check' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDEEF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
  },
  placeholderBtn: {
    width: 44,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginRight: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF7A45', // orange progress fill
  },
  progressText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
    color: '#64748B',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  stepContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  questionTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#0F172A',
    lineHeight: 26,
  },
  questionSub: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#64748B',
    marginTop: 8,
    lineHeight: 18,
    marginBottom: 24,
  },
  optionsList: {
    width: '100%',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  optionCardActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#0F172A',
  },
  optionTextActive: {
    color: '#2563EB',
  },
  optionSubText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
    color: '#64748B',
    marginTop: 3,
  },
  nestedInputContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginTop: 4,
    padding: 16,
  },
  inputLabel: {
    fontFamily: 'Outfit-Bold',
    fontSize: 12,
    color: '#0F172A',
    marginBottom: 8,
  },
  textInput: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
  nestedInputLabel: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 8,
  },
  perkOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  perkOptionActive: {
    borderColor: '#2563EB',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkboxCheck: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  perkText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#475569',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 14,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  summaryLabel: {
    fontFamily: 'Outfit-Bold',
    fontSize: 13,
    color: '#64748B',
  },
  summaryValue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 13,
    color: '#0F172A',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#EDEEF3',
  },
  nextBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  nextBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  // Location screen styles
  locationDetectedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 20,
  },
  locationDetectedTop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  locationIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationCityText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
    color: '#0F172A',
  },
  locationSubText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  useThisBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  useThisBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  mapPlaceholder: {
    height: 120,
    width: '100%',
    overflow: 'hidden',
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 10,
    color: '#94A3B8',
    marginHorizontal: 10,
    letterSpacing: 0.8,
  },
  locationFieldLabel: {
    fontFamily: 'Outfit-Bold',
    fontSize: 13,
    color: '#0F172A',
    marginBottom: 8,
  },
  locationInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  locationInput: {
    flex: 1,
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
  locationInputBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
  twoColRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  proximityChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  proximityChip: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  proximityChipActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  proximityChipText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#475569',
  },
  proximityChipTextActive: {
    color: '#2563EB',
    fontFamily: 'Outfit-Bold',
  },
  // Step 5 styles
  finalStepBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  finalStepBadgeText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 11,
    color: '#2563EB',
  },
  reviewCarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 6,
  },
  reviewCarImageBox: {
    height: 130,
    width: '100%',
    position: 'relative',
  },
  carbountyWatermark: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  reviewCarImageArea: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  reviewCarImage: {
    width: '80%',
    height: 130,
  },
  editCarBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  editCarBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 11,
    color: '#2563EB',
  },
  reviewCarInfo: {
    padding: 14,
  },
  reviewCarNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCarName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
  },
  reviewCarSpecsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  specDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  reviewCarSpecs: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  reviewCarSpecBlue: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#2563EB',
  },
  reviewCarSpecSep: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  variantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  variantsBadge: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
  },
  variantsBadgeNum: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  variantsBadgeLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  variantsBold: {
    fontFamily: 'Outfit-Bold',
    color: '#0F172A',
  },
  colorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  colorBadgeText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
    color: '#0F172A',
  },
  sectionHeading: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 12,
    marginTop: 4,
  },
  requirementsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    overflow: 'hidden',
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  requirementRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  requirementIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  requirementLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
    color: '#94A3B8',
  },
  requirementValue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 13,
    color: '#2563EB',
    marginTop: 2,
  },
  editRowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editRowBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 12,
    color: '#2563EB',
  },
  whatNextCard: {
    backgroundColor: 'rgba(37, 99, 235, 0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
    padding: 14,
    marginBottom: 20,
    gap: 12,
  },
  whatNextRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  whatNextDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginTop: 5,
  },
  whatNextText: {
    flex: 1,
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#727687',
    lineHeight: 18,
  },
  durationChipRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  durationChip: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
  },
  durationChipActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  durationChipText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
    color: '#475569',
  },
  durationChipTextActive: {
    color: '#2563EB',
    fontFamily: 'Outfit-Bold',
  },
});
