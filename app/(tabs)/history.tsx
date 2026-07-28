import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../Context/AuthContext";
import { getHistory } from "../../api/historyApi";

import { useAppTheme } from "@/hooks/useAppTheme";
import { useFocusEffect } from "expo-router";
import AlertCard, { AlertEntry } from "../../components/history/AlertCard";
import AppHeader from "../../components/ui/AppHeader";

export default function History() {
  const { token } = useAuth();
  const theme = useAppTheme();

  const [history, setHistory] = useState<AlertEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!token) {
      setHistory([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await getHistory(token);
      const formatted = (response.history ?? []).map((item: any) => ({
        id: item._id,
        type: "sos",
        title: "SOS Alert",
        date: new Date(item.createdAt).toLocaleDateString(),
        detail: item.googleMapsUrl,
        status: "Sent Successfully",
      }));

      setHistory(formatted);
    } catch (error) {
      console.log("History Error:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
      return undefined;
    }, [fetchHistory]),
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <AppHeader showSettings={false} />
        <ActivityIndicator size="large" color="#0F5D50" />
        <Text style={{ marginTop: 10 }}>Loading history...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <AppHeader showSettings={false} />

      <View style={styles.titleBlock}>
        <Text style={[styles.title, { color: theme.text }]}>Alert History</Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AlertCard item={item} />}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
          paddingTop: 4,
        }}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No alert history found.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleBlock: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
