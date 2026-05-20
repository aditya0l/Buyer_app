export interface Variant {
  id: string;
  name: string;
  price: number;
  engine: string;
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
  transmission: 'Manual' | 'Automatic';
  mileage: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  emoji: string;
  bodyType: 'SUV' | 'Sedan' | 'Hatchback' | 'MPV' | 'EV';
  priceRange: string;
  image: string;
  fuelTypes: ('Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG')[];
  bidsCount: number;
  variants: Variant[];
}

export const mockVehicles: Vehicle[] = [
  {
    id: 'brezza',
    brand: 'Maruti Suzuki',
    model: 'Brezza',
    emoji: '🚙',
    bodyType: 'SUV',
    priceRange: '₹8.34L – ₹14.14L',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
    fuelTypes: ['Petrol', 'CNG'],
    bidsCount: 84,
    variants: [
      { id: 'brezza-lxi', name: 'LXi', price: 834000, engine: '1462 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '20.15 kmpl' },
      { id: 'brezza-vxi', name: 'VXi', price: 970000, engine: '1462 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '20.15 kmpl' },
      { id: 'brezza-zxi', name: 'ZXi', price: 1114000, engine: '1462 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '19.89 kmpl' },
      { id: 'brezza-zxi-plus', name: 'ZXi+ AT', price: 1318000, engine: '1462 cc', fuel: 'Petrol', transmission: 'Automatic', mileage: '19.80 kmpl' },
      { id: 'brezza-zxi-cng', name: 'ZXi CNG', price: 1210000, engine: '1462 cc', fuel: 'CNG', transmission: 'Manual', mileage: '25.51 km/kg' },
    ],
  },
  {
    id: 'creta',
    brand: 'Hyundai',
    model: 'Creta',
    emoji: '🚗',
    bodyType: 'SUV',
    priceRange: '₹11.00L – ₹20.15L',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400',
    fuelTypes: ['Petrol', 'Diesel'],
    bidsCount: 71,
    variants: [
      { id: 'creta-ex', name: 'EX', price: 1100000, engine: '1497 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '17.4 kmpl' },
      { id: 'creta-s', name: 'S', price: 1250000, engine: '1497 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '17.4 kmpl' },
      { id: 'creta-sx', name: 'SX', price: 1480000, engine: '1497 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '17.4 kmpl' },
      { id: 'creta-sx-o-diesel', name: 'SX (O) Diesel AT', price: 1900000, engine: '1493 cc', fuel: 'Diesel', transmission: 'Automatic', mileage: '19.1 kmpl' },
    ],
  },
  {
    id: 'nexon',
    brand: 'Tata Motors',
    model: 'Nexon',
    emoji: '🚙',
    bodyType: 'SUV',
    priceRange: '₹7.99L – ₹15.80L',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400',
    fuelTypes: ['Petrol', 'Diesel', 'Electric'],
    bidsCount: 62,
    variants: [
      { id: 'nexon-smart', name: 'Smart Petrol', price: 799000, engine: '1199 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '17.44 kmpl' },
      { id: 'nexon-creative', name: 'Creative Diesel AMT', price: 1170000, engine: '1497 cc', fuel: 'Diesel', transmission: 'Automatic', mileage: '23.23 kmpl' },
      { id: 'nexon-ev-fearless', name: 'EV Fearless LR', price: 1820000, engine: 'Electric Motor', fuel: 'Electric', transmission: 'Automatic', mileage: '465 km' },
    ],
  },
  {
    id: 'city',
    brand: 'Honda',
    model: 'City',
    emoji: '🚗',
    bodyType: 'Sedan',
    priceRange: '₹11.82L – ₹16.30L',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
    fuelTypes: ['Petrol', 'Hybrid'],
    bidsCount: 38,
    variants: [
      { id: 'city-v', name: 'V MT', price: 1182000, engine: '1498 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '17.8 kmpl' },
      { id: 'city-vx', name: 'VX CVT', price: 1450000, engine: '1498 cc', fuel: 'Petrol', transmission: 'Automatic', mileage: '18.4 kmpl' },
      { id: 'city-ehev', name: 'ZX e:HEV Hybrid', price: 1889000, engine: '1498 cc', fuel: 'Hybrid', transmission: 'Automatic', mileage: '27.1 kmpl' },
    ],
  },
  {
    id: 'wagonr',
    brand: 'Maruti Suzuki',
    model: 'Wagon R',
    emoji: '🚘',
    bodyType: 'Hatchback',
    priceRange: '₹5.54L – ₹7.44L',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400',
    fuelTypes: ['Petrol', 'CNG'],
    bidsCount: 14,
    variants: [
      { id: 'wagonr-lxi', name: 'LXi 1.0L', price: 554000, engine: '998 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '24.35 kmpl' },
      { id: 'wagonr-vxi-cng', name: 'VXi 1.0L CNG', price: 689000, engine: '998 cc', fuel: 'CNG', transmission: 'Manual', mileage: '34.05 km/kg' },
      { id: 'wagonr-zxi-plus', name: 'ZXi+ 1.2L AMT', price: 744000, engine: '1197 cc', fuel: 'Petrol', transmission: 'Automatic', mileage: '24.43 kmpl' },
    ],
  },
  {
    id: 'seltos',
    brand: 'Kia',
    model: 'Seltos',
    emoji: '🚗',
    bodyType: 'SUV',
    priceRange: '₹10.90L – ₹20.30L',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=400',
    fuelTypes: ['Petrol', 'Diesel'],
    bidsCount: 49,
    variants: [
      { id: 'seltos-hte', name: 'HTE Petrol', price: 1090000, engine: '1497 cc', fuel: 'Petrol', transmission: 'Manual', mileage: '17.0 kmpl' },
      { id: 'seltos-htx-plus', name: 'HTX+ Turbo DCT', price: 1830000, engine: '1482 cc', fuel: 'Petrol', transmission: 'Automatic', mileage: '17.9 kmpl' },
    ],
  },
];
