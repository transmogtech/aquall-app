import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, Stack, useRouter, Link } from "expo-router";
import Colors from "@constants/Colors";
import { useState } from "react";
import Button from "@/components/Button";
import products from "@assets/data/products";
import { useCart } from "@/providers/CartProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CartItem } from "@/types";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
import { CapitalizeFirstLetter } from "@/functions";

export const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const productDetails = () => {
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const updateQuantity = (val: number) => {
    const qty = quantity + val;
    if (qty < 1) {
      return;
    }
    setQuantity(qty);
  };
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);

        setProduct(response.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);
  // const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, quantity);
    router.push("/cart");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: CapitalizeFirstLetter(product.name) }} />
      <ScrollView>
        <Image
          source={{ uri: `${API_URL}/${product.imageUrl}` || defaultImage }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <View style={styles.item}>
            <Text style={styles.price}>
              <FontAwesome name="rupee" size={18} />
              {product.price}
            </Text>
            <Text className="text-gray-400" style={styles.category}>
              Delivery Fees
            </Text>
          </View>
          <View style={styles.item}>
            <Text className="items-end" style={styles.rating}>
              <AntDesign
                name="star"
                size={12}
                color={Colors.light.ratingColor}
              />
              <AntDesign
                name="star"
                size={12}
                color={Colors.light.ratingColor}
              />
              <AntDesign
                name="star"
                size={12}
                color={Colors.light.ratingColor}
              />
              <AntDesign
                name="star"
                size={12}
                color={Colors.light.ratingColor}
              />
              <AntDesign
                name="star"
                size={12}
                color={Colors.light.ratingColor}
              />
            </Text>
            <View style={styles.ratingWrapper}>
              <Text
                style={{ fontFamily: "Quicksand_600SemiBold", fontSize: 16 }}
              >
                ₹ 40
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.quantityWrapper}>
          <View style={{ flex: 1 }}>
            <Text
              style={styles.title}
              className="justify-center align-middle font-bold]"
            >
              Quantity
            </Text>
          </View>
          <View style={styles.quantitySelector}>
            <FontAwesome
              onPress={() => updateQuantity(-1)}
              name="minus"
              size={20}
              color="gray"
              style={{ padding: 5 }}
            />

            <Text style={styles.quantity}>{quantity}</Text>
            <FontAwesome
              onPress={() => updateQuantity(1)}
              name="plus"
              size={20}
              color="gray"
              style={{ padding: 5 }}
            />
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.title}>Description</Text>

          <Text style={styles.description}>{product.description}</Text>
        </View>

        <Button text="Add to cart" onPress={addToCart} />
        <Link
          className="bg-gray-300 hover:bg-gray-400  py-2 px-4 rounded text-center"
          style={{ fontFamily: "Quicksand_600SemiBold" }}
          href={`/products/request?productId=${product._id}`}
        >
          Quote Request
        </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    alignItems: "flex-start", // if you want to fill rows left to right
    padding: 20,
    marginVertical: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  item: {
    width: "50%", // is 50% of container width
    paddingVertical: 20,
  },
  quantityWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    alignItems: "flex-start", // if you want to fill rows left to right
    padding: 20,
    marginVertical: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  descriptionWrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  container: {
    padding: 10,
    flex: 1,
    borderRadius: 10,
    width: "100%",
  },
  title: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 20,
    color: Colors.light.blueColor,
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  price: {
    color: Colors.light.blueColor,
    fontSize: 24,
    fontFamily: "Quicksand_600SemiBold",
  },
  rating: {
    textAlign: "right",
  },
  category: {
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: Colors.light.background,
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
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-end",
    paddingTop: 10,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  description: { fontFamily: "Quicksand_500Medium", fontSize: 16 },
});

export default productDetails;
