import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { QuoteCard } from '../../components/cards/QuoteCard';
import { TimerCountdown } from '../../components/common/TimerCountdown';
import { Button } from '../../components/common/Button';
import { useBidRoomStore } from '../../store/bidRoomStore';

type Props = NativeStackScreenProps<MainStackParamList, 'BidRoom'>;

export const BidRoomScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId } = route.params;
  const { rooms, tickTimers } = useBidRoomStore();
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

  // Sync timers
  useEffect(() => {
    const interval = setInterval(() => {
      tickTimers();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTimers]);

  const room = rooms.find((r) => r.id === roomId);

  if (!room) {
    return (
      <ScreenWrapper>
        <Header title="Error" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Bid Room not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  // Sort quotes by: pinned first, then lowest price
  const sortedQuotes = [...room.quotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return a.onRoadTotal - b.onRoadTotal;
  });

  const lowestPriceQuote = room.quotes.reduce((prev, curr) => 
    (prev.onRoadTotal < curr.onRoadTotal) ? prev : curr
  , room.quotes[0]);

  const handlePinQuote = (quoteId: string) => {
    useBidRoomStore.setState((state) => ({
      rooms: state.rooms.map((r) => {
        if (r.id !== roomId) return r;
        return {
          ...r,
          quotes: r.quotes.map((q) => (q.id === quoteId ? { ...q, isPinned: !q.isPinned } : q)),
        };
      }),
    }));
  };

  const handleRequestUpdate = (quoteId: string) => {
    Alert.alert(
      'Update Requested ↺',
      'We have requested the dealer to submit an updated bid package. You will receive a notification if they respond.',
      [{ text: 'OK' }]
    );
  };

  const handleCancelIntent = () => {
    Alert.alert(
      'Cancel Intent',
      'Are you sure you want to cancel this bid room? Your deal credit will be refunded according to policies.',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            useBidRoomStore.getState().updateRoomStatus(roomId, 'CLOSED');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleSelectWinner = () => {
    if (!selectedQuoteId) {
      // Default to lowest price quote if none explicitly selected
      if (lowestPriceQuote) {
        navigation.navigate('SelectWinner', { roomId, quoteId: lowestPriceQuote.id });
      } else {
        Alert.alert('No Bids', 'No dealer quotes exist to select a winner.');
      }
    } else {
      navigation.navigate('SelectWinner', { roomId, quoteId: selectedQuoteId });
    }
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header
        title={room.carName}
        rightAction={
          <TouchableOpacity onPress={() => navigation.navigate('NotificationCenter')}>
            <Text style={styles.bellText}>🔔</Text>
          </TouchableOpacity>
        }
      />

      {/* Room Info Bar */}
      <View style={styles.infoBar}>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Time Remaining</Text>
          <TimerCountdown initialSeconds={room.timeRemainingSeconds} textStyle={styles.infoTimer} />
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Dealers Bidding</Text>
          <Text style={styles.infoValue}>{room.dealersCount} Joined</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Room ID</Text>
          <Text style={styles.infoValue}>{room.id.substring(5).toUpperCase()}</Text>
        </View>
      </View>

      {/* Quotes FlatList */}
      <FlatList
        data={sortedQuotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isLowest = lowestPriceQuote && item.id === lowestPriceQuote.id;
          return (
            <QuoteCard
              quote={item}
              isBest={isLowest}
              onPinPress={() => handlePinQuote(item.id)}
              onRequestUpdatePress={() => handleRequestUpdate(item.id)}
              onSelectPress={() => {
                setSelectedQuoteId(item.id);
                navigation.navigate('SelectWinner', { roomId, quoteId: item.id });
              }}
            />
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>⏱</Text>
            <Text style={styles.emptyTitle}>Waiting for bids...</Text>
            <Text style={styles.emptySub}>
              Dealers are calculating custom pricing. Bids will start appearing here soon.
            </Text>
          </View>
        }
      />

      {/* Sticky Bottom Action Bar */}
      <View style={styles.actionBar}>
        <Button
          title={selectedQuoteId ? 'Select Winner' : 'Accept Best Quote'}
          onPress={handleSelectWinner}
          style={styles.selectWinnerBtn}
        />
        <View style={styles.secondaryActions}>
          <Button
            title="Cancel Intent"
            variant="ghost"
            onPress={handleCancelIntent}
            style={styles.cancelBtn}
            textStyle={styles.cancelBtnText}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

// Add touchable opacity import
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  bellText: {
    fontSize: 20,
  },
  infoBar: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    justifyContent: 'space-between',
  },
  infoCol: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  infoTimer: {
    fontSize: 13,
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
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
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  selectWinnerBtn: {
    height: 48,
    marginBottom: 8,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelBtn: {
    paddingVertical: 4,
  },
  cancelBtnText: {
    color: colors.error,
    fontWeight: '600',
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
