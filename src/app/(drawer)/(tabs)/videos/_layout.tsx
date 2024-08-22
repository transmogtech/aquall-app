import React from "react";

import { Stack, Link } from "expo-router";

import Colors from "@/constants/Colors";
import MenuButton from "@/components/MenuButton";
import { Pressable, Text, Image, View } from "react-native";
import { useCart } from "@/providers/CartProvider";

const VideoStack = () => {
  const { items } = useCart();

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
      <Stack.Screen name="index" options={{ title: "Videos" }} />
    </Stack>
  );
};

export default VideoStack;
