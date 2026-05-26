import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { mockDocuments } from '../../mocks/mockDocuments';
import { formatDate } from '../../utils/formatDate';

type Props = NativeStackScreenProps<MainStackParamList, 'DocumentFolder'>;

const FILE_TYPE_ICON: Record<string, string> = {
  pdf: '📄',
  jpg: '🖼️',
  jpeg: '🖼️',
  png: '🖼️',
};

export const DocumentFolderScreen: React.FC<Props> = ({ route, navigation }) => {
  const { folderId, folderName } = route.params;
  const folder = mockDocuments.folders.find((f) => f.id === folderId);
  const files = folder?.files ?? [];

  return (
    <ScreenWrapper>
      <Header title={folderName} />
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📂</Text>
            <Text style={styles.emptyTitle}>No Documents Yet</Text>
            <Text style={styles.emptySub}>
              Documents will appear here once uploaded during your order process.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const ext = item.name.split('.').pop()?.toLowerCase() ?? 'pdf';
          const icon = FILE_TYPE_ICON[ext] ?? '📄';
          return (
            <TouchableOpacity
              style={styles.fileRow}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('DocumentViewer', {
                  fileId: item.id,
                  name: item.name,
                  url: item.url,
                })
              }
            >
              <Text style={styles.fileIcon}>{icon}</Text>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.fileMeta}>
                  {item.size} · {formatDate(item.uploadedAt)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Download', `Downloading ${item.name}...`)
                }
              >
                <Text style={styles.downloadIcon}>⬇️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  fileIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  fileMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  downloadIcon: {
    fontSize: 20,
    marginLeft: 8,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
    padding: 24,
  },
  emptyIcon: {
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
    marginTop: 6,
    lineHeight: 18,
  },
});
