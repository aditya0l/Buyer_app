export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'COMPLETED' | 'ACTIVE' | 'PENDING';
  date?: string;
}

export interface Order {
  id: string;
  carName: string;
  variantName: string;
  image: string;
  dealerName: string;
  dealerCity: string;
  purchaseDate: string;
  onRoadPrice: number;
  exShowroomPrice: number;
  savings: number;
  status: 'DELIVERED' | 'IN_PROGRESS' | 'CANCELLED';
  vinNumber?: string;
  vinStatusTag?: 'In-Stock' | 'Upcoming ETA' | 'Advance Order';
  etaDate?: string;
  perks: string[];
  milestones: Milestone[];
}

export const mockOrders: Order[] = [
  {
    id: 'ord-brezza-001',
    carName: 'Maruti Brezza',
    variantName: 'ZXi+ AT',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
    dealerName: 'Maurya Motors',
    dealerCity: 'Delhi',
    purchaseDate: '28 Apr 2026',
    onRoadPrice: 1318000,
    exShowroomPrice: 1276900,
    savings: 42000,
    status: 'IN_PROGRESS',
    vinNumber: 'MA3FNE81JS012984',
    vinStatusTag: 'In-Stock',
    perks: ['5-yr extended warranty', 'Free accessories kit', '3 free services'],
    milestones: [
      { id: 'm1', title: 'Order Confirmed', description: 'Your order was accepted by Maurya Motors.', status: 'COMPLETED', date: '28 Apr 2026' },
      { id: 'm2', title: 'VIN Assigned', description: 'Chassis/VIN MA3FNE81JS012984 locked.', status: 'COMPLETED', date: '01 May 2026' },
      { id: 'm3', title: 'PDI Scheduled', description: 'Pre-Delivery Inspection scheduled for vehicle.', status: 'COMPLETED', date: '05 May 2026' },
      { id: 'm4', title: 'PDI Completed', description: 'Inspection completed. Status: Passed.', status: 'COMPLETED', date: '08 May 2026' },
      { id: 'm5', title: 'Dispatch Ready', description: 'Car is loaded and ready at showroom.', status: 'ACTIVE', date: '12 May 2026' },
      { id: 'm6', title: 'Delivery Scheduled', description: 'Delivery setup for 22 May 2026.', status: 'PENDING' },
      { id: 'm7', title: 'Delivered', description: 'Verify delivery OTP to close order.', status: 'PENDING' },
    ],
  },
  {
    id: 'ord-wagonr-002',
    carName: 'Maruti Wagon R',
    variantName: 'VXi CNG',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400',
    dealerName: 'Maurya Motors',
    dealerCity: 'Delhi',
    purchaseDate: '14 Mar 2026',
    onRoadPrice: 610000,
    exShowroomPrice: 582000,
    savings: 28000,
    status: 'DELIVERED',
    perks: ['Free mats & seat covers', '1-year free service'],
    milestones: [
      { id: 'm1', title: 'Order Confirmed', description: 'Accepted by Maurya Motors.', status: 'COMPLETED', date: '14 Mar 2026' },
      { id: 'm2', title: 'VIN Assigned', description: 'Chassis VIN locked.', status: 'COMPLETED', date: '16 Mar 2026' },
      { id: 'm3', title: 'PDI Completed', description: 'Inspection passed.', status: 'COMPLETED', date: '20 Mar 2026' },
      { id: 'm4', title: 'Delivered', description: 'Delivery complete and OTP confirmed.', status: 'COMPLETED', date: '25 Mar 2026' },
    ],
  },
];
