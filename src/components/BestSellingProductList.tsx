import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const BestSellingProductList = ({ products, title }) => {
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
            <Image source={item.image} resizeMode="contain" />
            <Text style={styles.productTitle}>{item.title}</Text>
            <View style={styles.container2}>
              <Text style={styles.text}>Shop Now</Text>
              <Text style={styles.text}>
                <FontAwesome name="rupee" size={12} /> {item.price}
              </Text>
            </View>
          </View>
        )}
        numColumns={2}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ gap: 20 }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default BestSellingProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 2,
    paddingHorizontal: 20,
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
  text: {
    fontWeight: "bold",
    color: Colors.light.blueColor,
  },
});
