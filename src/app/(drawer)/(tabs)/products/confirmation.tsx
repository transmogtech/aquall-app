import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { Link, useRouter, Stack } from "expo-router";
import Colors from "@/constants/Colors";

const ConfirmationLayout = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/products");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require("@assets/images/Backgroundimage.png")}
        resizeMode="cover"
        className="justify-center items-center flex-1 w-full"
      >
        <Image
          source={require("@assets/images/thumbs-up.jpeg")}
          style={{ height: 100, width: 100, transform: [{ rotate: "360deg" }] }}
        />
        <Text
          style={{
            color: Colors.light.blueColor,
            fontSize: 22,
            paddingVertical: 20,
            paddingHorizontal: 10,
            textAlign: "center",
          }}
        >
          Your product request has been submitted successfully
        </Text>
        <Text className="text-gray-400 font-[14px] pt-2 pb-2">
          Our team will connect with you shortly
        </Text>
        <Button text="Go Back Home" className="rounded-none" onPress={goHome} />
      </ImageBackground>
    </View>
  );
};

export default ConfirmationLayout;

const styles = StyleSheet.create({});
