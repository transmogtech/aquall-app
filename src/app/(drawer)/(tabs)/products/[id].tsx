import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
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
        console.log(error);
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
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView>
        <Image
          source={{ uri: `${API_URL}/${product.imageUrl}` || defaultImage }}
          resizeMode="cover"
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
              <FontAwesome name="rupee" size={18} />
              <Text>40</Text>
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
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            />

            <Text style={styles.quantity}>{quantity}</Text>
            <FontAwesome
              onPress={() => updateQuantity(1)}
              name="plus"
              size={20}
              color={Colors.light.background}
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                color: Colors.light.background,
                backgroundColor: Colors.light.blueColor,
              }}
            />
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>- Clean Products</Text>
          <Text style={styles.description}>- 100% Original quality</Text>
          <Text style={styles.description}>
            - Bought items cannot be refunded
          </Text>
          <Text style={styles.description}>- Available in bulk</Text>
        </View>
      </ScrollView>
      <Button text="Add to cart" onPress={addToCart} />
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
  },
  descriptionWrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.light.background,
    padding: 20,
    marginVertical: 10,
  },
  container: {
    padding: 10,
    flex: 1,
    borderRadius: 10,
    width: "100%",
  },
  title: {
    fontSize: 20,
    color: Colors.light.blueColor,
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
  rating: {
    textAlign: "right",
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
  description: {},
});

export default productDetails;
