import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { mockDocuments } from '../../mocks/mockDocuments';

type Props = NativeStackScreenProps<MainStackParamList, 'DocumentsVault'>;

const FOLDER_ICONS: Record<string, string> = {
  kyc: '🪪',
  booking: '📋',
  invoice: '🧾',
  delivery: '📦',
  insurance: '🛡️',
};

export const DocumentsVaultScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <Header title="Documents Vault" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>
          All your car purchase documents, securely stored in one place.
        </Text>
        <View style={styles.grid}>
          {mockDocuments.folders.map((folder) => (
            <TouchableOpacity
              key={folder.id}
              style={styles.folderCard}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('DocumentFolder', {
                  folderId: folder.id,
                  folderName: folder.name,
                })
              }
            >
              <Text style={styles.folderIcon}>
                {FOLDER_ICONS[folder.id] || '📁'}
              </Text>
              <Text style={styles.folderName}>{folder.name}</Text>
              <Text style={styles.folderCount}>
                {folder.files.length} file{folder.files.length !== 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          ))}
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
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 20,
    lineHeight: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  folderCard: {
    width: '47%',
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  folderIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  folderName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  folderCount: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
