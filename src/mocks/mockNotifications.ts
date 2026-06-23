export interface AppNotification {
  id: string;
  type: 'ROOM_CLOSES' | 'NEW_BID' | 'DEALERS_JOINED' | 'ROOM_LIVE' | 'FINANCE' | 'REFUND' | 'ROOM_EXPIRING' | 'SAVINGS';
  title: string;
  description: string;
  timeLabel: string;
  isRead: boolean;
  groupName: 'Today' | 'Yesterday' | '2 Days ago';
  hasProgressBar?: boolean;
  progressText?: string;
}

export const mockNotifications: AppNotification[] = [
  {
    id: 'n_001',
    type: 'ROOM_CLOSES',
    title: 'Your Brezza room closes in 2 hours',
    description: '4 dealers competing • Best bid ₹13,18,000 • Extend or accept now',
    timeLabel: 'Just now',
    isRead: true,
    groupName: 'Today',
    hasProgressBar: true,
    progressText: 'Just now • Room closes at 7:04 PM',
  },
  {
    id: 'n_002',
    type: 'NEW_BID',
    title: 'New #1 Bid – Brezza ZXi+',
    description: 'Maurya Motors placed ₹13,18,000 — now the best bid!',
    timeLabel: '2 min ago',
    isRead: false,
    groupName: 'Today',
  },
  {
    id: 'n_003',
    type: 'DEALERS_JOINED',
    title: '7 dealers now in your room',
    description: 'Maruti Brezza ZXi+ • Competition heating up',
    timeLabel: '8 min ago',
    isRead: false,
    groupName: 'Today',
  },
  {
    id: 'n_004',
    type: 'ROOM_LIVE',
    title: 'Your Bid Room is LIVE',
    description: 'Hyundai Creta SX room has started accepting bids',
    timeLabel: '1 hr ago',
    isRead: false,
    groupName: 'Today',
  },
  {
    id: 'n_005',
    type: 'FINANCE',
    title: 'Finance Pre-Approval Ready',
    description: 'SBI approved ₹10.68L @ 8.85% • EMI ₹22,100/mo',
    timeLabel: '3 hrs ago',
    isRead: true,
    groupName: 'Today',
  },
  {
    id: 'n_006',
    type: 'REFUND',
    title: 'Token Refunded ₹499',
    description: 'Honda City deal closed • Refund credited to Paytm',
    timeLabel: 'Yesterday',
    isRead: false,
    groupName: 'Yesterday',
  },
  {
    id: 'n_007',
    type: 'ROOM_EXPIRING',
    title: 'Room expiring soon',
    description: 'Kia Seltos room closes in 30 minutes — accept or extend?',
    timeLabel: 'Yesterday',
    isRead: true,
    groupName: 'Yesterday',
  },
  {
    id: 'n_008',
    type: 'SAVINGS',
    title: '₹42,000 saved on Brezza!',
    description: 'Your saved amount is higher than 89% of Delhi NCR buyers',
    timeLabel: '2 day ago',
    isRead: true,
    groupName: '2 Days ago',
  },
];
