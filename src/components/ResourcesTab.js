import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ResourcesTab({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resources coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  text: {
    color: "#1A1A1B",
    fontWeight: "500",
  },
});
