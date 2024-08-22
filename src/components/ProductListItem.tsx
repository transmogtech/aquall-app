import { StyleSheet, Image, Pressable, Text, View } from "react-native";

import Colors from "@constants/Colors";
import { Product } from "@/types";
import { Link, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { API_URL } from "@/providers/AuthProvider";
import React from "react";
import { CapitalizeFirstLetter } from "@/functions";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCart } from "@/providers/CartProvider";

type ProductListItemProps = {
  product: Product;
};

export const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
const ProductListItem = ({ product }: ProductListItemProps) => {
  const { addItem } = useCart();

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, 1);
  };
  const GoToProduct = (id) => {
    router.push(`/products/${id}`);
  };
  // // console.log(product);
  // return false;
  return (
    <View style={styles.container} key={product._id}>
      {/* // <Link href={`/products/${product._id}`} key={product._id} asChild>
    //   <Pressable > */}

      <View style={styles.ratingWrapper}>
        <AntDesign name="star" size={18} color="#FFC107" />
        <Text style={styles.rating}> {product.rating}</Text>
      </View>
      <View style={styles.productCard}>
        <Link href={`/products/${product._id}`} key={product._id} asChild>
          <Pressable>
            <Image
              source={{ uri: `${API_URL}/${product.imageUrl}` || defaultImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </Pressable>
        </Link>

        <View style={styles.infoContainer}>
          <View>
            <Link href={`/products/${product._id}`} key={product._id} asChild>
              <Pressable>
                <Text style={styles.title}>
                  {CapitalizeFirstLetter(product.name)}
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text
              style={{ color: "black", fontFamily: "Quicksand_600SemiBold" }}
            >
              {product.categoryId?.title}
            </Text>
            <Text style={styles.price}>₹ {product.price}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity onPress={addToCart}>
              <FontAwesome5
                name="shopping-cart"
                size={24}
                color={Colors.light.blueColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* //   </Pressable>
    // </Link> */}
    </View>
  );
};
export default ProductListItem;

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    // if you want to fill rows left to right
  },
  productCard: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },

  container: {
    padding: 10,
    flex: 1,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: Colors.light.blueColor,
    fontFamily: "Quicksand_700Bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  price: {
    color: Colors.light.text,
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  rating: {
    color: Colors.light.tint,
  },
  category: {
    fontSize: 16,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  cartWrapper: { textAlign: "right", alignItems: "flex-end" },
  cart: {
    backgroundColor: Colors.light.blueColor,
    color: Colors.light.background,
    padding: 5,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingWrapper: {
    backgroundColor: Colors.light.greyColor,
    borderRadius: 50,
    flex: 1,
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
});
