import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';
import { BottomTabNavigator } from './BottomTabNavigator';

// Browse
import { BrandScreen } from '../screens/browse/BrandScreen';
import { ModelDetailScreen } from '../screens/browse/ModelDetailScreen';
import { SearchCarScreen } from '../screens/browse/SearchCarScreen';

// Intent flow
import { CreateIntentScreen } from '../screens/intent/CreateIntentScreen';
import { SelectYourCarsScreen } from '../screens/intent/SelectYourCarsScreen';
import { CommitmentPayScreen } from '../screens/intent/CommitmentPayScreen';
import { IntentSuccessScreen } from '../screens/intent/IntentSuccessScreen';

// BidRoom
import { BidRoomScreen } from '../screens/bidroom/BidRoomScreen';
import { BidRoomListScreen } from '../screens/bidroom/BidRoomListScreen';
import { SelectWinnerScreen } from '../screens/bidroom/SelectWinnerScreen';
import { ComparisonGroupScreen } from '../screens/bidroom/ComparisonGroupScreen';

// Deal Flow
import { DealLockStep1Screen } from '../screens/dealflow/DealLockStep1Screen';
import { DealLockStep2Screen } from '../screens/dealflow/DealLockStep2Screen';
import { DealLockStep3Screen } from '../screens/dealflow/DealLockStep3Screen';
import { DealLockStep4Screen } from '../screens/dealflow/DealLockStep4Screen';
import { DealLockStep5Screen } from '../screens/dealflow/DealLockStep5Screen';
import { DealBookedScreen } from '../screens/dealflow/DealBookedScreen';
import { DealBookingConfirmedScreen } from '../screens/dealflow/DealBookingConfirmedScreen';
import { DealPDIOptionScreen } from '../screens/dealflow/DealPDIOptionScreen';
import { DealPDIStatusScreen } from '../screens/dealflow/DealPDIStatusScreen';
import { DealPDIReportScreen } from '../screens/dealflow/DealPDIReportScreen';
import { DealDeliveryDashboardScreen } from '../screens/dealflow/DealDeliveryDashboardScreen';
import { DealConfirmDeliveryScreen } from '../screens/dealflow/DealConfirmDeliveryScreen';
import { DealClosedScreen } from '../screens/dealflow/DealClosedScreen';

// Loan
import { CarLoanPreApprovalScreen } from '../screens/loan/CarLoanPreApprovalScreen';
import { CarLoanFormScreen } from '../screens/loan/CarLoanFormScreen';
import { CarLoanPendingScreen } from '../screens/loan/CarLoanPendingScreen';

// Agreement
import { DealAgreementScreen } from '../screens/dealflow/DealAgreementScreen';

// Orders
import { OrderListScreen } from '../screens/orders/OrderListScreen';
import { OrderDetailScreen } from '../screens/orders/OrderDetailScreen';
import { DeliveryOTPScreen } from '../screens/orders/DeliveryOTPScreen';

// PriceLock
import { PriceLockScreen } from '../screens/pricelock/PriceLockScreen';

// Wallet
import { WalletScreen } from '../screens/wallet/WalletScreen';
import { BuyCreditsScreen } from '../screens/wallet/BuyCreditsScreen';
import { CreditDetailsScreen } from '../screens/wallet/CreditDetailsScreen';

// Documents
import { DocumentsVaultScreen } from '../screens/documents/DocumentsVaultScreen';
import { DocumentFolderScreen } from '../screens/documents/DocumentFolderScreen';
import { DocumentViewerScreen } from '../screens/documents/DocumentViewerScreen';

// History
import { PurchaseHistoryScreen } from '../screens/history/PurchaseHistoryScreen';

// Support
import { SupportScreen } from '../screens/support/SupportScreen';
import { RaiseTicketScreen } from '../screens/support/RaiseTicketScreen';
import { TicketDetailScreen } from '../screens/support/TicketDetailScreen';
import { DisputeScreen } from '../screens/support/DisputeScreen';

// Notifications
import { NotificationCenterScreen } from '../screens/notifications/NotificationCenterScreen';

