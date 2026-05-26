import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';

type Props = NativeStackScreenProps<MainStackParamList, 'RaiseTicket'>;

const CATEGORIES = [
  'Dealer Issue',
  'Wallet & Credits',
  'Order / Delivery',
  'Refund Request',
  'App / Technical',
  'Other',
];

export const RaiseTicketScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert('Missing Category', 'Please select a category for your issue.');
      return;
    }
    if (description.trim().length < 20) {
      Alert.alert('Description too short', 'Please describe your issue in at least 20 characters.');
      return;
    }
    Alert.alert(
      'Ticket Raised ✅',
      'Your support ticket has been submitted. Our team will respond within 24 hours.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScreenWrapper>
      <Header title="Raise a Ticket" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Issue Category *</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Describe Your Issue *</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={6}
          placeholder="Describe what happened, when it happened, and what you expected..."
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
          maxLength={500}
        />
        <Text style={styles.charCount}>{description.length}/500</Text>

        <View style={styles.attachHint}>
          <Text style={styles.attachIcon}>📎</Text>
          <Text style={styles.attachText}>
            Screenshot attachment — available in next release
          </Text>
        </View>

        <Button
          title="Submit Ticket"
          onPress={handleSubmit}
          style={styles.submitBtn}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
    marginTop: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.cardBg,
  },
  categoryChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryChipTextSelected: {
    color: colors.primary,
  },
  textArea: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    padding: 14,
    fontSize: 14,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    minHeight: 120,
  },
  charCount: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
  attachHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    padding: 12,
    marginTop: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
  },
  attachIcon: {
    fontSize: 18,
  },
  attachText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  submitBtn: {
    marginTop: 24,
    height: 50,
  },
});
