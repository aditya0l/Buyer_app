export interface LedgerEntry {
  id: string;
  type: 'Commitment' | 'Refund' | 'Credit Purchase' | 'Penalty' | 'Promo';
  amount: number;
  description: string;
  date: string;
  linkedItem?: string; // Intent ID or Order ID
}

export interface PromoVoucher {
  id: string;
  code: string;
  type: string;
  title: string;
  expiryDate: string;
}

export interface Wallet {
  balance: number;
  totalBalance: number;
  dealCredits: number;
  ledger: LedgerEntry[];
  promos: PromoVoucher[];
}

export const mockWallet: Wallet = {
  balance: 0,
  totalBalance: 0,
  dealCredits: 2,
  promos: [
    {
      id: 'promo-1',
      code: 'FIRSTCAR',
      type: 'Cash Discount',
      title: '₹5,000 off on next purchase',
      expiryDate: '31 Aug 2026',
    },
  ],
  ledger: [
    {
      id: 'tx_001',
      type: 'Promo',
      amount: 499,
      description: 'Sign-up promotional cash credited to wallet',
      date: '10 Apr 2026',
    },
    {
      id: 'tx_002',
      type: 'Credit Purchase',
      amount: -499,
      description: 'Purchased 1 Deal Credit for Maruti Brezza Intent',
      date: '28 Apr 2026',
      linkedItem: 'room-brezza-001',
    },
    {
      id: 'tx_003',
      type: 'Refund',
      amount: 499,
      description: 'Refunded — min dealers not reached for Creta room',
      date: '02 May 2026',
      linkedItem: 'room-creta-002',
    },
    {
      id: 'tx_004',
      type: 'Commitment',
      amount: 5000,
      description: 'Commitment deposit locked for Maruti Brezza purchase',
      date: '28 Apr 2026',
      linkedItem: 'ord-brezza-001',
    },
    {
      id: 'tx_005',
      type: 'Refund',
      amount: 28000,
      description: 'CarBounty savings guarantee cash refund processed',
      date: '25 Mar 2026',
      linkedItem: 'ord-wagonr-002',
    },
  ],
};