// Profile
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { PrivacySettingsScreen } from '../screens/profile/PrivacySettingsScreen';
import { SecurityScreen } from '../screens/profile/SecurityScreen';
import { DocumentListScreen } from '../screens/profile/DocumentListScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

      {/* Browse */}
      <Stack.Screen name="Brand" component={BrandScreen} />
      <Stack.Screen name="ModelDetail" component={ModelDetailScreen} />
      <Stack.Screen name="SearchCar" component={SearchCarScreen} />

      {/* Intent */}
      <Stack.Screen name="SelectYourCars" component={SelectYourCarsScreen} />
      <Stack.Screen name="CreateIntent" component={CreateIntentScreen} />
      <Stack.Screen name="CommitmentPay" component={CommitmentPayScreen} />
      <Stack.Screen name="IntentSuccess" component={IntentSuccessScreen} />

      {/* BidRoom */}
      <Stack.Screen name="BidRoomList" component={BidRoomListScreen} />
      <Stack.Screen name="BidRoom" component={BidRoomScreen} />
      <Stack.Screen name="SelectWinner" component={SelectWinnerScreen} />
      <Stack.Screen name="ComparisonGroup" component={ComparisonGroupScreen} />

      {/* Deal Flow */}
      <Stack.Screen name="DealLockStep1" component={DealLockStep1Screen} />
      <Stack.Screen name="DealLockStep2" component={DealLockStep2Screen} />
      <Stack.Screen name="DealLockStep3" component={DealLockStep3Screen} />
      <Stack.Screen name="DealLockStep4" component={DealLockStep4Screen} />
      <Stack.Screen name="DealLockStep5" component={DealLockStep5Screen} />
      <Stack.Screen name="DealBooked" component={DealBookedScreen} />
      <Stack.Screen name="DealBookingConfirmed" component={DealBookingConfirmedScreen} />
      <Stack.Screen name="DealPDIOption" component={DealPDIOptionScreen} />
      <Stack.Screen name="DealPDIStatus" component={DealPDIStatusScreen} />
      <Stack.Screen name="DealPDIReport" component={DealPDIReportScreen} />
      <Stack.Screen name="DealDeliveryDashboard" component={DealDeliveryDashboardScreen} />
      <Stack.Screen name="DealConfirmDelivery" component={DealConfirmDeliveryScreen} />
      <Stack.Screen name="DealClosed" component={DealClosedScreen} />

      {/* Loan */}
      <Stack.Screen name="CarLoanPreApproval" component={CarLoanPreApprovalScreen} />
      <Stack.Screen name="CarLoanForm" component={CarLoanFormScreen} />
      <Stack.Screen name="CarLoanPending" component={CarLoanPendingScreen} />

      {/* Agreement */}
      <Stack.Screen name="DealAgreement" component={DealAgreementScreen} />

      {/* Orders */}
      <Stack.Screen name="OrderList" component={OrderListScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="DeliveryOTP" component={DeliveryOTPScreen} />

      {/* PriceLock */}
      <Stack.Screen name="PriceLock" component={PriceLockScreen} />

      {/* Wallet */}
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="BuyCredits" component={BuyCreditsScreen} />
      <Stack.Screen name="CreditDetails" component={CreditDetailsScreen} />

      {/* Documents */}
      <Stack.Screen name="DocumentsVault" component={DocumentsVaultScreen} />
      <Stack.Screen name="DocumentList" component={DocumentListScreen} />
      <Stack.Screen name="DocumentFolder" component={DocumentFolderScreen} />
      <Stack.Screen name="DocumentViewer" component={DocumentViewerScreen} />

      {/* History */}
      <Stack.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} />

      {/* Support */}
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="RaiseTicket" component={RaiseTicketScreen} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
      <Stack.Screen name="Dispute" component={DisputeScreen} />

      {/* Notifications */}
      <Stack.Screen name="NotificationCenter" component={NotificationCenterScreen} />

      {/* Profile */}
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
    </Stack.Navigator>
  );
};
