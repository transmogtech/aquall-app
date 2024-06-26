import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AboutUsLayout = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Cart",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <Text>AboutUsLayout</Text>
    </View>
  );
};

export default AboutUsLayout;

const styles = StyleSheet.create({});
