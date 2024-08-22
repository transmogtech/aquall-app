import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { CartItem } from "../types";
import { Link } from "expo-router";
import { defaultImage } from "./ProductListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "@/providers/CartProvider";
import { API_URL } from "@/providers/AuthProvider";
import { CapitalizeFirstLetter } from "@/functions";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${API_URL}/${cartItem.product.imageUrl}` || defaultImage,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          {CapitalizeFirstLetter(cartItem.product.name)}
        </Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            ₹ {cartItem.product.price.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000",
    justifyContent: "space-between",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontFamily: "Quicksand_700Bold",
    color: Colors.light.blueColor,
    fontSize: 18,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
  },
  price: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
  },
});

export default CartListItem;
