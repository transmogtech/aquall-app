import React from "react";
import { Stack, Link } from "expo-router";

import Colors from "@/constants/Colors";
import MenuButton from "@/components/MenuButton";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const PondStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Ponds List", headerTitleAlign: "center" }}
      />
    </Stack>
  );
};

export default PondStack;
