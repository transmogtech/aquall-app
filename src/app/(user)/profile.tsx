import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter, Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Profile",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <Text>ProfileLayout</Text>
    </View>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({});
