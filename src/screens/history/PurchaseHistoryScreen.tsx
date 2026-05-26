import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { mockOrders } from '../../mocks/mockOrders';
import { PurchaseHistoryCard } from '../../components/cards/PurchaseHistoryCard';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { formatPrice } from '../../utils/formatPrice';

type Props = NativeStackScreenProps<MainStackParamList, 'PurchaseHistory'>;

export const PurchaseHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const deliveredOrders = mockOrders.filter((o) => o.status === 'DELIVERED');
  const allOrders = mockOrders;

  const totalSavings = deliveredOrders.reduce((sum, o) => sum + o.savings, 0);
  const totalSpend = deliveredOrders.reduce((sum, o) => sum + o.onRoadPrice, 0);

  return (
    <ScreenWrapper>
      <Header title="Purchase History" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Stats banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{deliveredOrders.length}</Text>
            <Text style={styles.statLabel}>Cars Purchased</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.live }]}>
              {formatPrice(totalSavings)}
            </Text>
            <Text style={styles.statLabel}>Total Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatPrice(totalSpend)}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        {/* Horizontal scroll of delivered cars */}
        {deliveredOrders.length > 0 && (
          <>
            <SectionHeader title="Recent Purchases" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {deliveredOrders.map((order) => (
                <PurchaseHistoryCard
                  key={order.id}
                  order={order}
                  onPress={() =>
                    navigation.navigate('OrderDetail', { orderId: order.id })
                  }
                />
              ))}
            </ScrollView>
          </>
        )}

        {/* All orders list */}
        <SectionHeader title="All Orders" />
        {allOrders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderRow}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('OrderDetail', { orderId: order.id })
            }
          >
            <View style={styles.orderLeft}>
              <Text style={styles.orderCar}>
                {order.carName} {order.variantName}
              </Text>
              <Text style={styles.orderDealer}>
                {order.dealerName} · {order.dealerCity}
              </Text>
              <Text style={styles.orderDate}>{order.purchaseDate}</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderPrice}>{formatPrice(order.onRoadPrice)}</Text>
              <View
                style={[
                  styles.statusPill,
                  {
                    backgroundColor:
                      order.status === 'DELIVERED'
                        ? colors.liveLight
                        : order.status === 'IN_PROGRESS'
                        ? colors.primaryLight
                        : colors.errorLight,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusPillText,
                    {
                      color:
                        order.status === 'DELIVERED'
                          ? colors.live
                          : order.status === 'IN_PROGRESS'
                          ? colors.primary
                          : colors.error,
                    },
                  ]}
                >
                  {order.status === 'DELIVERED'
                    ? 'Delivered'
                    : order.status === 'IN_PROGRESS'
                    ? 'In Progress'
                    : 'Cancelled'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 4,
  },
  horizontalScroll: {
    paddingBottom: 8,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  orderLeft: {
    flex: 1,
  },
  orderCar: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  orderDealer: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 2,
    fontWeight: '500',
  },
  orderDate: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
