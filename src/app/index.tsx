import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { login } from "@/services/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./(redux)/authSlice";

const index = () => {
  const [text, onChangeText] = useState("");
  const [password, onChangePassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const validateInputs = () => {
    setErrors("");
    if (!text) {
      setErrors("Please enter your registered mobile number");
      return false;
    }

    if (!password) {
      setErrors("Please enter your password");
      return false;
    }

    return true;
  };

  const signIn = async () => {
    setLoading(true);
    if (!validateInputs()) {
      setLoading(false);
      return;
    }
    // // console.log("Login details");
    // // console.log({ email: text, password });
    const result = await login({ email: text, password });
    // console.log(result);

    if (result && result.error) {
      // // console.log(result.error);
      setErrors(result.error);
      setLoading(false);
      return;
    }
    dispatch(loginAction(result));
    router.push("/home");
  };

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
            className="text-center mx-auto"
          />
          <Text
            className="text-center text-gray-500 m-6"
            style={styles.fontStyle}
          >
            You shopping journey continues here! Signin to manage your account
            details and preferences
          </Text>
          <View className="m-4">
            <Text
              className="text-gray-500 mt-6 text-[16px]"
              style={styles.fontStyle}
            >
              Mobile Number
            </Text>
            <TextInput
              onChangeText={onChangeText}
              value={text}
              keyboardType="number-pad"
              placeholder="Mobile Number"
              className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
              style={styles.fontStyle}
            />
          </View>
          <View className="m-4">
            <Text
              className="text-slate-500 text-[16px]"
              style={styles.fontStyle}
            >
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={onChangePassword}
              placeholder="Password"
              value={password}
              className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
              style={styles.fontStyle}
            />
          </View>
          <View
            className="mr-4"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Link
              href="/forgot-password"
              className="text-regal-blue font-semibold text-right"
              style={styles.fontStyle}
            >
              Forgot Password
            </Link>
          </View>
          <View className="justify-end flex-col p-3 ">
            <Text className="text-red-800" style={styles.fontStyle}>
              {errors}
            </Text>
            <Button
              text={loading ? "Signin in ..." : "Sign In"}
              style={styles.button}
              className="rounded-none"
              onPress={signIn}
              // disabled={loading}
            />
          </View>
          <View className="m-2 justify-center items-center">
            <Text
              className="text-slate-500 text-[18px]"
              style={styles.fontStyle}
            >
              Dont have an account?{" "}
              <Link href="/signup" className="text-regal-blue font-semibold ">
                Register Here
              </Link>
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.blueColor,
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
  },
  fontStyle: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
  },
});
