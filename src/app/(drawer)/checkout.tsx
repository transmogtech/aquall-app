import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { SelectList } from "react-native-dropdown-select-list";
import { Checkbox } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

const ApplicationFormLayout = () => {
  const [text, onChangeText] = useState("");
  const [password, onChangePassword] = useState("");
  const [errors, setErrors] = useState("");
  const router = useRouter();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [type, setType] = useState("");

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
  const stateData = [
    { key: "Andhrapradesh", value: "Andhrapradesh" },
    { key: "Telangana", value: "Telangana" },
    { key: "Tamilnadu", value: "Tamilnadu" },
  ];

  const districtData = [
    { key: "Srikakulam", value: "Srikakulam" },
    { key: "Vizayanagaram", value: "Vizayanagaram" },
    { key: "Vizag", value: "Vizag" },
    { key: "Eastgodavari", value: "Eastgodavari" },
    { key: "Westgodavari", value: "Westgodavari" },
  ];

  const areaData = [
    { key: "akividu", value: "akividu" },
    { key: "eluru", value: "eluru" },
    { key: "pandillapalli", value: "pandillapalli" },
    { key: "chakicharla", value: "chakicharla" },
    { key: "kesupalem", value: "kesupalem" },
  ];

  const signIn = () => {
    console.log("sign in");
    router.push("/checkout-confirmation");
  };
  return (
    <View className="flex-1 justify-center p-0 m-0 font-[Satoshi]">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Checkout",
        }}
      />

      <ScrollView className="flex-1">
        <ImageBackground
          source={require("@assets/images/Backgroundimage.png")}
          resizeMode="cover"
          className="justify-center flex-1 w-full"
        >
          <View className="m-4">
            <Text className="text-gray-500 mt-6 text-[16px] ">Your Name</Text>
            <TextInput
              onChangeText={onChangeText}
              value={text}
              placeholder="Your Name"
              className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
            />
          </View>
          <View className="m-4">
            <Text className="text-gray-500 text-[16px] ">Mobile Number</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={onChangeText}
              value={text}
              placeholder="Mobile Number"
              className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
            />
          </View>
          <View className="m-4">
            <Text className="text-slate-500 text-[16px]">Email Address</Text>
            <TextInput
              keyboardType="email-address"
              onChangeText={onChangePassword}
              placeholder="Category Name"
              value={password}
              className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
            />
          </View>
          <View className="px-4">
            <Text className="text-gray-500 mt-6 text-[16px] ">State</Text>
            <SelectList
              boxStyles={{
                backgroundColor: "#f0f0f0",
                borderRadius: 50,
                borderColor: "#f0f0f0",
                paddingVertical: 20,
              }}
              placeholder="Select State"
              setSelected={setState}
              data={stateData}
            />
          </View>
          <View className="px-4">
            <Text className="text-gray-500 mt-6 text-[16px] ">District</Text>
            <SelectList
              boxStyles={{
                backgroundColor: "#f0f0f0",
                borderRadius: 50,
                borderColor: "#f0f0f0",
                paddingVertical: 20,
              }}
              placeholder="Select District"
              setSelected={setDistrict}
              data={districtData}
            />
          </View>
          <View className="px-4 pb-4">
            <Text className="text-gray-500 mt-6 text-[16px] ">Area</Text>
            <SelectList
              boxStyles={{
                backgroundColor: "#f0f0f0",
                borderRadius: 50,
                borderColor: "#f0f0f0",
                paddingVertical: 20,
              }}
              placeholder="Select Area"
              setSelected={setArea}
              data={areaData}
            />
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Checkbox
              status={type == "online" ? "checked" : "unchecked"}
              onPress={() => {
                setType("online");
              }}
              color={Colors.light.baseGray05}
              uncheckedColor={Colors.light.baseGray05}
            />
            <Text className="text-gray-500 text-[16px] ">Online Payment</Text>
            <Checkbox
              status={type == "offline" ? "checked" : "unchecked"}
              onPress={() => {
                setType("offline");
              }}
              color={Colors.light.baseGray05}
              uncheckedColor={Colors.light.baseGray05}
            />
            <Text className="text-gray-500 text-[16px] ">Call on Order</Text>
          </View> */}

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
      </ScrollView>
    </View>
  );
};

export default ApplicationFormLayout;

const styles = StyleSheet.create({
  button: { backgroundColor: Colors.light.blueColor },
});
