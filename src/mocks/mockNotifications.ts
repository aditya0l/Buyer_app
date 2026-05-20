export interface AppNotification {
  id: string;
  type: 'ROOM_LIVE' | 'NEW_QUOTE' | 'WINNER_SELECTED' | 'LOCK_CONFIRMED' | 'VIN_ASSIGNED' | 'PDI_SCHEDULED' | 'DELIVERY_UPDATE' | 'REFUND_PROCESSED';
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  linkedId?: string; // Intent/Order/Wallet ID
}

export const mockNotifications: AppNotification[] = [
  {
    id: 'n_001',
    type: 'ROOM_LIVE',
    title: 'Bid Room is Live! ⚡',
    description: 'Your request for Maruti Brezza is live. Dealers are bidding.',
    date: '28 Apr 2026, 10:00 AM',
    isRead: true,
    linkedId: 'room-brezza-001',
  },
  {
    id: 'n_002',
    type: 'NEW_QUOTE',
    title: 'New Best Quote in Room! 💰',
    description: 'Maurya Motors bid a new low of ₹13.18L on Maruti Brezza.',
    date: '28 Apr 2026, 10:15 AM',
    isRead: false,
    linkedId: 'room-brezza-001',
  },
  {
    id: 'n_003',
    type: 'WINNER_SELECTED',
    title: 'Winner Selected 🎉',
    description: 'You selected Maurya Motors for Maruti Brezza.',
    date: '28 Apr 2026, 10:30 AM',
    isRead: true,
    linkedId: 'ord-brezza-001',
  },
  {
    id: 'n_004',
    type: 'LOCK_CONFIRMED',
    title: 'Price Lock Confirmed 🔒',
    description: 'Maurya Motors locked in the quoted price of ₹13.18L.',
    date: '29 Apr 2026, 11:00 AM',
    isRead: true,
    linkedId: 'ord-brezza-001',
  },
  {
    id: 'n_005',
    type: 'VIN_ASSIGNED',
    title: 'Chassis VIN Assigned 🚙',
    description: 'VIN MA3FNE81JS012984 is assigned to your Maruti Brezza.',
    date: '01 May 2026, 04:30 PM',
    isRead: false,
    linkedId: 'ord-brezza-001',
  },
  {
    id: 'n_006',
    type: 'PDI_SCHEDULED',
    title: 'Pre-Delivery Inspection Scheduled ⏱',
    description: 'Your PDI has been set up at Maurya Motors Okhla workshop.',
    date: '05 May 2026, 02:00 PM',
    isRead: true,
    linkedId: 'ord-brezza-001',
  },
  {
    id: 'n_007',
    type: 'DELIVERY_UPDATE',
    title: 'Delivery Ready 🚚',
    description: 'Your Maruti Brezza is dispatch ready. Schedule your delivery.',
    date: '12 May 2026, 10:00 AM',
    isRead: false,
    linkedId: 'ord-brezza-001',
  },
  {
    id: 'n_008',
    type: 'REFUND_PROCESSED',
    title: 'Deposit Refunded 💰',
    description: 'Creta bid room failed to gather minimum dealers. ₹499 refunded.',
    date: '02 May 2026, 11:30 AM',
    isRead: true,
    linkedId: 'room-creta-002',
  },
];
