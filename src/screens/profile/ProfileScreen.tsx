import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle as SvgCircle, Path, Mask } from 'react-native-svg';
import { 
  ChevronLeft, Settings, Star, Edit, Copy, Car, ArrowRightLeft, 
  Wrench, CalendarDays, User, Bell, Banknote, HelpCircle, Info, LogOut, ChevronRight
} from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const { width } = Dimensions.get('window');

// ── Components ──

const StatsRow = ({ stats }: { stats: { value: string; label: string; valueColor: string }[] }) => (
  <View style={styles.statsRow}>
    {stats.map((stat, i) => (
      <React.Fragment key={i}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: stat.valueColor }]}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
        {i < stats.length - 1 && <View style={styles.statDivider} />}
      </React.Fragment>
    ))}
  </View>
);

const ListItem = ({ icon: Icon, title, subtitle, iconBg, onPress }: any) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    <View style={[styles.listIconBox, { backgroundColor: iconBg }]}>
      <Icon size={20} color="#0F172A" />
    </View>
    <View style={styles.listTextCol}>
      <Text style={styles.listTitle}>{title}</Text>
      {subtitle ? <Text style={styles.listSubtitle}>{subtitle}</Text> : null}
    </View>
    <ChevronRight size={20} color="#CBD5E1" />
  </TouchableOpacity>
);

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthStore();

  const cardWidth = width - 32;
  const midX = cardWidth / 2;
  const cutoutPath = `M ${midX - 64.9} 0 A 12 12 0 0 1 ${midX - 53.1} 9.8 A 54 54 0 0 0 ${midX + 53.1} 9.8 A 12 12 0 0 1 ${midX + 64.9} 0 Z`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* ── Background ── */}
      <View style={styles.bgContainer}>
        <Svg width="100%" height="320">
          <Rect width="100%" height="100%" fill="#2563EB" />
          <SvgCircle cx="80%" cy="10%" r="80" fill="#3B82F6" opacity={0.3} />
          <SvgCircle cx="10%" cy="40%" r="120" fill="#1D4ED8" opacity={0.2} />
        </Svg>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]} showsVerticalScrollIndicator={false}>
        
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <Settings size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* ── Profile Stats Card (with SVG Cutout) ── */}
        <View style={styles.profileCardWrapper}>
          {/* Avatar floating above card */}
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user?.avatarUrl || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }} 
              style={styles.avatarImg} 
            />
          </View>
          
          {/* Floating Action Buttons */}
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingVal}>4.6</Text>
            <Star size={12} color="#EAB308" fill="#EAB308" style={{ marginHorizontal: 2 }} />
            <Text style={styles.ratingText}>Rating</Text>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
            <Edit size={12} color="#2563EB" />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>

          {/* Card SVG Background */}
          <View style={StyleSheet.absoluteFill}>
            <Svg width="100%" height="100%">
              <Defs>
                <Mask id="cardMask">
                  <Rect x="0" y="0" width="100%" height="100%" fill="white" rx="16" />
                  <Path d={cutoutPath} fill="black" />
                </Mask>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#cardMask)" />
            </Svg>
          </View>

          {/* Card Content */}
          <View style={styles.profileCardContent}>
            <View style={{ height: 50 }} /> {/* Spacer for avatar */}
            <Text style={styles.userName}>{user?.name || 'Raaj Oberoi'}</Text>
            <Text style={styles.userPhone}>+91 {user?.phone || '74250 30000'}</Text>
            
            <View style={styles.horizontalDivider} />

            <StatsRow 
              stats={[
                { value: '2', label: 'Deals Won', valueColor: '#0F172A' },
                { value: '₹63.1k', label: 'Locked Price', valueColor: '#207320' },
                { value: '7', label: 'Room Created', valueColor: '#0F172A' },
              ]}
            />
          </View>
        </View>

        {/* ── Carbounty Score Banner ── */}
        <View style={styles.scoreBanner}>
          <View style={styles.scoreLeft}>
            <View style={styles.scoreIconBox}>
              <Svg width={24} height={24} viewBox="0 0 24 24">
                 <Path d="M12 2L14.4 7.2L20 8.4L16 12.8L17.2 18.4L12 16L6.8 18.4L8 12.8L4 8.4L9.6 7.2L12 2Z" fill="#F97316" />
                 <SvgCircle cx="12" cy="12" r="4" fill="#FDE047" />
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.scoreTitle}>Carbounty Score</Text>
              <Text style={styles.scoreSub}>Based on engagement, deals & reviews</Text>
            </View>
          </View>
          {/* Angled right tab */}
          <View style={styles.scoreRightTab}>
            <Svg width="80" height="100%" style={StyleSheet.absoluteFill}>
              <Path d="M20 0 H80 V100 H0 Z" fill="#2563EB" />
              <Path d="M28 0 L 8 100" stroke="rgba(255,255,255,0.4)" strokeWidth={1} strokeDasharray="4,4" />
            </Svg>
            <Text style={styles.scoreValText}>842</Text>
          </View>
        </View>

        {/* ── Invite Friends Card ── */}
        <View style={styles.inviteCard}>
          <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="invGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#3B82F6" />
                <Stop offset="100%" stopColor="#1D4ED8" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#invGrad)" rx="16" />
            <SvgCircle cx="90%" cy="10%" r="40" fill="#FFF" opacity={0.1} />
            <SvgCircle cx="10%" cy="90%" r="60" fill="#FFF" opacity={0.05} />
          </Svg>
          
          <View style={styles.inviteContent}>
            <View style={styles.inviteTop}>
              <View style={{ flex: 1 }}>
                <View style={styles.inviteLine} />
                <Text style={styles.inviteTitle}>Invite Friends, Save More</Text>
                <Text style={styles.inviteSub}>You both get 200 off the commitment fee on your next deal</Text>
              </View>
              <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/4213/4213958.png'}} style={styles.giftIcon} />
            </View>

            <View style={styles.codeRow}>
              <View style={styles.codeBox}>
                <Text style={styles.codeText}>HR07RJ200</Text>
              </View>
              <TouchableOpacity style={styles.copyBtn}>
                <Copy size={16} color="#FFF" style={{ marginRight: 6 }} />
                <Text style={styles.copyBtnText}>Copy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inviteStatsRow}>
              <View style={styles.invStatItem}>
                <Text style={styles.invStatVal}>3</Text>
                <Text style={styles.invStatLabel}>Referred</Text>
              </View>
              <View style={styles.invStatDivider} />
              <View style={styles.invStatItem}>
                <Text style={styles.invStatVal}>1</Text>
                <Text style={styles.invStatLabel}>Deal's Won</Text>
              </View>
              <View style={styles.invStatDivider} />
              <View style={styles.invStatItem}>
                <Text style={styles.invStatVal}>₹200</Text>
                <Text style={styles.invStatLabel}>Earned</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>Share Invite Link</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Lists ── */}
        <SectionTitle title="My Garage" />
        <View style={styles.listGroup}>
          <ListItem icon={Car} iconBg="#FEE2E2" title="My Cars" subtitle="2 owned · Brezza ZXi+ & Honda City" />
          <View style={styles.listDivider} />
          <ListItem icon={ArrowRightLeft} iconBg="#E0E7FF" title="Exchange / Trade-in" subtitle="Get best price for your old car" />
        </View>

        <SectionTitle title="Service & Maintenance" />
        <View style={styles.listGroup}>
          <ListItem icon={Wrench} iconBg="#FEF3C7" title="Service Reminders" subtitle="Brezza due in 800 km" />
          <View style={styles.listDivider} />
          <ListItem icon={CalendarDays} iconBg="#DCFCE7" title="Service Dues & Pending" subtitle="1 payment pending · ₹3,200" />
        </View>

        <SectionTitle title="Account" />
        <View style={styles.listGroup}>
          <ListItem icon={User} iconBg="#DBEAFE" title="Edit Profile" subtitle="Name, phone, email" onPress={() => navigation.navigate('EditProfile')} />
          <View style={styles.listDivider} />
          <ListItem icon={Bell} iconBg="#FEF08A" title="Notifications" subtitle="Bid alerts, SMS, email" />
          <View style={styles.listDivider} />
          <ListItem icon={Banknote} iconBg="#FFEDD5" title="Saved Finance Offers" subtitle="Pre-approved loans" />
          <View style={styles.listDivider} />
          <ListItem icon={HelpCircle} iconBg="#E0E7FF" title="Help & Support" subtitle="FAQs, contact us" />
          <View style={styles.listDivider} />
          <ListItem icon={Info} iconBg="#FEF08A" title="About Carbounty" subtitle="Version 1.0" />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <LogOut size={18} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  bgContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: 320, overflow: 'hidden', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  headerBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  headerTitle: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#FFF' },

  profileCardWrapper: { width: '100%', minHeight: 180, marginTop: 40, marginBottom: 20 },
  avatarContainer: { position: 'absolute', top: -48, alignSelf: 'center', zIndex: 10, width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: '#2563EB', overflow: 'hidden' },
  avatarImg: { width: '100%', height: '100%' },
  ratingBadge: { position: 'absolute', top: 16, left: 16, zIndex: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4 },
  ratingVal: { fontFamily: 'Outfit-Bold', fontSize: 12, color: '#0F172A' },
  ratingText: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B' },
  editBtn: { position: 'absolute', top: 16, right: 16, zIndex: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#DBEAFE', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  editBtnText: { fontFamily: 'Outfit-Medium', fontSize: 12, color: '#2563EB', marginLeft: 4 },
  
  profileCardContent: { padding: 16, paddingTop: 10, alignItems: 'center' },
  userName: { fontFamily: 'Outfit-Bold', fontSize: 18, color: '#0F172A', marginTop: 8 },
  userPhone: { fontFamily: 'Outfit-Regular', fontSize: 13, color: '#64748B', marginTop: 2 },
  horizontalDivider: { width: '80%', height: 1, backgroundColor: '#F1F5F9', marginVertical: 16 },
  
  statsRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statValue: { fontFamily: 'Outfit-Bold', fontSize: 16, marginBottom: 4 },
  statLabel: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#94A3B8' },
  statDivider: { width: 1, height: 24, backgroundColor: '#E2E8F0' },

  scoreBanner: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20, height: 60 },
  scoreLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 12 },
  scoreIconBox: { marginRight: 10 },
  scoreTitle: { fontFamily: 'Outfit-Bold', fontSize: 14, color: '#0F172A' },
  scoreSub: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#64748B' },
  scoreRightTab: { width: 80, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  scoreValText: { fontFamily: 'Outfit-Bold', fontSize: 20, color: '#FFF', marginLeft: 10 },

  inviteCard: { borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  inviteContent: { padding: 20 },
  inviteTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  inviteLine: { width: 2, height: 32, backgroundColor: '#F97316', position: 'absolute', left: -10, top: 4 },
  inviteTitle: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#FFF', marginBottom: 4 },
  inviteSub: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#BFDBFE', lineHeight: 18, paddingRight: 10 },
  giftIcon: { width: 48, height: 48, resizeMode: 'contain' },
  
  codeRow: { flexDirection: 'row', marginBottom: 16 },
  codeBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 8, justifyContent: 'center', alignItems: 'center', height: 44, marginRight: 12 },
  codeText: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#FFF', letterSpacing: 1 },
  copyBtn: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, height: 44 },
  copyBtnText: { fontFamily: 'Outfit-Medium', fontSize: 14, color: '#FFF' },
  
  inviteStatsRow: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: 8, paddingVertical: 12, marginBottom: 16 },
  invStatItem: { flex: 1, alignItems: 'center' },
  invStatVal: { fontFamily: 'Outfit-Bold', fontSize: 16, color: '#FFF', marginBottom: 2 },
  invStatLabel: { fontFamily: 'Outfit-Regular', fontSize: 11, color: '#BFDBFE' },
  invStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  
  shareBtn: { backgroundColor: '#F97316', borderRadius: 24, height: 48, justifyContent: 'center', alignItems: 'center' },
  shareBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' },

  sectionTitle: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#0F172A', marginBottom: 10, marginTop: 4, marginLeft: 4 },
  listGroup: { backgroundColor: '#FFF', borderRadius: 16, padding: 8, marginBottom: 20 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8 },
  listIconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  listTextCol: { flex: 1 },
  listTitle: { fontFamily: 'Outfit-Medium', fontSize: 14, color: '#0F172A', marginBottom: 2 },
  listSubtitle: { fontFamily: 'Outfit-Regular', fontSize: 12, color: '#64748B' },
  listDivider: { height: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: '#F1F5F9', marginVertical: 4, marginHorizontal: 8 },

  logoutBtn: { backgroundColor: '#D53939', borderRadius: 24, height: 52, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 40 },
  logoutBtnText: { fontFamily: 'Outfit-Bold', fontSize: 15, color: '#FFF' }
});
