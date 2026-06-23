import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { BidRoomCard } from '../../components/cards/BidRoomCard';
import { useBidRoomStore } from '../../store/bidRoomStore';
import { ArrowLeft, Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

type TabType = 'All' | 'Active' | 'Closed' | 'Won';

export const BidRoomListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { rooms, initializeRooms } = useBidRoomStore();
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    if (rooms.length === 0) {
      initializeRooms();
    }
  }, [initializeRooms, rooms.length]);

  const filteredRooms = rooms.filter((room) => {
    if (activeTab === 'Active') {
      return room.status === 'LIVE' || room.status === 'WAITING' || room.status === 'INSTANT';
    }
    if (activeTab === 'Closed') {
      return room.status === 'CLOSED';
    }
    if (activeTab === 'Won') {
      return room.status === 'WON';
    }
    return true; // All
  }).filter(room => room.carName.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* ── Header Background ── */}
      <View style={[styles.headerBg, { paddingTop: insets.top + 16 }]}>
        
        {/* Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bid Rooms</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={18} color="#94A3B8" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search brand, model, Variant..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filter Pills */}
        <View style={styles.tabsScroll}>
          {(['All', 'Active', 'Closed', 'Won'] as TabType[]).map((tab) => {
            const isSel = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, isSel && styles.selectedTab]}
              >
                <Text style={[styles.tabText, isSel && styles.selectedTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>

      {/* ── Rooms List ── */}
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BidRoomCard
            room={item}
            onPress={() => navigation.navigate('BidRoom', { roomId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Rooms Found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerBg: { backgroundColor: '#EFF6FF', paddingHorizontal: 16, paddingBottom: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, color: '#0F172A', fontFamily: 'Outfit-Bold' },
  
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 24, paddingHorizontal: 16, height: 48, marginBottom: 16 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: '#0F172A', height: '100%', fontFamily: 'Outfit-Regular' },
  
  tabsScroll: { flexDirection: 'row', alignItems: 'center' },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#FFF', marginRight: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  selectedTab: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  tabText: { fontSize: 13, color: '#64748B', fontFamily: 'Outfit-Medium' },
  selectedTabText: { color: '#FFF' },

  listContent: { padding: 16, paddingBottom: 100 },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyTitle: { fontSize: 16, color: '#64748B', fontFamily: 'Outfit-Medium' }
});
