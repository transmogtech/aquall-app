import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { isLoading } from "expo-font";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Button from "@/components/Button";
import OtpTextInput from "react-native-text-input-otp";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

const OtpVerification = () => {
  const { userId, mobile, request_type } = useLocalSearchParams();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const signIn = async () => {
    setLoading(true);
    if (!otp) {
      setLoading(false);
      setErrors("Please enter your otp");
      return;
    }
    if (otp.length < 6) {
      setLoading(false);
      setErrors("Please enter your otp");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/user/otp-verification`, {
        otp,
        userId,
        request_type,
      });
      if (response.data.message) {
        setLoading(false);
        if (request_type == "signup") {
          router.push("/");
        } else {
          router.push(`/reset-password?userId=${userId}`);
        }
      }
    } catch (error) {
      setErrors("Something went wrong, please try again");
    }
  };

  return (
    <View className="flex-1 justify-center p-0 m-0">
      <Stack.Screen options={{ headerTitle: "Otp Verification" }} />
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
              Please input the code we just sent to your phone number, {mobile}
            </Text>
            <View className="p-4 w-full">
              <OtpTextInput
                otp={otp}
                setOtp={setOtp}
                digits={6}
                style={styles.optInput}
              />
            </View>
            <View className="justify-end flex-col p-3 ">
              <Text className="text-red-800">{errors}</Text>
              <Button
                text={loading ? "Submitting ..." : "Submit"}
                style={styles.button}
                className="rounded-none"
                onPress={signIn}
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
