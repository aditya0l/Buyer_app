import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/common/Card';
import { mockDocuments } from '../../mocks/mockDocuments';

export const DocumentListScreen: React.FC = () => {
  const documents = mockDocuments;

  const handleViewDocument = (docName: string) => {
    Alert.alert(
      'View Document 📁',
      `Opening secure PDF link for ${docName}. Ensure you have a PDF viewer configured.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <Header title="My Documents" />
      
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} onPress={() => handleViewDocument(item.name)}>
            <Card style={styles.docCard}>
              <View style={styles.docRow}>
                <View style={styles.docLeft}>
                  <Text style={styles.docIcon}>📄</Text>
                  <View style={styles.docDetails}>
                    <Text style={styles.docName}>{item.name}</Text>
                    <Text style={styles.docMeta}>
                      {item.type} • {item.size} • Uploaded {item.uploadedDate}
                    </Text>
                  </View>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Verified</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📁</Text>
            <Text style={styles.emptyTitle}>No Documents Uploaded</Text>
            <Text style={styles.emptySub}>
              Uploaded purchase invoices, booking receipts, or KYC logs will appear here.
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  docCard: {
    marginBottom: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  docIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  docDetails: {
    flex: 1,
  },
  docName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  docMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: colors.liveLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    color: colors.live,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 48,
  },
  emptyEmoji: {
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
    marginTop: 4,
  },
});
