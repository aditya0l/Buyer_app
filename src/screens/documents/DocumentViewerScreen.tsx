import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';

type Props = NativeStackScreenProps<MainStackParamList, 'DocumentViewer'>;

export const DocumentViewerScreen: React.FC<Props> = ({ route }) => {
  const { name, url } = route.params;

  const handleOpenExternal = async () => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open this file. Please try downloading it.');
    }
  };

  const handleShare = () => {
    Alert.alert('Share', `Sharing ${name}...`);
  };

  return (
    <ScreenWrapper>
      <Header
        title={name}
        rightAction={
          <TouchableOpacity onPress={handleShare}>
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <View style={styles.previewBox}>
          <Text style={styles.previewIcon}>📄</Text>
          <Text style={styles.previewTitle}>{name}</Text>
          <Text style={styles.previewSub}>
            Preview not available in app. Open externally to view this document.
          </Text>
        </View>
        <TouchableOpacity style={styles.openBtn} activeOpacity={0.8} onPress={handleOpenExternal}>
          <Text style={styles.openBtnText}>Open in Browser</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.downloadBtn}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Download', `Downloading ${name}...`)}
        >
          <Text style={styles.downloadBtnText}>⬇️  Download</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBox: {
    alignItems: 'center',
    marginBottom: 40,
  },
  previewIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  previewSub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  openBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  openBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  downloadBtn: {
    width: '100%',
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  downloadBtnText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  actionIcon: {
    fontSize: 20,
  },
});
