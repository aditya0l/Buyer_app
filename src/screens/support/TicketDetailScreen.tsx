import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';

type Props = NativeStackScreenProps<MainStackParamList, 'TicketDetail'>;

const mockThread = [
  {
    id: 'msg-1',
    author: 'You',
    isUser: true,
    message: 'The dealer quoted ₹13.1L in the bid room but is now asking for ₹13.4L at the time of booking. This is a violation of the commitment they made.',
    timestamp: '10 May 2026, 3:22 PM',
  },
  {
    id: 'msg-2',
    author: 'CarBounty Support',
    isUser: false,
    message: 'Thank you for reaching out. We have escalated this to our Dealer Relations team. The dealer has been asked to respond within 48 hours. Your commitment is protected by our CarBounty Price Guarantee.',
    timestamp: '11 May 2026, 10:05 AM',
  },
  {
    id: 'msg-3',
    author: 'CarBounty Support',
    isUser: false,
    message: 'Update: The dealer has confirmed they will honor the quoted price of ₹13.1L. Please proceed with booking. If the issue persists, please re-open this ticket.',
    timestamp: '12 May 2026, 2:48 PM',
  },
];

export const TicketDetailScreen: React.FC<Props> = ({ route }) => {
  const { ticketId } = route.params;

  return (
    <ScreenWrapper>
      <Header title={ticketId} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Ticket meta */}
        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Status</Text>
            <View style={[styles.statusPill, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.statusText, { color: colors.primary }]}>In Review</Text>
            </View>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Category</Text>
            <Text style={styles.metaValue}>Dealer Issue</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Created</Text>
            <Text style={styles.metaValue}>10 May 2026</Text>
          </View>
        </View>

        {/* Thread */}
        <Text style={styles.threadTitle}>Conversation</Text>
        {mockThread.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.bubble,
              msg.isUser ? styles.bubbleUser : styles.bubbleSupport,
            ]}
          >
            <Text style={styles.bubbleAuthor}>{msg.author}</Text>
            <Text style={styles.bubbleText}>{msg.message}</Text>
            <Text style={styles.bubbleTime}>{msg.timestamp}</Text>
          </View>
        ))}

        <View style={styles.resolvedNote}>
          <Text style={styles.resolvedText}>
            This ticket is currently In Review. You will be notified when there is an update.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  metaCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  threadTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  bubble: {
    borderRadius: radius.lg,
    padding: 12,
    marginBottom: 10,
    maxWidth: '92%',
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  bubbleSupport: {
    backgroundColor: colors.cardBg,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  bubbleAuthor: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  bubbleText: {
    fontSize: 13,
    color: colors.white,
    lineHeight: 18,
  },
  bubbleTime: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 6,
    textAlign: 'right',
  },
  resolvedNote: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: 12,
    marginTop: 8,
  },
  resolvedText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    lineHeight: 16,
  },
});
