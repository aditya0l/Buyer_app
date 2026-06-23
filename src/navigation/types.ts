export type AuthStackParamList = {
  Splash: undefined;
  OTP: undefined;
  OnboardingCity: undefined;
  OnboardingBrands: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  BrowseTab: undefined;
  ActionTab: undefined;
  RoomTab: undefined;
  ProfileTab: undefined;
};

export type MainStackParamList = {
  MainTabs: { screen?: keyof BottomTabParamList } | undefined;

  // Browse Screens
  Brand: { brandId: string; brandName: string };
  ModelDetail: { vehicleId: string };
  BodyType: { bodyType: string };
  FuelType: { fuelType: string };
  Favorites: undefined;
  SavedSearches: undefined;
  SearchCar: undefined;

  // Intent Flow
  SelectYourCars: undefined;
  CreateIntent: { vehicleId: string; variantId: string };
  CommitmentPay: { intentId: string; variantId: string; price: number };
  IntentSuccess: { roomId: string };

  // BidRoom Screens
  BidRoom: { roomId: string };
  BidRoomList: undefined;
  SelectWinner: { roomId: string; quoteId: string };
  ComparisonGroup: { childRoomIds: string[] };
  ComparisonDetail: { roomId: string };
  PriceLock: { orderId: string };

  // Deal Flow
  DealLockStep1: undefined;
  DealLockStep2: undefined;
  DealLockStep3: undefined;
  DealLockStep4: undefined;
  DealLockStep5: undefined;
  DealBooked: undefined;
  DealBookingConfirmed: undefined;
  DealPDIOption: undefined;
  DealPDIStatus: undefined;
  DealPDIReport: undefined;
  DealDeliveryDashboard: undefined;
  DealConfirmDelivery: undefined;
  DealClosed: undefined;

  // Loan
  CarLoanPreApproval: { returnTo?: string } | undefined;
  CarLoanForm: { returnTo?: string } | undefined;
  CarLoanPending: { returnTo?: string } | undefined;

  // Agreement
  DealAgreement: undefined;

  // Orders
  OrderList: undefined;
  OrderDetail: { orderId: string };
  DeliveryOTP: { orderId: string };

  // Documents
  DocumentsVault: undefined;
  DocumentList: undefined; // legacy alias → redirects to DocumentsVault
  DocumentFolder: { folderId: string; folderName: string };
  DocumentViewer: { fileId: string; name: string; url: string };

  // Wallet
  Wallet: undefined;
  BuyCredits: undefined;
  CreditDetails: undefined;

  // History
  PurchaseHistory: undefined;

  // Support
  Support: undefined;
  RaiseTicket: undefined;
  TicketDetail: { ticketId: string };
  Dispute: { orderId: string };

  // Notifications
  NotificationCenter: undefined;
  ActivityAudit: undefined;

  // Profile / Settings
  Profile: undefined;
  EditProfile: undefined;
  PrivacySettings: undefined;
  Security: undefined;
};

export type RootStackParamList = AuthStackParamList & MainStackParamList;

/** @deprecated use BottomTabParamList */
export type MainTabParamList = BottomTabParamList;
