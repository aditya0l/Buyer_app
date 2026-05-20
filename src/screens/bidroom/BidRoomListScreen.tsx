import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { BidRoomCard } from '../../components/cards/BidRoomCard';
import { useBidRoomStore } from '../../store/bidRoomStore';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

type TabType = 'LIVE' | 'WAITING' | 'CLOSED';

export const BidRoomListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { rooms } = useBidRoomStore();
  const [activeTab, setActiveTab] = useState<TabType>('LIVE');

  const filteredRooms = rooms.filter((room) => room.status === activeTab);

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="Your Bid Rooms" showBack={false} />

      {/* Tabs Selector */}
      <View style={styles.tabsContainer}>
        {(['LIVE', 'WAITING', 'CLOSED'] as TabType[]).map((tab) => {
          const isSelected = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, isSelected && styles.selectedTab]}
            >
              <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Rooms FlatList */}
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <BidRoomCard
            room={item}
            onPress={() => navigation.navigate('BidRoom', { roomId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              {activeTab === 'LIVE' ? '⚡' : activeTab === 'WAITING' ? '⏱' : '🛑'}
            </Text>
            <Text style={styles.emptyTitle}>No Rooms Found</Text>
            <Text style={styles.emptySub}>
              {activeTab === 'LIVE'
                ? 'No live auction rooms at the moment.'
                : activeTab === 'WAITING'
                ? 'No rooms waiting to start.'
                : 'No historical closed rooms.'}
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
