import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Button from "@/components/Button";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

const OtpVerification = () => {
  const { userId } = useLocalSearchParams();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // // console.log(userId);
  const handleSubmit = async () => {
    setLoading(true);
    if (!password) {
      setLoading(false);
      setErrors("Please enter your password");
      return;
    }
    if (password.length < 6) {
      setLoading(false);
      setErrors("Password must be at least 6 characters long");
      return;
    }
    if (!confirmPassword) {
      setLoading(false);
      setErrors("Please enter confirm password");
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      setErrors("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/user/reset-password`, {
        password,
        userId,
      });
      if (response.data.message) {
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      setErrors("Something went wrong, please try again");
    }
  };

  return (
    <View className="flex-1 justify-center p-0 m-0">
      <Stack.Screen options={{ headerTitle: "Reset Password" }} />
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={require("@assets/images/Backgroundimage.png")}
          resizeMode="cover"
          className="justify-center flex-1 w-full"
        >
          <View className="p-4">
            <Image
              source={require("@assets/images/aquall-logo.png")}
              className="text-center mx-auto"
            />
            <Text className="text-center text-gray-500 mt-6">
              Reset Password
            </Text>
            <View className="px-4">
              <Text className="text-slate-500 mt-6  text-[16px]">Password</Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={setPassword}
                placeholder="Password"
                value={password}
                className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
              />
            </View>
            <View className="px-4">
              <Text className="text-slate-500 mt-6  text-[16px]">
                Confirm Password
              </Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={setConfirmPassword}
                placeholder="Password"
                value={confirmPassword}
                className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
              />
            </View>
            <View className="justify-end flex-col p-3 ">
              <Text className="text-red-800">{errors}</Text>
              <Button
                text={loading ? "Submitting ..." : "Submit"}
                style={styles.button}
                className="rounded-none"
                onPress={handleSubmit}
                disabled={loading}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  button: { backgroundColor: Colors.light.blueColor },
  container: { fontFamily: "Quicksand_400Regular" },
  optInput: {
    backgroundColor: "#f0f0f0",
    borderWidth: 0,
  },
});
