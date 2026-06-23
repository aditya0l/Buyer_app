import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import Svg, { Path, Rect, Circle, Defs, LinearGradient, Stop, G, ClipPath } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');
const BASE_WIDTH = 440;
const scale = (size: number) => Math.round((screenWidth / BASE_WIDTH) * size);

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface CarItem {
  id: string;
  name: string;
  specs: string;
  price: string;
  category: string;
  imageUrl: string;
}

const suggestedCarsData: CarItem[] = [
  {
    id: 'brezza',
    name: 'Maruti Brezza ZXI+',
    specs: 'Petrol • Automatic • 🔴 Red',
    price: '₹15.99L',
    category: 'Compact SUV',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'creta',
    name: 'Hyundai Creta SX',
    specs: 'Diesel • MT • ⚪ White',
    price: '₹15.99L',
    category: 'Compact SUV',
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=200&auto=format&fit=crop',
  },
];

const NotchedSuggestedCard: React.FC<{
  car: CarItem;
  isSelected: boolean;
  onAdd: (car: CarItem) => void;
}> = ({ car, isSelected, onAdd }) => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const onLayout = (e: any) => {
    const { width, height } = e.nativeEvent.layout;
    if (width && height) {
      setDimensions({ width, height });
    }
  };

  const w = dimensions.width;
  const h = dimensions.height;
  const r = 16;
  const notchW = 74;
  const notchH = 38;

  const pathData = w && h ? `
    M ${r} 0
    L ${w - r} 0
    A ${r} ${r} 0 0 1 ${w} ${r}
    L ${w} ${h - notchH - r}
    A ${r} ${r} 0 0 1 ${w - r} ${h - notchH}
    L ${w - notchW + r} ${h - notchH}
    A ${r} ${r} 0 0 0 ${w - notchW} ${h - notchH + r}
    L ${w - notchW} ${h - r}
    A ${r} ${r} 0 0 1 ${w - notchW - r} ${h}
    L ${r} ${h}
    A ${r} ${r} 0 0 1 0 ${h - r}
    L 0 ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    Z
  ` : '';

  const specsParts = car.specs.split('•');
  const fuel = specsParts[0]?.trim() || '';
  const transmission = specsParts[1]?.trim() || '';
  const colorSpec = specsParts[2]?.trim() || '';

  return (
    <View style={styles.suggestedCardContainer} onLayout={onLayout}>
      {w > 0 && h > 0 && (
        <View style={StyleSheet.absoluteFill}>
          <Svg width={w} height={h}>
            <Path
              d={pathData}
              fill="#FFFFFF"
              stroke="#EDEEF3"
              strokeWidth={1}
            />
          </Svg>
        </View>
      )}

      <View style={{ flex: 1, padding: scale(8), paddingBottom: notchH }}>
        <Image source={{ uri: car.imageUrl }} style={styles.suggestedImage} resizeMode="cover" />
        <View style={styles.suggestedInfo}>
          <Text style={styles.suggestedName}>{car.name}</Text>
          
          <View style={styles.specsRowContainer}>
            <Text style={styles.specsText}>{fuel} • {transmission} • </Text>
            {colorSpec ? (
              <View style={styles.colorBadge}>
                <Text style={styles.colorBadgeText}>{colorSpec}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.suggestedPrice}>{car.price}</Text>
            <Text style={styles.exShLabel}>ex - sh</Text>
          </View>
        </View>
      </View>

      <View style={styles.categoryBadgeContainer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{car.category}</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onAdd(car)}
        style={[
          styles.notchedAddBtn,
          isSelected && styles.addBtnDisabled,
          { width: scale(63), height: scale(28) }
        ]}
        disabled={isSelected}
      >
        <Text style={styles.addBtnText}>{isSelected ? 'Added' : '+ Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SelectYourCarsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeMode, setActiveMode] = useState<'SAME' | 'MULTI'>('SAME');
  const [selectedCars, setSelectedCars] = useState<CarItem[]>([]);

  const handleAddCar = (car: CarItem) => {
    if (activeMode === 'SAME') {
      // In Same Model mode, we can only select one car
      setSelectedCars([car]);
    } else {
      // In Multi-Model mode, we can select multiple (max 3 for our list)
      if (selectedCars.some((c) => c.id === car.id)) return;
      if (selectedCars.length < 3) {
        setSelectedCars([...selectedCars, car]);
      }
    }
  };

  const handleRemoveCar = (id: string) => {
    setSelectedCars(selectedCars.filter((c) => c.id !== id));
  };

  const handleContinue = () => {
    if (selectedCars.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one car configuration to proceed.');
      return;
    }
    // Navigate to CreateIntent with selected vehicle details
    navigation.navigate('CreateIntent', {
      vehicleId: selectedCars[0].id === 'brezza' ? 'maruti-brezza' : 'hyundai-creta',
      variantId: 'zxi-plus',
    });
  };

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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              fill="#0F172A"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Your Cars</Text>
        <View style={styles.placeholderBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Toggle Mode Tab Selector */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setActiveMode('SAME');
              setSelectedCars([]);
            }}
            style={[styles.toggleTab, activeMode === 'SAME' && styles.toggleTabActive]}
          >
            <Text style={[styles.toggleText, activeMode === 'SAME' && styles.toggleTextActive]}>
              Same Model
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setActiveMode('MULTI');
              setSelectedCars([]);
            }}
            style={[styles.toggleTab, activeMode === 'MULTI' && styles.toggleTabActive]}
          >
            <Text style={[styles.toggleText, activeMode === 'MULTI' && styles.toggleTextActive]}>
              Multi -Model
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Label */}
        <Text style={styles.infoLabel}>
          {activeMode === 'SAME'
            ? 'ⓘ Single model same price bidding'
            : 'ⓘ Multi-Model • Compare bids side by side'}
        </Text>

        {/* Selected / Select Car Area */}
        <View style={styles.section}>
          {activeMode === 'SAME' ? (
            selectedCars.length === 0 ? (
              /* State 1: Select Your Car Dashed Box */
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.dashedBoxGreen}
                onPress={() => handleAddCar(suggestedCarsData[0])}
              >
                <Svg width={44} height={44} viewBox="0 0 62 62" fill="none" style={{ marginRight: 14 }}>
                  <Rect width="62" height="62" rx="10" fill="#D8F2D8"/>
                  <G clipPath="url(#clip0_12151_464)">
                    <Path d="M39.5 31C34.825 31 31 34.825 31 39.5C31 44.175 34.825 48 39.5 48C44.175 48 48 44.175 48 39.5C48 34.825 44.175 31 39.5 31ZM42.6875 40.5625H40.5625V42.6875C40.5625 43.325 40.1375 43.75 39.5 43.75C38.8625 43.75 38.4375 43.325 38.4375 42.6875V40.5625H36.3125C35.675 40.5625 35.25 40.1375 35.25 39.5C35.25 38.8625 35.675 38.4375 36.3125 38.4375H38.4375V36.3125C38.4375 35.675 38.8625 35.25 39.5 35.25C40.1375 35.25 40.5625 35.675 40.5625 36.3125V38.4375H42.6875C43.325 38.4375 43.75 38.8625 43.75 39.5C43.75 40.1375 43.325 40.5625 42.6875 40.5625Z" fill="#207320"/>
                    <Path d="M22.925 37.375L24.2 34.9313C24.7313 33.8688 25.7937 33.125 27.0688 33.125H31C32.9125 30.575 35.9937 28.875 39.5 28.875C40.775 28.875 41.9438 29.0875 43.1125 29.5125C42.6875 28.875 42.1562 28.2375 41.625 27.8125H42.6875C43.325 27.8125 43.75 27.3875 43.75 26.75C43.75 26.1125 43.325 25.6875 42.6875 25.6875H39.7125L38.4375 22.5C37.5875 20.5875 35.675 19.3125 33.55 19.3125H24.2C22.075 19.3125 20.1625 20.5875 19.3125 22.5L17.9313 25.6875H15.0625C14.425 25.6875 14 26.1125 14 26.75C14 27.3875 14.425 27.8125 15.0625 27.8125H16.125C14.85 28.7688 14 30.3625 14 32.0625V36.3125C14 37.2687 14.425 38.1188 15.0625 38.65V40.5625C15.0625 42.3687 16.4437 43.75 18.25 43.75H20.375C22.1812 43.75 23.5625 42.3687 23.5625 40.5625V39.5H28.875C28.875 38.7563 28.9812 38.0125 29.0875 37.375H22.925ZM21.4375 34.1875H18.25C17.6125 34.1875 17.1875 33.7625 17.1875 33.125C17.1875 32.4875 17.6125 32.0625 18.25 32.0625H21.4375C22.075 32.0625 22.5 32.4875 22.5 33.125C22.5 33.7625 22.075 34.1875 21.4375 34.1875ZM19.8438 26.75L21.3313 23.35C21.8625 22.1813 22.925 21.4375 24.2 21.4375H33.4437C34.7188 21.4375 35.8875 22.1813 36.4188 23.35L37.9062 26.75H19.8438Z" fill="#207320"/>
                  </G>
                  <Defs>
                    <ClipPath id="clip0_12151_464">
                      <Rect width="34" height="34" fill="white" transform="translate(14 14)"/>
                    </ClipPath>
                  </Defs>
                </Svg>
                <View style={styles.dashedBoxContent}>
                  <Text style={styles.dashedBoxTitleGreen}>Select Your Car</Text>
                  <Text style={styles.dashedBoxSubtitle}>Choose the car you want dealers to bid on</Text>
                </View>
              </TouchableOpacity>
            ) : (
              /* State 2: Selection Card */
              <View style={styles.selectionCardGreenContainer}>
                <View style={styles.selectionHeaderRow}>
                  <Text style={styles.selectionTitleGreen}>Your Selection</Text>
                  <Text style={styles.selectionSubTextGrey}>The car you want to buy</Text>
                </View>
                
                <View style={styles.whiteCarCard}>
                  <View style={styles.imageBadgeContainer}>
                    <View style={styles.verticalGreenStripe} />
                    <Image source={{ uri: selectedCars[0].imageUrl }} style={styles.selectedCarImage} />
                  </View>

                  <View style={styles.selectedCarInfo}>
                    <Text style={styles.selectedCarName}>{selectedCars[0].name}</Text>
                    <Text style={styles.selectedCarDetailsText}>
                      {selectedCars[0].category === 'Compact SUV' ? 'SUV' : selectedCars[0].category} • {selectedCars[0].specs.split('•')[0]?.trim()} • {selectedCars[0].id === 'brezza' ? '₹12L - ₹15L' : '₹15L - ₹18L'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleRemoveCar(selectedCars[0].id)}
                    style={styles.trashCircleBtn}
                  >
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                        fill="#EF4444"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            )
          ) : (
            /* State 3: Multi-Model Lists */
            <View style={styles.selectionCardGreenContainer}>
              <View style={styles.selectionHeaderRow}>
                <Text style={styles.selectionTitleGreen}>Your Selection</Text>
                <Text style={styles.selectionSubTextGrey}>The cars you want to buy</Text>
              </View>

              {/* Render Selected Cars */}
              {selectedCars.map((car) => (
                <View key={car.id} style={[styles.whiteCarCard, { marginBottom: 12 }]}>
                  <View style={styles.imageBadgeContainer}>
                    <View style={styles.verticalGreenStripe} />
                    <Image source={{ uri: car.imageUrl }} style={styles.selectedCarImage} />
                  </View>

                  <View style={styles.selectedCarInfo}>
                    <Text style={styles.selectedCarName}>{car.name}</Text>
                    <Text style={styles.selectedCarDetailsText}>
                      {car.category === 'Compact SUV' ? 'SUV' : car.category} • {car.specs.split('•')[0]?.trim()} • {car.id === 'brezza' ? '₹12L - ₹15L' : '₹15L - ₹18L'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleRemoveCar(car.id)}
                    style={styles.trashCircleBtn}
                  >
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                        fill="#EF4444"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
              ))}

              {/* Box 2: Add a Car to Compare */}
              {selectedCars.length < 2 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.dashedBoxGreen, { marginBottom: 12 }]}
                  onPress={() => handleAddCar(suggestedCarsData[0])}
                >
                  <Svg width={44} height={44} viewBox="0 0 62 62" fill="none" style={{ marginRight: 14 }}>
                    <Rect width="62" height="62" rx="10" fill="#D8F2D8"/>
                    <G clipPath="url(#clip0_12151_464_2)">
                      <Path d="M39.5 31C34.825 31 31 34.825 31 39.5C31 44.175 34.825 48 39.5 48C44.175 48 48 44.175 48 39.5C48 34.825 44.175 31 39.5 31ZM42.6875 40.5625H40.5625V42.6875C40.5625 43.325 40.1375 43.75 39.5 43.75C38.8625 43.75 38.4375 43.325 38.4375 42.6875V40.5625H36.3125C35.675 40.5625 35.25 40.1375 35.25 39.5C35.25 38.8625 35.675 38.4375 36.3125 38.4375H38.4375V36.3125C38.4375 35.675 38.8625 35.25 39.5 35.25C40.1375 35.25 40.5625 35.675 40.5625 36.3125V38.4375H42.6875C43.325 38.4375 43.75 38.8625 43.75 39.5C43.75 40.1375 43.325 40.5625 42.6875 40.5625Z" fill="#207320"/>
                      <Path d="M22.925 37.375L24.2 34.9313C24.7313 33.8688 25.7937 33.125 27.0688 33.125H31C32.9125 30.575 35.9937 28.875 39.5 28.875C40.775 28.875 41.9438 29.0875 43.1125 29.5125C42.6875 28.875 42.1562 28.2375 41.625 27.8125H42.6875C43.325 27.8125 43.75 27.3875 43.75 26.75C43.75 26.1125 43.325 25.6875 42.6875 25.6875H39.7125L38.4375 22.5C37.5875 20.5875 35.675 19.3125 33.55 19.3125H24.2C22.075 19.3125 20.1625 20.5875 19.3125 22.5L17.9313 25.6875H15.0625C14.425 25.6875 14 26.1125 14 26.75C14 27.3875 14.425 27.8125 15.0625 27.8125H16.125C14.85 28.7688 14 30.3625 14 32.0625V36.3125C14 37.2687 14.425 38.1188 15.0625 38.65V40.5625C15.0625 42.3687 16.4437 43.75 18.25 43.75H20.375C22.1812 43.75 23.5625 42.3687 23.5625 40.5625V39.5H28.875C28.875 38.7563 28.9812 38.0125 29.0875 37.375H22.925ZM21.4375 34.1875H18.25C17.6125 34.1875 17.1875 33.7625 17.1875 33.125C17.1875 32.4875 17.6125 32.0625 18.25 32.0625H21.4375C22.075 32.0625 22.5 32.4875 22.5 33.125C22.5 33.7625 22.075 34.1875 21.4375 34.1875ZM19.8438 26.75L21.3313 23.35C21.8625 22.1813 22.925 21.4375 24.2 21.4375H33.4437C34.7188 21.4375 35.8875 22.1813 36.4188 23.35L37.9062 26.75H19.8438Z" fill="#207320"/>
                    </G>
                    <Defs>
                      <ClipPath id="clip0_12151_464_2">
                        <Rect width="34" height="34" fill="white" transform="translate(14 14)"/>
                      </ClipPath>
                    </Defs>
                  </Svg>
                  <View style={styles.dashedBoxContent}>
                    <Text style={styles.dashedBoxTitleGreen}>Add a Car to Compare</Text>
                    <Text style={styles.dashedBoxSubtitle}>Choose a car you want dealers to bid on</Text>
                  </View>
                </TouchableOpacity>
              )}

              {/* Box 3: Add Another Car (Optional) */}
              {selectedCars.length < 3 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.dashedBoxGreen}
                  onPress={() => handleAddCar(suggestedCarsData[1])}
                >
                  <Svg width={44} height={44} viewBox="0 0 62 62" fill="none" style={{ marginRight: 14 }}>
                    <Rect width="62" height="62" rx="10" fill="#D8F2D8"/>
                    <G clipPath="url(#clip0_12151_464_3)">
                      <Path d="M39.5 31C34.825 31 31 34.825 31 39.5C31 44.175 34.825 48 39.5 48C44.175 48 48 44.175 48 39.5C48 34.825 44.175 31 39.5 31ZM42.6875 40.5625H40.5625V42.6875C40.5625 43.325 40.1375 43.75 39.5 43.75C38.8625 43.75 38.4375 43.325 38.4375 42.6875V40.5625H36.3125C35.675 40.5625 35.25 40.1375 35.25 39.5C35.25 38.8625 35.675 38.4375 36.3125 38.4375H38.4375V36.3125C38.4375 35.675 38.8625 35.25 39.5 35.25C40.1375 35.25 40.5625 35.675 40.5625 36.3125V38.4375H42.6875C43.325 38.4375 43.75 38.8625 43.75 39.5C43.75 40.1375 43.325 40.5625 42.6875 40.5625Z" fill="#207320"/>
                      <Path d="M22.925 37.375L24.2 34.9313C24.7313 33.8688 25.7937 33.125 27.0688 33.125H31C32.9125 30.575 35.9937 28.875 39.5 28.875C40.775 28.875 41.9438 29.0875 43.1125 29.5125C42.6875 28.875 42.1562 28.2375 41.625 27.8125H42.6875C43.325 27.8125 43.75 27.3875 43.75 26.75C43.75 26.1125 43.325 25.6875 42.6875 25.6875H39.7125L38.4375 22.5C37.5875 20.5875 35.675 19.3125 33.55 19.3125H24.2C22.075 19.3125 20.1625 20.5875 19.3125 22.5L17.9313 25.6875H15.0625C14.425 25.6875 14 26.1125 14 26.75C14 27.3875 14.425 27.8125 15.0625 27.8125H16.125C14.85 28.7688 14 30.3625 14 32.0625V36.3125C14 37.2687 14.425 38.1188 15.0625 38.65V40.5625C15.0625 42.3687 16.4437 43.75 18.25 43.75H20.375C22.1812 43.75 23.5625 42.3687 23.5625 40.5625V39.5H28.875C28.875 38.7563 28.9812 38.0125 29.0875 37.375H22.925ZM21.4375 34.1875H18.25C17.6125 34.1875 17.1875 33.7625 17.1875 33.125C17.1875 32.4875 17.6125 32.0625 18.25 32.0625H21.4375C22.075 32.0625 22.5 32.4875 22.5 33.125C22.5 33.7625 22.075 34.1875 21.4375 34.1875ZM19.8438 26.75L21.3313 23.35C21.8625 22.1813 22.925 21.4375 24.2 21.4375H33.4437C34.7188 21.4375 35.8875 22.1813 36.4188 23.35L37.9062 26.75H19.8438Z" fill="#207320"/>
                    </G>
                    <Defs>
                      <ClipPath id="clip0_12151_464_3">
                        <Rect width="34" height="34" fill="white" transform="translate(14 14)"/>
                      </ClipPath>
                    </Defs>
                  </Svg>
                  <View style={styles.dashedBoxContent}>
                    <Text style={styles.dashedBoxTitleGreen}>Add Another Car (Optional)</Text>
                    <Text style={styles.dashedBoxSubtitle}>Compare more cars to get the best deal</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Suggested Cars Section Container Card */}
        <View style={styles.suggestedContainerCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suggested Cars</Text>
            <Text style={styles.sectionSubtitle}>Similar car in your budget & class</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestedScrollContent}
          >
            {suggestedCarsData.map((car) => {
              const isSelected = selectedCars.some((c) => c.id === car.id);
              return (
                <NotchedSuggestedCard
                  key={car.id}
                  car={car}
                  isSelected={isSelected}
                  onAdd={handleAddCar}
                />
              );
            })}
          </ScrollView>
        </View>

        {/* Grey Info Helper Card */}
        <View style={styles.infoHelperCard}>
          <Image
            source={require('../../../Group.png')}
            style={styles.infoHelperIcon}
            resizeMode="contain"
          />
          <Text style={styles.infoHelperText}>
            In Multi-Model mode, dealers bid on all your selected cars. You choose the best deal — whichever car, whichever dealer wins your auction.
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleContinue}
          style={styles.continueBtn}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
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
    fontSize: 18,
    color: '#0F172A',
  },
  placeholderBtn: {
    width: 44,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 16,
    height: 48,
    padding: 4,
  },
  toggleTab: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleTabActive: {
    backgroundColor: '#2563EB',
  },
  toggleText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#64748B',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  infoLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#64748B',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  section: {
    marginTop: 12,
    paddingHorizontal: 20,
  },
  dashedBoxGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#22C55E',
    borderRadius: 12,
    backgroundColor: '#F0F8F7',
    padding: 16,
  },
  greenCircleBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  dashedBoxContent: {
    flex: 1,
  },
  dashedBoxTitleGreen: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#207320',
  },
  dashedBoxSubtitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  selectionWrapper: {
    marginTop: 8,
  },
  selectionHeading: {
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
  },
  selectedCarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 14,
    padding: 12,
  },
  selectedCarImage: {
    width: scale(60),
    height: scale(44),
    borderRadius: scale(6),
    marginRight: scale(8),
  },
  selectedCarInfo: {
    flex: 1,
  },
  selectedCarName: {
    fontFamily: 'Outfit-Bold',
    fontSize: scale(13),
    color: '#0F172A',
  },
  selectedCarSpecs: {
    fontFamily: 'Outfit-Medium',
    fontSize: scale(11),
    color: '#64748B',
    marginTop: scale(2),
  },
  trashBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#2563EB',
    marginRight: 8,
  },
  sectionSubtitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 11,
    color: '#64748B',
  },
  suggestedGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suggestedCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEEF3',
    borderRadius: 16,
    overflow: 'hidden',
    paddingBottom: 12,
  },
  suggestedImage: {
    width: '100%',
    height: scale(70),
    backgroundColor: '#F1F5F9',
  },
  suggestedInfo: {
    padding: scale(7),
  },
  suggestedName: {
    fontFamily: 'Outfit-Bold',
    fontSize: scale(11),
    color: '#0F172A',
  },
  suggestedSpecs: {
    fontFamily: 'Outfit-Medium',
    fontSize: scale(9),
    color: '#64748B',
    marginTop: scale(2),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: scale(3),
  },
  suggestedPrice: {
    fontFamily: 'Outfit-Bold',
    fontSize: scale(11),
    color: '#2563EB',
    marginRight: scale(3),
  },
  exShLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: scale(7),
    color: '#94A3B8',
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  categoryBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: scale(4),
    paddingHorizontal: scale(5),
    paddingVertical: scale(2),
  },
  categoryText: {
    fontFamily: 'Outfit-Bold',
    fontSize: scale(8),
    color: '#2563EB',
  },
  addBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    height: 32,
    marginHorizontal: 10,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnDisabled: {
    backgroundColor: '#E2E8F0',
  },
  addBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: scale(10),
    color: '#FFFFFF',
  },
  infoHelperCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 20,
    marginTop: 20,
  },
  infoHelperIcon: {
    width: 14,
    height: 14,
    marginRight: 10,
    marginTop: 2,
  },
  infoHelperText: {
    flex: 1,
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
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
  continueBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  continueBtnText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  suggestedContainerCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderTopWidth: 4,
    borderTopColor: '#2563EB',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  suggestedCardContainer: {
    width: scale(190),
    height: scale(206),
    marginRight: scale(12),
    position: 'relative',
  },
  suggestedScrollContent: {
    paddingRight: 16,
  },
  specsRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: scale(2),
  },
  specsText: {
    fontFamily: 'Outfit-Medium',
    fontSize: scale(9),
    color: '#64748B',
  },
  colorBadge: {
    backgroundColor: '#E2E8F0',
    borderRadius: scale(10),
    paddingHorizontal: scale(5),
    paddingVertical: scale(1),
  },
  colorBadgeText: {
    fontFamily: 'Outfit-Bold',
    fontSize: scale(8),
    color: '#475569',
  },
  categoryBadgeContainer: {
    position: 'absolute',
    bottom: scale(8),
    left: scale(8),
  },
  notchedAddBtn: {
    position: 'absolute',
    bottom: scale(3),
    right: scale(3),
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(12),
  },
  selectionCardGreenContainer: {
    backgroundColor: '#F0F8F7',
    borderWidth: 1,
    borderColor: '#207320',
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    width: scale(315),
    alignSelf: 'center',
    marginTop: scale(12),
  },
  selectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: scale(8),
  },
  selectionTitleGreen: {
    fontFamily: 'Outfit-Bold',
    fontSize: scale(16),
    color: '#207320',
  },
  selectionSubTextGrey: {
    fontFamily: 'Outfit-Medium',
    fontSize: scale(11),
    color: '#64748B',
  },
  whiteCarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: scale(8),
    padding: scale(6),
  },
  imageBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: scale(6),
    overflow: 'hidden',
    height: scale(52),
    marginRight: scale(10),
  },
  verticalGreenStripe: {
    width: scale(4),
    height: '100%',
    backgroundColor: '#207320',
  },
  selectedCarDetailsText: {
    fontFamily: 'Outfit-Medium',
    fontSize: scale(11),
    color: '#64748B',
    marginTop: scale(2),
  },
  trashCircleBtn: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: '#F0F8F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
