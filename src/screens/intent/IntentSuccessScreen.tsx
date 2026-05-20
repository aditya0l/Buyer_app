import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { Button } from '../../components/common/Button';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';

type Props = NativeStackScreenProps<MainStackParamList, 'IntentSuccess'>;

export const IntentSuccessScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId } = route.params;

  const handleGoToRoom = () => {
    // Navigate straight to the created bid room details page
    navigation.replace('BidRoom', { roomId });
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.successEmoji}>⚡</Text>
          <Text style={styles.title}>Bid Room is Live!</Text>
          <Text style={styles.subtitle}>
            Certified brand dealers in your search radius have been notified and are calculating quotes.
          </Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>What happens next?</Text>
            <Text style={styles.infoStep}>1. Bids will arrive within 30 minutes.</Text>
            <Text style={styles.infoStep}>2. Dealers will compete to offer the lowest on-road price.</Text>
            <Text style={styles.infoStep}>3. You can review perks, pin quotes, and select the winner.</Text>
          </View>
        </View>

        <Button
          title="Go to Live Bid Room"
          onPress={handleGoToRoom}
          style={styles.ctaButton}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.cardBg,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successEmoji: {
    fontSize: 72,
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: radius.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 10,
  },
  infoStep: {
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: 6,
    lineHeight: 18,
    fontWeight: '500',
  },
  ctaButton: {
    height: 48,
    marginBottom: 16,
  },
});
