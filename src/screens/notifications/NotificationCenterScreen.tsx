import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { ArrowLeft } from 'lucide-react-native';
import { mockNotifications, AppNotification } from '../../mocks/mockNotifications';
import { NotificationCard } from '../../components/cards/NotificationCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<MainStackParamList, 'NotificationCenter'>;

type TabType = 'All' | 'Action Required' | 'Deals' | 'Finance';

export const NotificationCenterScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('All');

  // We are using the mock directy since we updated its shape.
  // Real app would fetch this from store or API.
  const notifications = mockNotifications;

  const grouped = notifications.reduce((acc, curr) => {
    if (!acc[curr.groupName]) acc[curr.groupName] = [];
    acc[curr.groupName].push(curr);
    return acc;
  }, {} as Record<string, AppNotification[]>);

  const sections = [
    { title: 'Today', data: grouped['Today'] || [] },
    { title: 'Yesterday', data: grouped['Yesterday'] || [] },
    { title: '2 Days ago', data: grouped['2 Days ago'] || [] },
  ].filter(sec => sec.data.length > 0);

  const tabs: TabType[] = ['All', 'Action Required', 'Deals', 'Finance'];

  return (
    <ScreenWrapper>
      <View style={[styles.headerContainer, { paddingTop: insets.top || 16 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
            {tabs.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setActiveTab(t)}
                style={[styles.tab, activeTab === t && styles.selectedTab]}
              >
                <Text style={[styles.tabText, activeTab === t && styles.selectedTabText]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <NotificationCard notification={item} />
        )}
        stickySectionHeadersEnabled={false}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#0F172A',
    fontFamily: 'Outfit-Bold',
  },
  markAllText: {
    fontSize: 13,
    color: '#2563EB',
    fontFamily: 'Outfit-Medium',
  },
  tabsWrapper: {
    marginLeft: 0,
  },
  tabsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedTab: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  tabText: {
    fontSize: 13,
    color: '#64748B',
    fontFamily: 'Outfit-Medium',
  },
  selectedTabText: {
    color: '#FFF',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Outfit-Bold',
    marginTop: 8,
    marginBottom: 12,
  },
});
