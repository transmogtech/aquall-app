import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  TextStyle,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { getStates, getDistricts, getAreas } from "@assets/data/Location";
import { getUserRoles, signup } from "@assets/data/user";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
import AppStyles from "@/constants/AppStyles";

const image = {
  uri: "@assets/images/Backgroundimage.png",
};
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [statesArr, setStatesArr] = useState([]);
  const [rolesArr, setRolesArr] = useState([]);
  const router = useRouter();
  const stateData: any = [];
  const roleData: any = [];
  const districtData: any = [];
  const areaData: any = [];
  useEffect(() => {
    const fetchStatesData = async () => {
      const response = await getStates();
      setStatesArr(response);
    };

    const fetchUserRole = async () => {
      const response = await getUserRoles();
      setRolesArr(response);
    };

    fetchStatesData();
    fetchUserRole();
    setIsLoading(false);
  }, []); // eslint-disable-line

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  statesArr?.forEach((row: any) =>
    stateData.push({ key: row._id, value: row.title })
  );

  rolesArr?.forEach((row: any) =>
    row.url != "admin" ? roleData.push({ key: row._id, value: row.title }) : ""
  );
  const validateInputs = () => {
    setErrors("");
    if (!name) {
      setErrors("Please enter your name");
      return false;
    }
    if (email && validate(email)) {
      setErrors("Please enter valid email address");
      return false;
    }
    if (!mobile) {
      setErrors("Please enter your mobile number");
      return false;
    }

    if (mobile.length > 10 || mobile.length < 10 || isNaN(mobile)) {
      setErrors("Invalid mobile number");
      return false;
    }

    if (!role) {
      setErrors("Please select role");
      return false;
    }

    if (!password) {
      setErrors("Please enter your password");
      return false;
    }

    return true;
  };

  const onStateChange = async () => {
    const districtArr = await getDistricts(state);
    districtArr?.forEach((row: any) =>
      districtData.push({ key: row._id, value: row.title })
    );
  };

  const onDistrictChange = async () => {
    const areaArr = await getAreas(district);
    areaArr?.forEach((row: any) =>
      areaData.push({ key: row._id, value: row.title })
    );
  };

  const signIn = async () => {
    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }
    try {
      const otp = generateRandomNumber();
      const formData = {
        name,
        email,
        mobile,
        password,
        stateId: state,
        districtId: district,
        areaId: area,
        userroleId: role,
        otp,
      };
      sendOtp(mobile, otp);
      const response = await axios.post(`${API_URL}/user/signup`, formData);
      const userId = response.data.user._id;

      router.push(
        `/otp-verification?userId=${userId}&mobile=${mobile}&request_type=signup`
      );
    } catch (err) {
      setErrors(err.response.data.errors[0].message);
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

  return (
    <SafeAreaView className="flex-1 justify-center p-0 m-0">
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <SafeAreaView className="flex-1 justify-center p-0 m-0">
          <View style={styles.container}>
            <ImageBackground
              source={require("@assets/images/Backgroundimage.png")}
              resizeMode="cover"
              className="justify-center"
            >
              <ScrollView>
                <Image
                  source={require("@assets/images/aquall-logo.png")}
                  className="text-center mx-auto mt-4"
                />

                <View className="px-4">
                  <Text
                    className="text-gray-500 mt-6 text-[16px]"
                    style={styles.TextStyle}
                  >
                    Full Name
                  </Text>
                  <TextInput
                    onChangeText={setName}
                    value={name}
                    placeholder="Full Name"
                    style={styles.TextStyle}
                    className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
                  />
                </View>
                <View className="px-4">
                  <Text
                    className="text-gray-500 mt-6 text-[16px] "
                    style={styles.TextStyle}
                  >
                    Email Address
                  </Text>
                  <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email Address"
                    className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
                    style={styles.TextStyle}
                  />
                </View>
                <View className="px-4">
                  <Text
                    className="text-gray-500 mt-6 text-[16px] "
                    style={styles.TextStyle}
                  >
                    Mobile Number
                  </Text>
                  <TextInput
                    onChangeText={setMobile}
                    keyboardType="number-pad"
                    value={mobile}
                    placeholder="Mobile Number"
                    className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
                    style={styles.TextStyle}
                  />
                </View>
                <View className="px-4">
                  <Text
                    className="text-slate-500 mt-6  text-[16px]"
                    style={styles.TextStyle}
                  >
                    Password
                  </Text>
                  <TextInput
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholder="Password"
                    value={password}
                    className="bg-[#f0f0f0] rounded-[50px] p-4 text-gray-900"
                    style={styles.TextStyle}
                  />
                </View>
                <View className="px-4">
                  <Text
                    className="text-gray-500 mt-6 text-[16px] "
                    style={styles.TextStyle}
                  >
                    State
                  </Text>
                  <SelectList
                    boxStyles={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 50,
                      borderColor: "#f0f0f0",
                      paddingVertical: 20,
                    }}
                    inputStyles={{
                      fontFamily: "Quicksand_500Medium",
                      fontSize: 16,
                    }}
                    dropdownTextStyles={{
                      fontFamily: "Quicksand_500Medium",
                      fontSize: 16,
                    }}
                    placeholder="Select State"
                    setSelected={setState}
                    data={stateData}
                    onSelect={onStateChange}
                  />
                </View>
                <View className="px-4">
                  <Text
                    className="text-gray-500 mt-6 text-[16px] "
                    style={styles.TextStyle}
                  >
                    District
                  </Text>
                  <SelectList
                    boxStyles={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 50,
                      borderColor: "#f0f0f0",
                      paddingVertical: 20,
                    }}
                    inputStyles={{
                      fontFamily: "Quicksand_500Medium",
                      fontSize: 16,
                    }}
                    dropdownTextStyles={{
                      fontFamily: "Quicksand_500Medium",
                      fontSize: 16,
                    }}
                    placeholder="Select District"
                    setSelected={setDistrict}
                    data={districtData}
                    onSelect={onDistrictChange}
                  />
                </View>
                <View className="px-4">
                  <Text
                    className="text-gray-500 mt-6 text-[16px] "
                    style={styles.TextStyle}
                  >
                    Area
                  </Text>
                  <SelectList
                    boxStyles={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 50,
                      borderColor: "#f0f0f0",
                      paddingVertical: 20,
                    }}
                    inputStyles={{
                      fontFamily: "Quicksand_500Medium",
                      fontSize: 16,
                    }}
                    dropdownTextStyles={{
                      fontFamily: "Quicksand_500Medium",
                      fontSize: 16,
                    }}
                    placeholder="Select Area"
                    setSelected={setArea}
                    data={areaData}
                  />
                </View>
                <View className="px-4">
                  <Text
                    className="text-gray-500 mt-6 text-[16px] "
                    style={styles.TextStyle}
                  >
                    Role
                  </Text>
                  <SelectList
                    boxStyles={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 50,
                      borderColor: "#f0f0f0",
                      paddingVertical: 20,
                    }}
                    inputStyles={{
                      fontFamily: "Quicksand_500Medium",
                      fontSize: 16,
                    }}
                    dropdownTextStyles={{
                      fontFamily: "Quicksand_500Medium",
                      fontSize: 16,
                    }}
                    placeholder="Select Role"
                    setSelected={setRole}
                    data={roleData}
                  />
                </View>
                <View className="m-4">
                  <Text
                    className="text-slate-500 text-[18px]"
                    style={styles.TextStyle}
                  >
                    Already have an account?{" "}
                    <Link href="#" className="text-regal-blue font-semibold ">
                      Sign In
                    </Link>
                  </Text>
                </View>
                <View className="justify-end flex-col p-3 ">
                  <Text className="text-red-800">{errors}</Text>

                  <Button
                    text="Signup"
                    style={styles.button}
                    className="rounded-none"
                    onPress={signIn}
                    disabled={isLoading}
                  />
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.blueColor,
    fontFamily: "Quicksand_500Medium",
  },
  TextStyle: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.blueColor,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
