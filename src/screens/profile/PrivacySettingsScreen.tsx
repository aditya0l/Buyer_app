import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Switch, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';

type Props = NativeStackScreenProps<MainStackParamList, 'PrivacySettings'>;

export const PrivacySettingsScreen: React.FC<Props> = () => {
  const [showPhoneBeforeWinner, setShowPhoneBeforeWinner] = useState(false);
  const [showCityToAll, setShowCityToAll] = useState(true);
  const [allowDealerContact, setAllowDealerContact] = useState(false);

  return (
    <ScreenWrapper>
      <Header title="Privacy & Visibility" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionDesc}>
          Control what dealer partners can see before and after you select a winner.
        </Text>

        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Show phone before winner selected</Text>
              <Text style={styles.settingDesc}>
                Dealers can see your phone number while the bid room is active.
              </Text>
            </View>
            <Switch
              value={showPhoneBeforeWinner}
              onValueChange={setShowPhoneBeforeWinner}
              trackColor={{ false: colors.borderLight, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Show city to all dealers</Text>
              <Text style={styles.settingDesc}>
                Dealers see your city to calculate local pricing and RTO.
              </Text>
            </View>
            <Switch
              value={showCityToAll}
              onValueChange={setShowCityToAll}
              trackColor={{ false: colors.borderLight, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Allow direct dealer contact</Text>
              <Text style={styles.settingDesc}>
                Allow winning dealer to contact you directly after order is confirmed.
              </Text>
            </View>
            <Switch
              value={allowDealerContact}
              onValueChange={setAllowDealerContact}
              trackColor={{ false: colors.borderLight, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>🔒 CarBounty Privacy Guarantee</Text>
          <Text style={styles.noteText}>
            Your personal data is never sold to third parties. Dealers only receive the minimum
            information needed to compete and fulfil your order.
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
  sectionDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 20,
  },
  settingsCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  settingLeft: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginHorizontal: 16,
  },
  noteCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: 16,
  },
  noteTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
  },
  noteText: {
    fontSize: 12,
    color: colors.primary,
    lineHeight: 17,
    fontWeight: '500',
  },
});
