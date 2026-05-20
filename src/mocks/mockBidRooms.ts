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
  status: 'LIVE' | 'WAITING' | 'CLOSED';
  dealersCount: number;
  bestBid: number;
  savings: number;
  timeRemainingSeconds: number; // for timer
  progressBarWidth: number; // e.g. 62%
  quotes: Quote[];
  image: string;
}

export const mockBidRooms: BidRoom[] = [
  {
    id: 'room-brezza-001',
    vehicleId: 'brezza',
    variantId: 'brezza-zxi-plus',
    carName: 'Maruti Brezza',
    variantName: 'ZXi+ AT',
    fuel: 'Petrol',
    transmission: 'Automatic',
    color: 'Red',
    budget: 1350000,
    city: 'Delhi NCR',
    status: 'LIVE',
    dealersCount: 7,
    bestBid: 1318000,
    savings: 42000,
    timeRemainingSeconds: 1104, // 18m 24s
    progressBarWidth: 62,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
    quotes: [
      {
        id: 'q-maurya',
        dealerName: 'Maurya Motors',
        dealerCity: 'Delhi',
        rating: 4.8,
        basePrice: 1150000,
        rto: 95000,
        insurance: 60000,
        tcs: 13000,
        onRoadTotal: 1318000,
        deliveryTimeDays: 7,
        perks: ['5-yr extended warranty', 'Free accessories kit', '3 free services'],
        reasonTags: ['Best Price', 'Best Perks'],
        isPinned: false,
      },
      {
        id: 'q-competitor1',
        dealerName: 'Rohan Motors',
        dealerCity: 'Noida',
        rating: 4.5,
        basePrice: 1160000,
        rto: 95000,
        insurance: 61000,
        tcs: 13100,
        onRoadTotal: 1329100,
        deliveryTimeDays: 3,
        perks: ['Free mats & seat covers', '1 year free RSA'],
        reasonTags: ['Fastest'],
        isPinned: false,
      },
      {
        id: 'q-competitor2',
        dealerName: 'Competitor Suzuki',
        dealerCity: 'Gurugram',
        rating: 4.2,
        basePrice: 1165000,
        rto: 95000,
        insurance: 59000,
        tcs: 13150,
        onRoadTotal: 1332150,
        deliveryTimeDays: 14,
        perks: ['Chrome styling kit', 'Free basic mats'],
        reasonTags: [],
        isPinned: false,
      },
    ],
  },
  {
    id: 'room-creta-002',
    vehicleId: 'creta',
    variantId: 'creta-sx',
    carName: 'Hyundai Creta',
    variantName: 'SX MT',
    fuel: 'Petrol',
    transmission: 'Manual',
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
];
