import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { API_URL } from "@/providers/AuthProvider";

const ProductList = ({ products, title }) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <FontAwesome name="angle-right" size={20} />
      </View>

      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
          >
            <Image
              source={{ uri: `${API_URL}/${item.imageUrl}` }}
              resizeMode="contain"
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.productTitle}>{item.name}</Text>
            <Text style={styles.category}>{item.culturetypeId?.title}</Text>
          </View>
        )}
        numColumns={3}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ gap: 20 }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productTitle: {
    fontWeight: "600",
    textAlign: "center",
    padding: 8,
  },
  category: {
    color: "#5A5A5A",
  },
});
