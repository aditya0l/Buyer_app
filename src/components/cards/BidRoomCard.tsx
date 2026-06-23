import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Lock, ArrowRight, Zap, Check, MapPin } from 'lucide-react-native';

const formatPrice = (value: number) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  return `₹${value}`;
};

const formatTime = (secs: number) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} Min`;
};

export const BidRoomCard = ({ room, onPress }: any) => {
  const s = room.status;

  const Badge = () => {
    let bg = '#E5E7EB', text = '#FFF', label = room.status;
    if (s === 'LIVE') { bg = '#6AB46A'; label = '● Live'; }
    else if (s === 'WAITING') { bg = '#FF9441'; label = '● Waiting'; }
    else if (s === 'CLOSED') { bg = '#727687'; label = '● Closed'; }
    else if (s === 'INSTANT') { bg = '#FFC100'; label = '⚡ Instant'; }
    else if (s === 'WON') { bg = '#3B82F6'; label = '● Won'; }

    return (
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={[styles.badgeText, { color: text }]}>{label}</Text>
      </View>
    );
  };

  const TopDetails = () => {
    const isDealerRow = s === 'INSTANT' || s === 'WON';
    return (
      <View style={styles.topRow}>
        <View style={styles.imgContainer}>
          <Badge />
          <Image source={{ uri: room.image }} style={styles.carImg} />
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.carName}>{room.carName}</Text>
          <View style={styles.specsRow}>
            {isDealerRow ? (
              <Text style={styles.specTextBlue}>{room.fuel} • {room.transmission} • {room.dealerName} • </Text>
            ) : (
              <Text style={styles.specTextBlue}>{room.fuel} • {room.transmission} • {formatPrice(room.budget)} Budget • </Text>
            )}
            {isDealerRow ? (
              <View style={styles.colorPill}>
                <View style={[styles.pillDot, { backgroundColor: room.color.toLowerCase() }]} />
                <Text style={styles.pillText}>{room.color}</Text>
              </View>
            ) : (
              <View style={[styles.colorDot, { backgroundColor: room.color.toLowerCase() }]} />
            )}
          </View>
          <View style={styles.locRow}>
            <MapPin fill="#64748B" color="#64748B" size={14} />
            <Text style={styles.locText}>{room.city}</Text>
          </View>
        </View>
      </View>
    );
  };

  const MiddleStats = () => {
    let stats: any[] = [];
    if (s === 'LIVE') {
      stats = [
        { val: room.dealersCount, lbl: 'Dealers' },
        { val: formatPrice(room.bestBid), lbl: 'Best Bid' },
        { val: formatTime(room.timeRemainingSeconds), lbl: 'Remaining', valCol: '#FF9441' },
        { val: formatPrice(room.savings), lbl: 'Savings', valCol: '#207320' }
      ];
    } else if (s === 'WAITING') {
      stats = [
        { val: room.dealersCount, lbl: 'Dealers' },
        { val: '--', lbl: 'Best Bid' },
        { val: formatTime(room.timeRemainingSeconds), lbl: 'Starts In', valCol: '#FF9441' },
        { val: '--', lbl: 'Savings' }
      ];
    } else if (s === 'CLOSED') {
      stats = [
        { val: room.dealersCount, lbl: 'Dealers' },
        { val: formatPrice(room.bestBid), lbl: 'Best Bid' },
        { val: '—', lbl: 'Starts In' },
        { val: formatPrice(room.savings), lbl: 'Savings' }
      ];
    } else if (s === 'INSTANT') {
      stats = [
        { val: formatPrice(room.paidAmount || 10000), lbl: 'Paid' },
        { val: formatPrice(room.bestBid), lbl: 'Locked Price', valCol: '#207320' },
        { val: formatPrice(room.savings), lbl: 'Saved', valCol: '#207320' },
        { val: room.dealerRating, lbl: 'Dealer', icon: '⭐' }
      ];
    } else if (s === 'WON') {
      stats = [
        { val: room.dealersCount, lbl: 'Dealers' },
        { val: formatPrice(room.bestBid), lbl: 'Final Price', valCol: '#207320' },
        { val: formatPrice(room.savings), lbl: 'Saved', valCol: '#207320' },
        { val: room.dealerRating, lbl: 'Dealer', icon: '⭐' }
      ];
    }

    return (
      <View style={styles.statsRow}>
        {stats.map((st, i) => (
          <React.Fragment key={i}>
            <View style={styles.statCol}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.statVal, { color: st.valCol || '#0F172A' }]}>{st.val}</Text>
                {st.icon && <Text style={{fontSize: 10, marginLeft: 2}}>{st.icon}</Text>}
              </View>
              <Text style={styles.statLbl}>{st.lbl}</Text>
            </View>
            {i < stats.length - 1 && <View style={styles.statDiv} />}
          </React.Fragment>
        ))}
      </View>
    );
  };

  const BottomAction = () => {
    if (s === 'LIVE') {
      return (
        <View style={styles.bottomArea}>
          <View style={styles.bottomTextRow}>
            <Text style={[styles.botLeftText, { color: '#2563EB' }]}>{room.dealersCount} Active Dealers Bidding</Text>
            <Text style={styles.botRightText}>Started today</Text>
          </View>
          <View style={styles.actionBoxBlue}>
            <View style={styles.actionImgPlaceholder} />
            <View style={{flex:1, marginLeft:10}}>
              <Text style={styles.actionTitle}>Free Test Drive Available</Text>
              <Text style={styles.actionSub}>Unlocks after WhatsApp group is created</Text>
            </View>
            <Lock size={16} color="#2563EB" />
          </View>
        </View>
      );
    }
    if (s === 'WAITING') {
      return (
        <View style={styles.bottomArea}>
          <View style={styles.bottomTextRow}>
            <Text style={[styles.botLeftText, { color: '#FF9441' }]}>Room Starts Soon...</Text>
            <Text style={styles.botRightText}>Posted Today</Text>
          </View>
        </View>
      );
    }
    if (s === 'CLOSED') {
      return (
        <View style={styles.bottomArea}>
          <View style={styles.bottomTextRow}>
            <Text style={[styles.botLeftText, { color: '#64748B' }]}>Expired • Not Accepted</Text>
            <Text style={styles.botRightText}>{room.closedDate || 'Apr 28, 2026'}</Text>
          </View>
        </View>
      );
    }
    if (s === 'INSTANT') {
      return (
        <View style={styles.bottomArea}>
          <View style={styles.bottomTextRow}>
            <Text style={[styles.botLeftText, { color: '#FF9441' }]}>⚡ Advance Paid • WhatsApp Group Pending</Text>
            <Text style={styles.botRightText}>Today</Text>
          </View>
          <View style={styles.actionBoxOrange}>
            <View style={{flex:1}}>
              <Text style={styles.actionTitleOrange}>{room.orderId || '#CB-2026-04872'}</Text>
              <Text style={styles.actionSubOrange}>Booking confirmed • Group being set up</Text>
            </View>
            <View style={styles.trackBtn}>
              <Text style={styles.trackBtnText}>Track</Text>
              <ArrowRight size={14} color="#FF9441" style={{marginLeft: 4}} />
            </View>
          </View>
        </View>
      );
    }
    if (s === 'WON') {
      return (
        <View style={styles.bottomArea}>
          <View style={styles.bottomTextRow}>
            <Text style={[styles.botLeftText, { color: '#207320' }]}>Deal Closed • Token Refunded ✔</Text>
            <Text style={styles.botRightText}>{room.closedDate || 'Started today'}</Text>
          </View>
          <View style={styles.actionBoxBlue}>
             <View style={styles.actionImgPlaceholder} />
             <View style={{flex:1, marginLeft:10}}>
               <Text style={styles.actionTitle}>Schedule Your Test Drive</Text>
               <Text style={styles.actionSub}>Free • {room.dealerName} • Tap to book</Text>
             </View>
             <View style={styles.bookBtn}>
               <Text style={styles.bookBtnText}>Book</Text>
               <ArrowRight size={14} color="#2563EB" style={{marginLeft: 4}} />
             </View>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <TopDetails />
      <MiddleStats />
      <BottomAction />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  topRow: { flexDirection: 'row', marginBottom: 12 },
  imgContainer: { width: 100, height: 70, position: 'relative' },
  carImg: { width: '100%', height: '100%', resizeMode: 'contain', marginTop: 10 },
  badge: { 
    position: 'absolute', 
    top: -6, 
    left: -6, 
    zIndex: 10, 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 2,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  badgeText: { fontSize: 10, fontFamily: 'Outfit-Bold' },
  detailsBox: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  carName: { fontSize: 18, color: '#001021', marginBottom: 6, fontFamily: 'Outfit-Bold' },
  specsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  specTextBlue: { fontSize: 13, color: '#2563EB', fontFamily: 'Outfit-Medium' },
  colorDot: { width: 14, height: 14, borderRadius: 7 },
  colorPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563EB', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  pillDot: { width: 10, height: 10, borderRadius: 5, marginRight: 4 },
  pillText: { color: '#FFF', fontSize: 12, fontFamily: 'Outfit-Medium' },
  locRow: { flexDirection: 'row', alignItems: 'center' },
  locText: { fontSize: 15, color: '#64748B', fontFamily: 'Outfit-Medium', marginLeft: 4 },

  statsRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', borderRadius: 8, paddingVertical: 10, marginBottom: 12 },
  statCol: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 13, marginBottom: 2, fontFamily: 'Outfit-Bold' },
  statLbl: { fontSize: 10, color: '#94A3B8', fontFamily: 'Outfit-Medium' },
  statDiv: { width: 1, backgroundColor: '#E2E8F0' },

  bottomArea: { paddingTop: 4 },
  bottomTextRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  botLeftText: { fontSize: 12, fontFamily: 'Outfit-Medium' },
  botRightText: { fontSize: 11, color: '#94A3B8', fontFamily: 'Outfit-Regular' },

  actionBoxBlue: { flexDirection: 'row', backgroundColor: '#EFF6FF', borderRadius: 8, padding: 10, marginTop: 10, alignItems: 'center' },
  actionBoxOrange: { flexDirection: 'row', backgroundColor: '#FF94410F', borderRadius: 8, padding: 12, marginTop: 10, alignItems: 'center', borderWidth: 1, borderColor: '#FF944133' },
  actionImgPlaceholder: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#DBEAFE' },
  actionTitle: { fontSize: 12, color: '#0F172A', fontFamily: 'Outfit-Bold' },
  actionSub: { fontSize: 10, color: '#64748B', fontFamily: 'Outfit-Regular' },
  actionTitleOrange: { fontSize: 16, color: '#00162E', fontFamily: 'Outfit-Bold' },
  actionSubOrange: { fontSize: 13, color: '#808B97', marginTop: 4, fontFamily: 'Outfit-Medium' },
  
  trackBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF944133', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#FF9441' },
  trackBtnText: { fontSize: 14, color: '#FF9441', fontFamily: 'Outfit-Medium' },
  
  bookBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DBEAFE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#BFDBFE' },
  bookBtnText: { fontSize: 12, color: '#2563EB', fontFamily: 'Outfit-Bold' },
});
