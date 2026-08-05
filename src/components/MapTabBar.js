import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../assets/themes/colors";

const TABS = ["Resources", "Trending", "Footsteps", "Visited", "Popular", "Favorites", "Restaurants", "Cafes", "Parks", "Shops"];

const TAB_ICONS = {
  Trending: "trending-up-outline",
  Footsteps: "footsteps-outline",
  Visited: "checkmark-circle-outline",
  Popular: "flame-outline",
  Favorites: "heart-outline",
  Restaurants: "restaurant-outline",
  Cafes: "cafe-outline",
  Parks: "leaf-outline",
  Shops: "bag-handle-outline",
};

export default function MapTabBar({ activeTab, onTabChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, styles.shadow, isActive && styles.tabActive]}
            onPress={() => onTabChange(tab)}
          >
            {tab === "Resources" ? (
              <Image
                source={require("../../assets/snapchat/Group 68.png")}
                style={[
                  styles.tabIcon,
                  styles.resourcesIcon,
                  isActive && styles.resourcesIconActive,
                ]}
                resizeMode="contain"
              />
            ) : (
              <Ionicons
                name={TAB_ICONS[tab]}
                size={16}
                color={isActive ? "#fff" : colors.primary}
                style={styles.tabIcon}
              />
            )}
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  tabActive: {
    backgroundColor: colors.secondary,
  },
  tabIcon: {
    marginRight: 6,
  },
  resourcesIcon: {
    width: 16,
    height: 16,
    tintColor: colors.primary,
  },
  resourcesIconActive: {
    tintColor: "#fff",
  },
  tabText: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 13,
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 4,
  },
});
