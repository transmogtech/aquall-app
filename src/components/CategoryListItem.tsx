import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";

import Colors from "@constants/Colors";
import React from "react";

const CategoryListItem = ({ category, activeTab, filterProducts }) => {
  return (
    <View style={[styles.tab, activeTab === category.id && styles.activeTab]}>
      <TouchableOpacity
        onPress={() => filterProducts(category.id)}
        key={category.id}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === category.id && styles.activeTabText,
          ]}
        >
          {category.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default CategoryListItem;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    backgroundColor: Colors.light.background,
    borderRadius: 50,
  },
  activeTab: {
    backgroundColor: Colors.light.blueColor,
  },
  activeTabText: {
    color: Colors.light.background,
  },
  tabText: {
    fontSize: 14,
    paddingVertical: 10,
  },
});
