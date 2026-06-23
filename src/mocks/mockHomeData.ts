export interface LiveBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  bgGradient: string[];
  illustrationUrl: string;
  badge?: string;
  quotes?: { label: string; price: string; rating: string }[];
}

export interface BrandCategory {
  id: string;
  name: string;
  image: string;
  offerTag?: string;
}

export interface CircularBrand {
  id: string;
  name: string;
  logo: any;
  emoji: string;
}

export interface FuelTypeCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface CertifiedCarDeal {
  id: string;
  brand: string;
  model: string;
  price: string;
  savings: string;
  imageUrl: string;
  badgeText: string;
  rating: number;
}

export interface RecentPurchase {
  id: string;
  modelName: string;
  dealerName: string;
  city: string;
  date: string;
  onRoadPrice: string;
  exShowroom: string;
  savings: string;
  perks: string;
  imageUrl: string;
}

export const mockLiveBanners: LiveBanner[] = [
  {
    id: 'banner-1',
    title: 'Get Dealers To\nCompete For You',
    subtitle: 'Get real-time offers from verified dealers near you',
    ctaText: 'Post A Car Requirement',
    bgGradient: ['#E0EAFF', '#C7D9FD'],
    illustrationUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400',
    badge: 'LIVE',
    quotes: [
      { label: 'Dealer Offer', price: '₹12.80L', rating: 'Good Offer' },
      { label: 'Best Offer', price: '₹12.35L', rating: 'Best Offer' },
      { label: 'Dealer Offer', price: '₹13.35L', rating: 'Good Offer' },
    ],
  },
  {
    id: 'banner-2',
    title: 'Compare Models',
    subtitle: 'Pick any 2 cars Side-by-side specs, price & CarBounty savings',
    ctaText: 'Compare Models',
    bgGradient: ['#2563EB', '#1E40AF'],
    illustrationUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
  },
];

export const mockFuelTypes: FuelTypeCategory[] = [
  { id: 'petrol', name: 'Petrol', emoji: '⛽', color: '#16A34A' },
  { id: 'electric', name: 'Electric', emoji: '🔌', color: '#EAB308' },
  { id: 'diesel', name: 'Diesel', emoji: '⛽', color: '#2563EB' },
  { id: 'hybrid', name: 'Hybrid', emoji: '🌱', color: '#10B981' },
];

export const mockBrandCategories: BrandCategory[] = [
  {
    id: 'category-hatch',
    name: 'Hatchback',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=300',
  },
  {
    id: 'category-mpv',
    name: 'MPV',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=300',
  },
  {
    id: 'category-suv',
    name: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300',
  },
  {
    id: 'category-pickup',
    name: 'Pickup',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300',
  },
];

export const mockCircularBrands: CircularBrand[] = [
  { id: 'bmw', name: 'BMW', logo: require('../assets/images/logos/bmw_logo_1782251709484.png'), emoji: '🇩🇪' },
  { id: 'tesla', name: 'Tesla', logo: require('../assets/images/logos/tesla_logo_1782251718172.png'), emoji: '🇺🇸' },
  { id: 'mercedes', name: 'Mercedes', logo: require('../assets/images/logos/mercedes_logo_1782251729411.png'), emoji: '🇩🇪' },
  { id: 'honda', name: 'Honda', logo: require('../assets/images/logos/honda_logo_1782251739926.png'), emoji: '🇯🇵' },
  { id: 'tata', name: 'Tata', logo: require('../assets/images/logos/tata_logo_1782251748649.png'), emoji: '🇮🇳' },
];

export const mockCertifiedCarDeals: CertifiedCarDeal[] = [
  {
    id: 'deal-1',
    brand: 'Maruti Suzuki',
    model: 'Brezza ZXi+ Automatic',
    price: '₹13.18 Lakh',
    savings: 'Save ₹42,000 extra',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
    badgeText: 'Top Certified',
    rating: 4.8,
  },
  {
    id: 'deal-2',
    brand: 'Hyundai',
    model: 'Creta SX Petrol MT',
    price: '₹14.80 Lakh',
    savings: 'Save ₹58,000 extra',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400',
    badgeText: 'Highly Rated',
    rating: 4.6,
  },
];

export const mockRecentPurchases: RecentPurchase[] = [
  {
    id: 'purchase-1',
    modelName: 'Maruti Wagon R VXi CNG',
    dealerName: 'Maurya Motors',
    city: 'Delhi',
    date: 'March 14, 2026',
    onRoadPrice: '₹6,10,000',
    exShowroom: '₹5,82,000',
    savings: '₹28,000',
    perks: 'Free mats & seat covers  •  1-year free service',
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400',
  },
  {
    id: 'purchase-2',
    modelName: 'Maruti Brezza ZXi+ AT',
    dealerName: 'Maurya Motors',
    city: 'Delhi',
    date: 'April 28, 2026',
    onRoadPrice: '₹13,18,000',
    exShowroom: '₹12,76,000',
    savings: '₹42,000',
    perks: 'Free basic mats  •  1-year free RSA',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
  },
];

export interface MyPurchase {
  id: string;
  modelName: string;
  dealerName: string;
  date: string;
  savings: string;
  priceOnRoad: string;
  imageUrl: string;
}

export const mockMyPurchases: MyPurchase[] = [
  {
    id: 'mypurchase-1',
    modelName: 'Maruti Wagon R VXi CNG',
    dealerName: 'Maurya Motors',
    date: 'March 14, 2025',
    savings: 'Saved ₹28,000',
    priceOnRoad: '₹6.1L on-road',
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400',
  },
  {
    id: 'mypurchase-2',
    modelName: 'Honda City ZX CVT',
    dealerName: 'Shakti Honda Rohini',
    date: 'Nov 5, 2024',
    savings: 'Saved ₹35,000',
    priceOnRoad: '₹14.2L/ on-road',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400',
  },
];

