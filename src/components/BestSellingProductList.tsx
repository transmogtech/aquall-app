import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { API_URL } from "@/providers/AuthProvider";
import { Link } from "expo-router";
import HeadingText from "./HeadingText";
import { CapitalizeFirstLetter } from "@/functions";

const BestSellingProductList = ({ products, title }) => {
  return (
    <View>
      <Link href={`/products`} key={Math.random()} asChild>
        <Pressable>
          <View style={styles.container}>
            <HeadingText text={title} />
            <FontAwesome name="angle-right" size={20} />
          </View>
        </Pressable>
      </Link>
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
            <Link href={`/products/${item._id}`} key={Math.random()} asChild>
              <Pressable>
                <Image
                  source={{ uri: `${API_URL}/${item.imageUrl}` }}
                  resizeMode="contain"
                  style={{
                    width: 170,
                    height: 140,
                    borderRadius: 20,
                    backgroundColor: Colors.light.background,
                    alignContent: "center",
                  }}
                />
                <Text style={styles.productTitle}>
                  {CapitalizeFirstLetter(item.name)}
                </Text>
                <View style={styles.container2}>
                  <Text style={styles.text}>Shop Now</Text>
                  <Text style={styles.text}>
                    <FontAwesome name="rupee" size={12} /> {item.price}
                  </Text>
                </View>
              </Pressable>
            </Link>
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
    padding: 10,
    fontFamily: "Quicksand_400Regular",
  },
  container2: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    fontFamily: "Quicksand_400Regular",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productTitle: {
    fontWeight: "600",
    textAlign: "center",
    padding: 8,
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
  },
  text: {
    color: Colors.light.blueColor,
    fontFamily: "Quicksand_600SemiBold",
  },
});
