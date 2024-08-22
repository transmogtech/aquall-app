import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  Text,
} from "react-native";
import Button from "@/components/Button";

import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

const ProductRequest = () => {
  const { productId } = useLocalSearchParams();

  const [errors, setErrors] = useState("");
  const [price, setPrice] = useState("");
  const [volume, setVolume] = useState("");
  const [discount, setDiscount] = useState("");
  const [user, setUser] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/user/auth`);
        // // console.log(result.data);

        setUser(result.data);
      } catch (err) {
        // console.log(err);
      }
    };

    loadUser();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = {
      price: price,
      discount: discount,
      volume: volume,
      userId: user._id,
      productId: productId,
    };
    // Add your API call here
    // // console.log(formData);

    axios
      .post(`${API_URL}/product-requests`, formData)
      .then((response) => {
        // // console.log(response);
        setIsLoading(false);
        // alert("Product Request Submitted Successfully");
        router.push("/products/confirmation");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
    // setIsLoading(false);
    // alert("Product Request Submitted Successfully");
  };
  return (
    <View className="flex-1 justify-center p-0 m-0 ">
      <Stack.Screen
        options={{
          title: "Product Request",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1">
          <ImageBackground
            source={require("@assets/images/Backgroundimage.png")}
            resizeMode="cover"
            className="justify-center flex-1 w-full"
          >
            <View className="m-4">
              <Text className="text-gray-500 mt-6 text-[16px] ">Price</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={setPrice}
                value={price}
                placeholder="Price"
                className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
              />
            </View>
            <View className="m-4">
              <Text className="text-gray-500 text-[16px] ">Volume</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={setVolume}
                value={volume}
                placeholder="Volume"
                className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
              />
            </View>
            <View className="m-4">
              <Text className="text-slate-500 text-[16px]">Discount</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={setDiscount}
                value={discount}
                placeholder="Discount"
                className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
              />
            </View>
            <View className="justify-end flex-col p-3 ">
              <Text className="text-red-800">{errors}</Text>
              <Button
                text={isLoading ? "Submitting..." : "Submit"}
                className="rounded-none"
                onPress={handleSubmit}
                disabled={isLoading}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProductRequest;
