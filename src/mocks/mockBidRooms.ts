export interface Quote {
  id: string;
  dealerName: string;
  dealerCity: string;
  rating: number; // out of 5
  basePrice: number;
  rto: number;
  insurance: number;
  tcs: number;
  onRoadTotal: number;
  deliveryTimeDays: number;
  perks: string[];
  reasonTags: ('Best Price' | 'Fastest' | 'Best Perks')[];
  isPinned?: boolean;
}

export interface BidRoom {
  id: string;
  vehicleId: string;
  variantId: string;
  carName: string;
  variantName: string;
  fuel: string;
  transmission: string;
  color: string;
  budget: number;
  city: string;
  status: 'LIVE' | 'WAITING' | 'CLOSED' | 'INSTANT' | 'WON';
  dealersCount: number;
  bestBid: number;
  savings: number;
  timeRemainingSeconds: number; // for timer
  progressBarWidth: number; // e.g. 62%
  quotes: Quote[];
  image: string;
  // Extra fields for INSTANT / WON states
  closedDate?: string;
  paidAmount?: number;
  finalPrice?: number;
  dealerRating?: number;
  orderId?: string;
  dealerName?: string;
}

export const mockBidRooms: BidRoom[] = [
  {
    id: 'room-brezza-live',
    vehicleId: 'brezza',
    variantId: 'brezza-zxi-plus',
    carName: 'Maruti Brezza ZXI+',
    variantName: 'ZXi+ AT',
    fuel: 'Petrol',
    transmission: 'AT',
    color: 'Red',
    budget: 1400000,
    city: 'Delhi NCR',
    status: 'LIVE',
    dealersCount: 7,
    bestBid: 1310000,
    savings: 42000,
    timeRemainingSeconds: 1104, // 18m 24s
    progressBarWidth: 62,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
    quotes: [],
  },
  {
    id: 'room-creta-waiting',
    vehicleId: 'creta',
    variantId: 'creta-sx',
    carName: 'Hyundai Creta SX',
    variantName: 'SX MT',
    fuel: 'Diesel',
    transmission: 'MT',
    color: 'White',
    budget: 1700000,
    city: 'Delhi NCR',
    status: 'WAITING',
    dealersCount: 0,
    bestBid: 0,
    savings: 0,
    timeRemainingSeconds: 134, // starts in 2m 14s
    progressBarWidth: 0,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400',
    quotes: [],
  },
  {
    id: 'room-seltos-closed',
    vehicleId: 'seltos',
    variantId: 'seltos-htx-plus',
    carName: 'Kia Seltos HTX+',
    variantName: 'HTX+ AT',
    fuel: 'Petrol',
    transmission: 'AT',
    color: 'Black',
    budget: 1600000,
    city: 'Delhi NCR',
    status: 'CLOSED',
    dealersCount: 5,
    bestBid: 1540000,
    savings: 29000,
    timeRemainingSeconds: 0,
    progressBarWidth: 100,
    image: 'https://images.unsplash.com/photo-1590362891991-f7004f113795?w=400',
    quotes: [],
    closedDate: 'Apr 28, 2026'
  },
  {
    id: 'room-brezza-instant',
    vehicleId: 'brezza',
    variantId: 'brezza-zxi-plus',
    carName: 'Maruti Brezza ZXI+',
    variantName: 'ZXi+ AT',
    fuel: 'Petrol',
    transmission: 'AT',
    color: 'Red',
    budget: 1400000,
    city: 'Delhi NCR',
    status: 'INSTANT',
    dealersCount: 1,
    bestBid: 1318000,
    savings: 42000,
    timeRemainingSeconds: 0,
    progressBarWidth: 100,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
    quotes: [],
    paidAmount: 10000,
    dealerRating: 4.6,
    orderId: '#CB-2026-04872',
    dealerName: 'Maurya Motors'
  },
  {
    id: 'room-wagonr-won',
    vehicleId: 'wagonr',
    variantId: 'wagonr-vxi-cng',
    carName: 'Maruti Wagon R VXi CNG',
    variantName: 'VXi CNG',
    fuel: 'CNG',
    transmission: 'MT',
    color: 'White',
    budget: 650000,
    city: 'Delhi NCR',
    status: 'WON',
    dealersCount: 4,
    bestBid: 611000,
    savings: 28000,
    finalPrice: 610000,
    timeRemainingSeconds: 0,
    progressBarWidth: 100,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?w=400',
    quotes: [],
    dealerRating: 4.6,
    dealerName: 'Maurya Motors'
  },
  {
    id: 'room-city-won',
    vehicleId: 'city',
    variantId: 'city-zx-cvt',
    carName: 'Honda City ZX CVT',
    variantName: 'ZX CVT',
    fuel: 'CNG',
    transmission: 'MT',
    color: 'Silver',
    budget: 1480000,
    city: 'Delhi NCR',
    status: 'WON',
    dealersCount: 6,
    bestBid: 1420000,
    savings: 38000,
    finalPrice: 1420000,
    timeRemainingSeconds: 0,
    progressBarWidth: 100,
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400',
    quotes: [],
    dealerRating: 4.8,
    dealerName: 'Maurya Motors',
    closedDate: 'Nov 5, 2024'
  }
];
