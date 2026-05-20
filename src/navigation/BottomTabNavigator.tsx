import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { BottomTabParamList } from './types';
import { HomeScreen } from '../screens/home/HomeScreen';
import { BrowseScreen } from '../screens/browse/BrowseScreen';
import { BidRoomListScreen } from '../screens/bidroom/BidRoomListScreen';
import { OrderListScreen } from '../screens/orders/OrderListScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ color, focused }) => {
          let emoji = '🏠';
          if (route.name === 'HomeTab') emoji = '🏠';
          else if (route.name === 'BrowseTab') emoji = '🔍';
          else if (route.name === 'RoomTab') emoji = '⚡';
          else if (route.name === 'OrderTab') emoji = '📦';
          else if (route.name === 'ProfileTab') emoji = '👤';

          return (
            <Text style={[styles.tabEmoji, { color: color, opacity: focused ? 1 : 0.6 }]}>
              {emoji}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="BrowseTab"
        component={BrowseScreen}
        options={{ tabBarLabel: 'Browse' }}
      />
      <Tab.Screen
        name="RoomTab"
        component={BidRoomListScreen}
        options={{ tabBarLabel: 'Bid Rooms' }}
      />
      <Tab.Screen
        name="OrderTab"
        component={OrderListScreen}
        options={{ tabBarLabel: 'Orders' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1A1A6E', // Dark Navy bottom nav background matching screenshots
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  tabEmoji: {
    fontSize: 18,
  },
});
