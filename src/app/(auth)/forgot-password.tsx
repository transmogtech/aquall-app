import Colors from "@/constants/Colors";
import axios from "axios";
import { useRouter, Link } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import Button from "@/components/Button";
import { API_URL } from "@/providers/AuthProvider";
import AppStyles from "@/constants/AppStyles";
const image = {
  uri: "@assets/images/Backgroundimage.png",
};

const forgotPassword = () => {
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateInputs = () => {
    setErrors("");

    if (!mobile) {
      setErrors("Please enter your mobile number");
      return false;
    }

    return true;
  };

  const signIn = async () => {
    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }
    try {
      const otp = generateRandomNumber();

      const formData = {
        mobile,
        otp,
      };

      const response = await axios.post(
        `${API_URL}/user/forgot-password`,
        formData
      );

      // console.log(response);

      const userId = response.data._id;
      sendOtp(mobile, otp);

      router.push(
        `/otp-verification?mobile=${mobile}&userId=${userId}&request_type=forgot_password`
      );
    } catch (err) {
      setErrors("Something went wrong, please try again");
    }
  };

  const generateRandomNumber = () => {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };

  const sendOtp = async (mobile_no: number, otp: number) => {
    const formData = {
      type: "smsquicksend",
      authKey: "XKkZKW7UgpwFLlkkOA3r",
      sender: "AQUFPL",
      to_mobileno: mobile_no,
      sms_text: `${otp} is your one time password (OTP) for mobile number verification on AQUALL FOODS AND PRODUCTS PVT LTD mobile app.`,
      t_id: "1707171932828110124",
    };
    const response = await axios.get(
      `http://login4.spearuc.com/MOBILE_APPS_API/sms_api.php`,
      { params: formData }
    );

    // console.log(response.data);
  };
  const HEIGHT = Dimensions.get("screen").height;
  const WIDTH = Dimensions.get("screen").width;

  return (
    <View className="flex-1 justify-center p-0 m-0">
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={require("@assets/images/Backgroundimage.png")}
          resizeMode="cover"
          className="justify-center flex-1 w-full"
        >
          <Image
            source={require("@assets/images/aquall-logo.png")}
            className="text-center mx-auto mt-4"
          />
          <Text
            className="text-center text-gray-500 mt-6"
            style={AppStyles.TextStyle}
          >
            Enter your registered mobile number to reset your password
          </Text>
          <View className="px-4">
            <Text
              className="text-gray-500 mt-6 text-[16px] "
              style={AppStyles.TextStyle}
            >
              Mobile Number
            </Text>
            <TextInput
              onChangeText={setMobile}
              keyboardType="number-pad"
              value={mobile}
              placeholder="Mobile Number"
              className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
              style={AppStyles.TextStyle}
            />
          </View>
          <View className="justify-end flex-col p-3 ">
            <Text className="text-red-800" style={AppStyles.TextStyle}>
              {errors}
            </Text>

            <Button
              text="Send"
              style={styles.button}
              className="rounded-none"
              onPress={signIn}
              disabled={isLoading}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default forgotPassword;

const styles = StyleSheet.create({
  button: { backgroundColor: Colors.light.blueColor },
  selectBox: {},
});
