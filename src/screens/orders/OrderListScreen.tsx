import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { ActiveOrderCard } from '../../components/cards/ActiveOrderCard';
import { mockOrders } from '../../mocks/mockOrders';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

type TabType = 'ACTIVE' | 'COMPLETED';

export const OrderListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>('ACTIVE');

  // Filter orders
  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === 'ACTIVE') {
      return order.status === 'IN_PROGRESS';
    } else {
      return order.status === 'DELIVERED';
    }
  });

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Your Orders" showBack={false} />

      {/* Tabs Selector */}
      <View style={styles.tabsContainer}>
        {(['ACTIVE', 'COMPLETED'] as TabType[]).map((tab) => {
          const isSelected = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, isSelected && styles.selectedTab]}
            >
              <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
                {tab === 'ACTIVE' ? 'Active Orders' : 'Purchase History'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Orders list */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ActiveOrderCard
            order={item}
            onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              {activeTab === 'ACTIVE' ? '📦' : '📜'}
            </Text>
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptySub}>
              {activeTab === 'ACTIVE'
                ? "You don't have any active vehicle orders in progress."
                : 'No purchase history recorded.'}
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.inputBg,
    marginHorizontal: 4,
  },
  selectedTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  selectedTabText: {
    color: colors.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 48,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
