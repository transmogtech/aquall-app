import React from "react";
import { Stack, Link } from "expo-router";

import Colors from "@/constants/Colors";
import MenuButton from "@/components/MenuButton";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const NewsStack = () => {
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
      <Stack.Screen name="index" options={{ title: "News" }} />
    </Stack>
  );
};

export default NewsStack;
