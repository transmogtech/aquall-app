import { View, Text, Platform, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartItemList";
import Button from "@/components/Button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useRouter, Stack } from "expo-router";

const CartScreen = () => {
  const router = useRouter();

  const checkout = () => {
    console.log("checkout");
    router.push("/checkout");
  };
  const { items, total } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <Stack.Screen
        options={{
          title: "Cart",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <View
        style={{
          backgroundColor: Colors.light.background,
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
          height: 60,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total</Text>
        <Text
          style={{ fontWeight: "bold", fontSize: 20, alignSelf: "flex-end" }}
        >
          <FontAwesome name="rupee" size={18} />
          {total}
        </Text>
      </View>
      {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total: ${total}</Text> */}
      <Button text="Checkout" onPress={checkout} />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
