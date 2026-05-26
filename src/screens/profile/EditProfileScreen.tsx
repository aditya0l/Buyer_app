import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../../components/common/Avatar';

type Props = NativeStackScreenProps<MainStackParamList, 'EditProfile'>;

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user, setCityAndRadius } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [city, setCity] = useState(user?.city ?? '');
  const [radius_, setRadius_] = useState(String(user?.searchRadius ?? '25'));

  const handleSave = () => {
    if (!city.trim()) {
      Alert.alert('Missing City', 'Please enter your city.');
      return;
    }
    const r = parseInt(radius_, 10);
    if (isNaN(r) || r < 5 || r > 200) {
      Alert.alert('Invalid Radius', 'Search radius must be between 5 and 200 km.');
      return;
    }
    setCityAndRadius(city.trim(), r);
    Alert.alert('Profile Updated', 'Your profile has been saved.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScreenWrapper>
      <Header title="Edit Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <Avatar name={name || 'User'} sourceUrl={user?.avatarUrl} size={72} />
          <Text style={styles.avatarHint}>Tap to change photo (coming soon)</Text>
        </View>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.disabledInput}>
          <Text style={styles.disabledText}>+91 {user?.phone ?? '—'}</Text>
          <Text style={styles.disabledNote}>Cannot be changed</Text>
        </View>

        <Text style={styles.label}>City / Region</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="e.g. Delhi NCR"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Search Radius (km)</Text>
        <TextInput
          style={styles.input}
          value={radius_}
          onChangeText={setRadius_}
          placeholder="25"
          placeholderTextColor={colors.textSecondary}
          keyboardType="number-pad"
        />
        <Text style={styles.radiusHint}>
          Dealers within this radius of your city will be included in bid rooms.
        </Text>

        <Button title="Save Changes" onPress={handleSave} style={styles.saveBtn} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarHint: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 6,
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    padding: 14,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  disabledInput: {
    backgroundColor: colors.borderLight,
    borderRadius: radius.md,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabledText: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  disabledNote: {
    fontSize: 10,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  radiusHint: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 15,
  },
  saveBtn: {
    marginTop: 28,
    height: 50,
  },
});
