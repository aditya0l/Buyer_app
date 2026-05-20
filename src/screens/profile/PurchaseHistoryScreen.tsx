import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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

export const PurchaseHistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Filter completed purchases
  const completedPurchases = mockOrders.filter((order) => order.status === 'DELIVERED');

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Purchase History" />
      
      <FlatList
        data={completedPurchases}
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
            <Text style={styles.emptyEmoji}>📜</Text>
            <Text style={styles.emptyTitle}>No History Found</Text>
            <Text style={styles.emptySub}>
              Your completed vehicle purchases will appear here once delivered.
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
  listContent: {
    padding: 16,
    paddingBottom: 40,
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
