import React from "react";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import HeaderMenu from "@/components/HeaderMenu";
import MenuButton from "@/components/MenuButton";

const ProductStack = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.light.blueColor },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Colors.light.background,
        },
        headerLeft: () => <MenuButton />,
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.background}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
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
