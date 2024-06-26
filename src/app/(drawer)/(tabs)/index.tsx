import React from "react";
import { Redirect } from "expo-router";
import { View, Text } from "@/components/Themed";
import { ImageBackground } from "react-native";

const image = { uri: "@assets/images/Backgroundimage.png" };
const TabIndex = () => {
  return <Redirect href={"/products"} />;
  // <View>
  //   <ImageBackground source={image} resizeMode="cover" />
  //   <Text>Tab Index</Text>
  // </View>;
};

export default TabIndex;
