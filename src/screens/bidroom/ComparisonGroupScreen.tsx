import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/common/Card';
import { PriceText } from '../../components/common/PriceText';
import { mockVehicles } from '../../mocks/mockVehicles';

type Props = NativeStackScreenProps<MainStackParamList, 'ComparisonGroup'>;

export const ComparisonGroupScreen: React.FC<Props> = ({ navigation }) => {
  // Let's grab some sample variants from mock data to show in comparison side-by-side
  const brezza = mockVehicles[0];
  const creta = mockVehicles[1];
  
  const compareItems = [
    { car: brezza, variant: brezza.variants[2] }, // Brezza ZXi
    { car: brezza, variant: brezza.variants[3] }, // Brezza ZXi+ AT
    { car: creta, variant: creta.variants[2] },   // Creta SX
  ];

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Compare Models" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Side-by-Side Comparison</Text>
        <Text style={styles.sectionSubtitle}>
          Select a winner directly from any of these custom bidding rooms.
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {/* Specs comparison matrix table */}
          <Card style={styles.tableCard}>
            <View style={styles.tableHeaderRow}>
              <View style={[styles.col, styles.labelCol]}>
                <Text style={styles.headerLabel}>Specification</Text>
              </View>
              {compareItems.map((item, idx) => (
                <View key={idx} style={[styles.col, styles.valCol]}>
                  <Text style={styles.carName}>{item.car.model}</Text>
                  <Text style={styles.variantName}>{item.variant.name}</Text>
                </View>
              ))}
            </View>

            {/* Price Row */}
            <View style={styles.row}>
              <View style={[styles.col, styles.labelCol]}>
                <Text style={styles.rowLabel}>Base Price</Text>
              </View>
              {compareItems.map((item, idx) => (
                <View key={idx} style={[styles.col, styles.valCol]}>
                  <PriceText value={item.variant.price} style={styles.rowValBold} />
                </View>
              ))}
            </View>

            {/* Fuel Row */}
            <View style={styles.row}>
              <View style={[styles.col, styles.labelCol]}>
                <Text style={styles.rowLabel}>Fuel</Text>
              </View>
              {compareItems.map((item, idx) => (
                <View key={idx} style={[styles.col, styles.valCol]}>
                  <Text style={styles.rowVal}>{item.variant.fuel}</Text>
                </View>
              ))}
            </View>

            {/* Transmission Row */}
            <View style={styles.row}>
              <View style={[styles.col, styles.labelCol]}>
                <Text style={styles.rowLabel}>Transmission</Text>
              </View>
              {compareItems.map((item, idx) => (
                <View key={idx} style={[styles.col, styles.valCol]}>
                  <Text style={styles.rowVal}>{item.variant.transmission}</Text>
                </View>
              ))}
            </View>

            {/* Engine Row */}
            <View style={styles.row}>
              <View style={[styles.col, styles.labelCol]}>
                <Text style={styles.rowLabel}>Engine</Text>
              </View>
              {compareItems.map((item, idx) => (
                <View key={idx} style={[styles.col, styles.valCol]}>
                  <Text style={styles.rowVal}>{item.variant.engine}</Text>
                </View>
              ))}
            </View>

            {/* Mileage Row */}
            <View style={styles.row}>
              <View style={[styles.col, styles.labelCol]}>
                <Text style={styles.rowLabel}>Mileage</Text>
              </View>
              {compareItems.map((item, idx) => (
                <View key={idx} style={[styles.col, styles.valCol]}>
                  <Text style={styles.rowVal}>{item.variant.mileage}</Text>
                </View>
              ))}
            </View>

            {/* Action Row */}
            <View style={[styles.row, styles.actionRow]}>
              <View style={[styles.col, styles.labelCol]}>
                <Text style={styles.rowLabel}>Bid Room</Text>
              </View>
              {compareItems.map((item, idx) => (
                <View key={idx} style={[styles.col, styles.valCol]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ModelDetail', { vehicleId: item.car.id })}
                    style={styles.actionBtn}
                  >
                    <Text style={styles.actionBtnText}>Select</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card>
        </ScrollView>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
    lineHeight: 18,
  },
  horizontalScroll: {
    paddingBottom: 20,
  },
  tableCard: {
    padding: 0,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
    alignItems: 'center',
  },
  actionRow: {
    borderBottomWidth: 0,
  },
  col: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  labelCol: {
    width: 110,
    backgroundColor: '#FAFBFD',
    borderRightWidth: 1,
    borderRightColor: colors.borderLight,
  },
  valCol: {
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  carName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  variantName: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  rowLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  rowVal: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  rowValBold: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  actionBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
});
