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
    // console.log("checkout");
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
          headerLargeTitleStyle: {
            fontFamily: "Quicksand_600SemiBold",
            fontSize: 16,
          },
        }}
      />
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          elevation: 2,
          shadowColor: "#000",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Quicksand_700Bold", fontSize: 20 }}>
          Total
        </Text>
        <Text
          style={{
            fontFamily: "Quicksand_700Bold",
            fontSize: 20,
            alignSelf: "flex-end",
          }}
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
