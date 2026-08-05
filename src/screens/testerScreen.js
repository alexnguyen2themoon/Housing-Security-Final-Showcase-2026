import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import { useHousingResources } from "../hooks/useHousingResources";

export default function TestScreen() {
  const { resources, loading, error, refetch } = useHousingResources();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{ marginTop: 10 }}>Fetching from Supabase...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red", fontWeight: "bold" }}>Error fetching data:</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Database Test Screen</Text>
      <Text style={styles.subHeader}>Total Locations Found: {resources?.length || 0}</Text>

      <FlatList
        data={resources}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={refetch}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>📍 {item.latitude}, {item.longitude}</Text>
            <Text style={styles.text}>🏠 {item.address}</Text>
            
            <View style={styles.reviewsContainer}>
              <Text style={styles.reviewHeader}>
                Reviews connected: {item.resource_reviews?.length || 0}
              </Text>
              
              {/* Map through the joined reviews table */}
              {item.resource_reviews && item.resource_reviews.length > 0 ? (
                item.resource_reviews.map((review) => (
                  <View key={review.id} style={styles.reviewItem}>
                    <Text>⭐ {review.rating}/5 - {review.reviewer_name}</Text>
                    <Text style={{ fontStyle: "italic" }}>"{review.comment}"</Text>
                  </View>
                ))
              ) : (
                <Text style={{ fontStyle: "italic", color: "gray" }}>No reviews yet.</Text>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subHeader: {
    textAlign: "center",
    marginBottom: 10,
    color: "#666",
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  reviewsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  reviewHeader: {
    fontWeight: "600",
    marginBottom: 6,
  },
  reviewItem: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
});