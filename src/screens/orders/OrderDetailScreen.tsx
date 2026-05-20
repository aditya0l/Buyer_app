import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Divider } from '../../components/common/Divider';
import { PriceText } from '../../components/common/PriceText';
import { mockOrders } from '../../mocks/mockOrders';

type Props = NativeStackScreenProps<MainStackParamList, 'OrderDetail'>;

export const OrderDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { orderId } = route.params;

  const order = mockOrders.find((o) => o.id === orderId);

  const handleUploadInvoice = () => {
    Alert.alert(
      'Upload Document',
      'Select document type to upload to secure vault.',
      [
        { text: 'Tax Invoice', onPress: () => Alert.alert('Success', 'Invoice uploaded successfully!') },
        { text: 'KYC Document', onPress: () => Alert.alert('Success', 'KYC verified!') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleConfirmDelivery = () => {
    navigation.navigate('DeliveryOTP', { orderId });
  };

  if (!order) {
    return (
      <ScreenWrapper>
        <Header title="Error" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Order not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const isDeliverable = order.status === 'IN_PROGRESS';

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Order Status" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Summary Header */}
        <View style={styles.summaryHeader}>
          <Image source={{ uri: order.image }} style={styles.carImage} resizeMode="cover" />
          <View style={styles.summaryText}>
            <Text style={styles.carName}>{order.carName}</Text>
            <Text style={styles.variantName}>{order.variantName}</Text>
            <Text style={styles.dealerText}>
              via {order.dealerName} • {order.dealerCity}
            </Text>
          </View>
        </View>

        {/* VIN / Stock Status */}
        {order.vinNumber && (
          <Card style={styles.vinCard}>
            <View style={styles.row}>
              <Text style={styles.vinLabel}>Chassis / VIN Number</Text>
              <Text style={styles.vinValue}>{order.vinNumber}</Text>
            </View>
            <View style={[styles.row, { marginTop: 6 }]}>
              <Text style={styles.vinLabel}>Stock Availability</Text>
              <View style={styles.vinBadge}>
                <Text style={styles.vinBadgeText}>{order.vinStatusTag || 'In-Stock'}</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Milestone Timeline */}
        <Text style={styles.sectionTitle}>Order Progression</Text>
        <Card style={styles.timelineCard}>
          {order.milestones.map((step, idx) => {
            const isCompleted = step.status === 'COMPLETED';
            const isActive = step.status === 'ACTIVE';
            
            return (
              <View key={step.id} style={styles.timelineRow}>
                {/* Visual Line & Dot */}
                <View style={styles.visualCol}>
                  <View style={[
                    styles.dot,
                    isCompleted && styles.completedDot,
                    isActive && styles.activeDot
                  ]} />
                  {idx < order.milestones.length - 1 && (
                    <View style={[
                      styles.line,
                      isCompleted && styles.completedLine
                    ]} />
                  )}
                </View>
                
                {/* Details Content */}
                <View style={styles.timelineContent}>
                  <Text style={[
                    styles.stepTitle,
                    isCompleted && styles.completedStepTitle,
                    isActive && styles.activeStepTitle
                  ]}>
                    {step.title}
                  </Text>
                  <Text style={styles.stepDesc}>{step.description}</Text>
                  {step.date && <Text style={styles.stepDate}>{step.date}</Text>}
                </View>
              </View>
            );
          })}
        </Card>

        {/* Price Summary */}
        <Text style={styles.sectionTitle}>Price Breakdown</Text>
        <Card style={styles.priceCard}>
          <View style={styles.row}>
            <Text style={styles.priceLabel}>Ex-Showroom Price</Text>
            <PriceText value={order.exShowroomPrice} style={styles.priceValue} />
          </View>
          <View style={styles.row}>
            <Text style={styles.priceLabel}>Final Paid Price (On-Road)</Text>
            <PriceText value={order.onRoadPrice} style={[styles.priceValue, { fontWeight: '700' }]} />
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.savingsLabel}>Total Bounty Savings</Text>
            <PriceText value={order.savings} style={styles.savingsValue} />
          </View>
        </Card>

        {/* Action buttons */}
        <View style={styles.btnRow}>
          <Button
            title="Upload Document"
            variant="secondary"
            onPress={handleUploadInvoice}
            style={styles.actionBtn}
          />
          {isDeliverable && (
            <Button
              title="Confirm Delivery Receipt"
              onPress={handleConfirmDelivery}
              style={[styles.actionBtn, { marginLeft: 12 }]}
            />
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.cardBg,
    padding: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  carImage: {
    width: 70,
    height: 70,
    borderRadius: radius.md,
    backgroundColor: colors.borderLight,
  },
  summaryText: {
    marginLeft: 16,
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  variantName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dealerText: {
    fontSize: 12,
    color: colors.textBlue,
    fontWeight: '600',
    marginTop: 4,
  },
  vinCard: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vinLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  vinValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  vinBadge: {
    backgroundColor: colors.liveLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vinBadgeText: {
    fontSize: 11,
    color: colors.live,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  timelineCard: {
    marginBottom: 20,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  visualCol: {
    width: 24,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
    zIndex: 2,
  },
  completedDot: {
    backgroundColor: colors.live,
  },
  activeDot: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  line: {
    width: 2,
    position: 'absolute',
    top: 12,
    bottom: -16,
    backgroundColor: colors.border,
    zIndex: 1,
  },
  completedLine: {
    backgroundColor: colors.live,
  },
  timelineContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 24,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  completedStepTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  activeStepTitle: {
    color: colors.primary,
    fontWeight: '700',
  },
  stepDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },
  stepDate: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  priceCard: {
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  savingsLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  savingsValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.live,
  },
  btnRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    height: 46,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 15,
    color: colors.error,
    fontWeight: '600',
  },
});
