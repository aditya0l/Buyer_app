import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';
import { BottomTabNavigator } from './BottomTabNavigator';
import { BrandScreen } from '../screens/browse/BrandScreen';
import { ModelDetailScreen } from '../screens/browse/ModelDetailScreen';
import { CreateIntentScreen } from '../screens/intent/CreateIntentScreen';
import { CommitmentPayScreen } from '../screens/intent/CommitmentPayScreen';
import { IntentSuccessScreen } from '../screens/intent/IntentSuccessScreen';
import { BidRoomScreen } from '../screens/bidroom/BidRoomScreen';
import { SelectWinnerScreen } from '../screens/bidroom/SelectWinnerScreen';
import { ComparisonGroupScreen } from '../screens/bidroom/ComparisonGroupScreen';
import { OrderDetailScreen } from '../screens/orders/OrderDetailScreen';
import { PriceLockScreen } from '../screens/pricelock/PriceLockScreen';
import { DeliveryOTPScreen } from '../screens/orders/DeliveryOTPScreen';
import { WalletScreen } from '../screens/wallet/WalletScreen';
import { CreditDetailsScreen } from '../screens/wallet/CreditDetailsScreen';
import { DocumentListScreen } from '../screens/profile/DocumentListScreen';
import { PurchaseHistoryScreen } from '../screens/profile/PurchaseHistoryScreen';
import { NotificationCenterScreen } from '../screens/notifications/NotificationCenterScreen';

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
      <Stack.Screen name="Brand" component={BrandScreen} />
      <Stack.Screen name="ModelDetail" component={ModelDetailScreen} />
      <Stack.Screen name="CreateIntent" component={CreateIntentScreen} />
      <Stack.Screen name="CommitmentPay" component={CommitmentPayScreen} />
      <Stack.Screen name="IntentSuccess" component={IntentSuccessScreen} />
      <Stack.Screen name="BidRoom" component={BidRoomScreen} />
      <Stack.Screen name="SelectWinner" component={SelectWinnerScreen} />
      <Stack.Screen name="ComparisonGroup" component={ComparisonGroupScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="PriceLock" component={PriceLockScreen} />
      <Stack.Screen name="DeliveryOTP" component={DeliveryOTPScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="CreditDetails" component={CreditDetailsScreen} />
      <Stack.Screen name="DocumentList" component={DocumentListScreen} />
      <Stack.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} />
      <Stack.Screen name="NotificationCenter" component={NotificationCenterScreen} />
    </Stack.Navigator>
  );
};
