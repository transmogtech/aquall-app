import React from "react";
import { Stack, Link } from "expo-router";

import Colors from "@/constants/Colors";
import MenuButton from "@/components/MenuButton";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const TechnicianStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Technician List",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: Colors.light.background,
            fontFamily: "Quicksand_600SemiBold",
          },
        }}
      />
    </Stack>
  );
};

export default TechnicianStack;
