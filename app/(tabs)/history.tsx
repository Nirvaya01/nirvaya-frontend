import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { useAuth } from "../../Context/AuthContext";
import { getHistory } from "../../api/historyApi";

import { router } from "expo-router";
import AlertCard, { AlertEntry } from "../../components/history/AlertCard";
import AppHeader from "../../components/ui/AppHeader";

export default function History() {
  const { token } = useAuth();
  
  const [history, setHistory] = useState<AlertEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  console.log("History useEffect running");

  const fetchHistory = async () => {
    try {
      console.log("Token:", token);

      const response = await getHistory(token!);

      console.log("History response:", response);

      const formatted = response.history.map((item:any)=>({
        id:item._id,
        type:"sos",
        title:"SOS Alert",
        date:new Date(item.createdAt).toLocaleDateString(),
        detail:item.googleMapsUrl,
        status:"Sent Successfully"
      }));

      setHistory(formatted);

    } catch(error){
      console.log("History Error:", error);
    } finally {
      setLoading(false);
    }
  };
  if(token){
    fetchHistory();
  }

}, [token]);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <AppHeader
  onSettingsPress={() => router.push("/settings")}
/>
        <ActivityIndicator size="large" color="#0F5D50" />
        <Text style={{ marginTop: 10 }}>Loading history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
  
/>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>Alert History</Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AlertCard item={item} />}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No alert history found.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9ff",
  },

  titleBlock: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0d1c2f",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "gray",
    fontSize: 16,
  },
});