import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
const ApplicationFormLayout = () => {
  const [text, onChangeText] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [errors, setErrors] = React.useState("");
  const router = useRouter();

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

  const signIn = () => {
    if (!validateInputs()) {
      return;
    }
    console.log("sign in");
    router.push("/products");
  };
  return (
    <View className="flex-1 justify-center p-0 m-0 font-[Satoshi]">
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
          <Text className="text-center text-gray-500 mt-6">
            You shopping journey continues here! Signin to manage your account
            details and preferences
          </Text>
          <View className="m-4">
            <Text className="text-gray-500 mt-6 text-[16px] ">
              Mobile Number
            </Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={onChangeText}
              value={text}
              placeholder="Mobile Number"
              className="bg-gray-200 rounded-[50px] p-4 mt-2 text-gray-900"
            />
          </View>
          <View className="m-4">
            <Text className="text-slate-500 text-[16px]">Password</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={onChangePassword}
              placeholder="Password"
              value={password}
              className="bg-gray-200 rounded-[50px] p-4 mt-2 text-gray-900"
            />
          </View>
          <View className="m-4">
            <Text className="text-slate-500 text-[18px]">
              Dont have an account?{" "}
              <Link href="#" className="text-regal-blue font-semibold ">
                Register Here
              </Link>
            </Text>
          </View>
          <View className="justify-end flex-col p-3 ">
            <Text className="text-red-800">{errors}</Text>
            <Button
              text="Apply"
              style={styles.button}
              className="rounded-none"
              onPress={signIn}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default ApplicationFormLayout;

const styles = StyleSheet.create({
  button: { backgroundColor: Colors.light.blueColor },
});
