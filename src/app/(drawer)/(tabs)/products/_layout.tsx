import React from "react";
import { Link, Stack } from "expo-router";
import { Pressable, View, Image, Text } from "react-native";
import Colors from "@/constants/Colors";
import MenuButton from "@/components/MenuButton";
import { useCart } from "@/providers/CartProvider";

const ProductStack = () => {
  const { items } = useCart();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.light.blueColor },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Colors.light.background,
          fontFamily: "Quicksand_600SemiBold",
        },
        headerLeft: () => <MenuButton />,
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <Image
                    source={require("@assets/images/cart.png")}
                    style={{ width: 24, height: 24, marginRight: 10 }}
                  />

                  <Text
                    style={{
                      color: "white",
                      position: "absolute",
                      top: -5,
                      right: 22,
                      zIndex: 999,
                      fontSize: 12,
                      fontFamily: "Quicksand_500Medium",
                    }}
                  >
                    {items.length > 0 && items.length}
                  </Text>
                </View>
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Products" }} />
    </Stack>
  );
};

export default ProductStack;
