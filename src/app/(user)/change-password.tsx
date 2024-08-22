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
import { router, Stack } from "expo-router";
import AppStyles from "@/constants/AppStyles";
import Button from "@/components/Button";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../(redux)/authSlice";

const ChangePasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pwd, setPwd] = useState("");
  const [cnfrmPwd, setCnfrmPwd] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [errors, setErrors] = useState("");
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const validateInputs = () => {
    setErrors("");

    if (!oldPwd) {
      setErrors("Please enter your old password");
      return false;
    }
    if (!pwd) {
      setErrors("Please enter your new password");
      return false;
    }
    if (pwd.length < 6) {
      setErrors("Password must be at least 6 characters");
      return false;
    }

    if (!/\d/.test(pwd)) {
      setErrors("Add at least one number");
      return false;
    }

    if (!/[A-Z]/.test(pwd) || !/[a-z]/.test(pwd)) {
      setErrors("Include both upper and lower case letters");
      return false;
    }

    if (!cnfrmPwd) {
      setErrors("Please enter confirm password");
      return false;
    }

    if (pwd != cnfrmPwd) {
      setErrors("Password and confirm password do not match");
      return false;
    }

    return true;
  };

  const changePwd = async () => {
    setIsLoading(true);
    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }
    const formData = {
      password: pwd,
      old_password: oldPwd,
      userId: user.id,
    };
    // console.log(formData);
    try {
      const response = await axios.post(
        `${API_URL}/user/change-password`,
        formData
      );
      // console.log(response);
      if (response.data.message) {
        setIsLoading(false);
        dispatch(logoutAction());
      }
    } catch (error) {
      // // console.log(error.response.data.error);

      setErrors(error.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-0 m-0 ">
      <Stack.Screen
        options={{
          title: "Change Password",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView className="flex-1">
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
              Change Password
            </Text>
            <View className="m-4">
              <Text
                className="text-gray-500 mt-6 text-[16px] "
                style={AppStyles.TextStyle}
              >
                Old Password
              </Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={setOldPwd}
                placeholder="Old Password"
                value={oldPwd}
                className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
                style={AppStyles.TextStyle}
              />
            </View>
            <View className="m-4">
              <Text
                className="text-gray-500 text-[16px] "
                style={AppStyles.TextStyle}
              >
                New Password
              </Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={setPwd}
                placeholder="New Password"
                value={pwd}
                className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
                style={AppStyles.TextStyle}
              />
            </View>
            <View className="m-4">
              <Text
                className="text-slate-500 text-[16px]"
                style={AppStyles.TextStyle}
              >
                Confirm Password
              </Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={setCnfrmPwd}
                placeholder="Confirm Password"
                value={cnfrmPwd}
                className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
                style={AppStyles.TextStyle}
              />
            </View>

            <View className="justify-end flex-col p-3 ">
              <Text style={AppStyles.errorTextStyle}>{errors}</Text>
              <Button
                text={isLoading ? "Updating..." : "Update"}
                className="rounded-none"
                onPress={changePwd}
                disabled={isLoading}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({});
