export interface DocumentFile {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadedAt: string; // ISO-like date string
}

export interface DocumentFolder {
  id: string;
  name: string;
  icon: string;
  files: DocumentFile[];
}

interface MockDocumentStore {
  folders: DocumentFolder[];
}

export const mockDocuments: MockDocumentStore = {
  folders: [
    {
      id: 'kyc',
      name: 'KYC Documents',
      icon: 'id-card',
      files: [
        {
          id: 'f_kyc_01',
          name: 'Aadhaar_Card.pdf',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          size: '1.2 MB',
          uploadedAt: '2026-04-12',
        },
        {
          id: 'f_kyc_02',
          name: 'PAN_Card.png',
          url: 'https://via.placeholder.com/600x400.png?text=PAN+Card',
          size: '420 KB',
          uploadedAt: '2026-04-12',
        },
      ],
    },
    {
      id: 'booking',
      name: 'Booking Receipts',
      icon: 'file-text',
      files: [
        {
          id: 'f_bk_01',
          name: 'Booking_Receipt_Brezza.pdf',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          size: '890 KB',
          uploadedAt: '2026-04-28',
        },
      ],
    },
    {
      id: 'invoice',
      name: 'Invoices & Receipts',
      icon: 'invoice',
      files: [
        {
          id: 'f_inv_01',
          name: 'Tax_Invoice_Maurya_Motors.pdf',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          size: '2.4 MB',
          uploadedAt: '2026-05-14',
        },
      ],
    },
    {
      id: 'insurance',
      name: 'Insurance Policies',
      icon: 'shield',
      files: [
        {
          id: 'f_ins_01',
          name: 'HDFC_Ergo_Car_Insurance.pdf',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          size: '1.8 MB',
          uploadedAt: '2026-05-15',
        },
      ],
    },
    {
      id: 'delivery',
      name: 'Delivery Proofs',
      icon: 'truck',
      files: [],
    },
  ],
};
