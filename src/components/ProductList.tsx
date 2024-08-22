import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { API_URL } from "@/providers/AuthProvider";
import { Link } from "expo-router";
import { CapitalizeFirstLetter } from "@/functions";
import CapitalizedText from "./CapitalizedText";
import HeadingText from "./HeadingText";
const ProductList = ({ products, title, id }) => {
  return (
    <View style={{ padding: 10 }}>
      <Link href={`/products?category=${id}`} key={Math.random()} asChild>
        <Pressable>
          <View style={styles.container}>
            <HeadingText text={title} />
            <FontAwesome name="angle-right" size={20} />
          </View>
        </Pressable>
      </Link>

      <FlatList
        data={products}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item, index }) => (
          <Link
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            href={`/products/${item._id}`}
            asChild
          >
            <Pressable key={item._id}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    shadowColor: "#000",
                    backgroundColor: "#fff",
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 1,
                    elevation: 5,
                  }}
                >
                  <Image
                    source={{ uri: `${API_URL}/${item.imageUrl}` }}
                    resizeMode="contain"
                    style={{
                      borderRadius: 50,

                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
                <CapitalizedText
                  style={{
                    paddingVertical: 10,
                    fontFamily: "Quicksand_600SemiBold",
                    fontSize: 16,
                    color: "#000000",
                  }}
                  text={item.name}
                />
                <Text
                  style={{
                    color: "#5A5A5A",
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 14,
                  }}
                >
                  {item.culturetypeId?.title}
                </Text>
              </View>
            </Pressable>
          </Link>
        )}
        contentContainerStyle={{ gap: 20 }}
        scrollEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productTitle: {
    fontWeight: "600",
    textAlign: "center",
  },
  category: {
    color: "#5A5A5A",
  },
});
