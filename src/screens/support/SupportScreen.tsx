import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { formatDate } from '../../utils/formatDate';

type Props = NativeStackScreenProps<MainStackParamList, 'Support'>;

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  lastUpdate: string;
}

const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Dealer did not honour quoted price',
    category: 'Dealer Issue',
    status: 'IN_REVIEW',
    createdAt: '2026-05-10',
    lastUpdate: '2026-05-15',
  },
  {
    id: 'TKT-002',
    subject: 'Deal credit not refunded after room closed',
    category: 'Wallet & Credits',
    status: 'RESOLVED',
    createdAt: '2026-04-28',
    lastUpdate: '2026-05-02',
  },
];

const STATUS_COLOR: Record<string, string> = {
  OPEN: colors.waiting,
  IN_REVIEW: colors.primary,
  RESOLVED: colors.live,
  CLOSED: colors.textSecondary,
};

const STATUS_BG: Record<string, string> = {
  OPEN: colors.waitingLight,
  IN_REVIEW: colors.primaryLight,
  RESOLVED: colors.liveLight,
  CLOSED: colors.borderLight,
};

const STATUS_LABEL: Record<string, string> = {
  OPEN: 'Open',
  IN_REVIEW: 'In Review',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

export const SupportScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <Header title="Support" />
      <FlatList
        data={mockTickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <Button
              title="+ Raise a Ticket"
              onPress={() => navigation.navigate('RaiseTicket')}
              style={styles.raiseBtn}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🎫</Text>
            <Text style={styles.emptyTitle}>No Open Tickets</Text>
            <Text style={styles.emptySub}>
              Having an issue? Raise a support ticket and our team will respond within 24 hours.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ticketCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
          >
            <View style={styles.ticketTop}>
              <Text style={styles.ticketId}>{item.id}</Text>
              <View
                style={[
                  styles.statusPill,
                  { backgroundColor: STATUS_BG[item.status] },
                ]}
              >
                <Text
                  style={[
                    styles.statusPillText,
                    { color: STATUS_COLOR[item.status] },
                  ]}
                >
                  {STATUS_LABEL[item.status]}
                </Text>
              </View>
            </View>
            <Text style={styles.ticketSubject}>{item.subject}</Text>
            <Text style={styles.ticketCategory}>{item.category}</Text>
            <Text style={styles.ticketDate}>Last updated: {item.lastUpdate}</Text>
          </TouchableOpacity>
        )}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 16,
  },
  raiseBtn: {
    marginBottom: 0,
  },
  ticketCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  ticketId: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
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
  ticketSubject: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  ticketCategory: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 6,
  },
  ticketDate: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
    padding: 24,
  },
  emptyIcon: {
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
    marginTop: 6,
    lineHeight: 18,
  },
});
