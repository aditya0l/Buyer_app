export interface DocumentFile {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadDate: string;
}

export interface DocumentFolder {
  id: string;
  name: string;
  icon: string;
  files: DocumentFile[];
}

export const mockDocuments: DocumentFolder[] = [
  {
    id: 'kyc',
    name: 'KYC Documents',
    icon: 'id-card',
    files: [
      { id: 'f_kyc_01', name: 'Aadhaar_Card.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '1.2 MB', uploadDate: '12 Apr 2026' },
      { id: 'f_kyc_02', name: 'PAN_Card.png', url: 'https://via.placeholder.com/600x400.png?text=PAN+Card', size: '420 KB', uploadDate: '12 Apr 2026' },
    ],
  },
  {
    id: 'booking',
    name: 'Booking Receipts',
    icon: 'file-text',
    files: [
      { id: 'f_bk_01', name: 'Booking_Receipt_Brezza.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '890 KB', uploadDate: '28 Apr 2026' },
    ],
  },
  {
    id: 'invoice',
    name: 'Invoices & Receipts',
    icon: 'invoice',
    files: [
      { id: 'f_inv_01', name: 'Tax_Invoice_Maurya_Motors.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '2.4 MB', uploadDate: '14 May 2026' },
    ],
  },
  {
    id: 'insurance',
    name: 'Insurance Policies',
    icon: 'shield',
    files: [
      { id: 'f_ins_01', name: 'HDFC_Ergo_Car_Insurance.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '1.8 MB', uploadDate: '15 May 2026' },
    ],
  },
  {
    id: 'delivery',
    name: 'Delivery Proofs',
    icon: 'truck',
    files: [],
  },
];
