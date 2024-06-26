import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
} from "react-native";
import React from "react";
import Button from "@/components/Button";
import { Link, useRouter, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const PaymentLayout = () => {
  const router = useRouter();
  const [text, onChangeText] = React.useState("");

  const goHome = () => {
    router.push("/checkout-confirmation");
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
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "Payment Details",
        }}
      />
      <ImageBackground
        source={require("@assets/images/Backgroundimage.png")}
        resizeMode="cover"
        className="flex-1 w-full"
      >
        <Text>Choose Credit Card</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <FontAwesome name="cc-visa" size={24} style={{ paddingRight: 20 }} />
          <FontAwesome
            name="cc-mastercard"
            size={24}
            style={{ paddingRight: 20 }}
          />
          <FontAwesome name="cc-discover" size={24} />
        </View>
        <View className="m-4">
          <Text className="text-gray-500 text-[16px] ">Card Number</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={onChangeText}
            value={text}
            placeholder="Card Number"
            className="bg-[#f0f0f0] rounded-[10px] p-4 mt-2 text-gray-900"
          />
        </View>
        <View className="m-4">
          <Text className="text-gray-500 text-[16px] ">Card Holder Name</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={onChangeText}
            value={text}
            placeholder="Card Holder Name"
            className="bg-[#f0f0f0] rounded-[10px] p-4 mt-2 text-gray-900"
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View className="m-4">
            <Text className="text-gray-500 text-[16px] ">Expiry Date</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={onChangeText}
              value={text}
              placeholder="Expiry Date"
              className="bg-[#f0f0f0] rounded-[10px] p-4 mt-2 text-gray-900"
            />
          </View>
          <View className="m-4">
            <Text className="text-gray-500 text-[16px] ">CVV</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={onChangeText}
              value={text}
              placeholder="CVV"
              className="bg-[#f0f0f0] rounded-[10px] p-4 mt-2 text-gray-900"
            />
          </View>
        </View>
        <Button text="Proceed" className="rounded-none" onPress={goHome} />
      </ImageBackground>
    </View>
  );
};

export default PaymentLayout;

const styles = StyleSheet.create({});
