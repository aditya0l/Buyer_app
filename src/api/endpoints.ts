export const endpoints = {
  auth: {
    sendOTP: '/auth/send-otp',
    verifyOTP: '/auth/verify-otp',
    profile: '/auth/profile',
  },
  home: {
    summary: '/home/summary',
  },
  browse: {
    brands: '/browse/brands',
    models: (brandId: string) => `/browse/brands/${brandId}/models`,
    modelDetails: (modelId: string) => `/browse/models/${modelId}`,
  },
  intents: {
    create: '/intents',
    pay: (intentId: string) => `/intents/${intentId}/payment`,
    details: (intentId: string) => `/intents/${intentId}`,
  },
  bidRooms: {
    list: '/bidrooms',
    details: (roomId: string) => `/bidrooms/${roomId}`,
    quotes: (roomId: string) => `/bidrooms/${roomId}/quotes`,
    selectWinner: (roomId: string) => `/bidrooms/${roomId}/select-winner`,
    comparison: '/bidrooms/compare',
  },
  orders: {
    list: '/orders',
    details: (orderId: string) => `/orders/${orderId}`,
    uploadDoc: (orderId: string) => `/orders/${orderId}/documents`,
    verifyDelivery: (orderId: string) => `/orders/${orderId}/verify-delivery`,
  },
  wallet: {
    summary: '/wallet',
    buyCredits: '/wallet/buy-credits',
    ledger: '/wallet/ledger',
  },
  documents: {
    list: '/documents',
    details: (docId: string) => `/documents/${docId}`,
  },
  notifications: {
    list: '/notifications',
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
  },
  support: {
    tickets: '/support/tickets',
    ticketDetails: (id: string) => `/support/tickets/${id}`,
    raise: '/support/tickets',
    dispute: '/support/disputes',
  },
};
