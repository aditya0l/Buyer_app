export type AuthStackParamList = {
  Splash: undefined;
  OTP: undefined;
  OnboardingCity: undefined;
  OnboardingBrands: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  BrowseTab: undefined;
  CreateIntentTab: undefined; // elevated center FAB
  RoomTab: undefined;
  ProfileTab: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  
  // Browse Screens
  Brand: { brandId: string; brandName: string };
  ModelDetail: { vehicleId: string };
  
  // Intent Flow (nested or push)
  CreateIntent: { vehicleId: string; variantId: string };
  CommitmentPay: { intentId: string; variantId: string; price: number };
  IntentSuccess: { roomId: string };
  
  // BidRoom Screens
  BidRoom: { roomId: string };
  SelectWinner: { roomId: string; quoteId: string };
  ComparisonGroup: { childRoomIds: string[] };
  PriceLock: { orderId: string };
  
  // Orders
  OrderDetail: { orderId: string };
  DeliveryOTP: { orderId: string };
  
  // Documents
  DocumentsVault: undefined;
  DocumentFolder: { folderId: string; folderName: string };
  DocumentViewer: { fileId: string; name: string; url: string };
  
  // Wallet
  Wallet: undefined;
  BuyCredits: undefined;
  
  // History
  PurchaseHistory: undefined;
  
  // Support
  Support: undefined;
  RaiseTicket: undefined;
  TicketDetail: { ticketId: string };
  
  // Notifications
  NotificationCenter: undefined;
  
  // Profile / Settings
  EditProfile: undefined;
  PrivacySettings: undefined;
  Security: undefined;
};

export type RootStackParamList = AuthStackParamList & MainStackParamList;
