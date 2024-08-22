import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { SelectList } from "react-native-dropdown-select-list";
// import { Checkbox } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import {
  getStates,
  getDistricts,
  getAreas,
  getPincodes,
} from "@assets/data/Location";
import { useCart } from "@/providers/CartProvider";

import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

const ApplicationFormLayout = () => {
  const [errors, setErrors] = useState("");
  const router = useRouter();
  const [user, setUser] = useState("");
  const { items, total, clearCart } = useCart();

  const productArr = [];
  items.forEach((item) => {
    productArr.push({
      id: item.product._id,
      quantity: item.quantity,
      amount: item.product.price,
    });
  });

  const [formData, setFormData] = useState({
    paymentMethod: "cod",
    products: productArr,
    amount: total,
    address: "",
    stateId: "",
    districtId: "",
    areaId: "",
    pincodeId: "",
    comment: "",
    userId: "",
  });
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [pinocodes, setPinocodes] = useState([]);
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [area, setArea] = useState([]);
  const [pinocode, setPincode] = useState([]);
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const stateData: any = [];
  const districtData: any = [];
  const areaData: any = [];
  const pincodeData: any = [];

  const fetchDistrictsData = async (state) => {
    const response = await getDistricts(state);
    setDistricts(response);
  };

  const fetchAreasData = async (district) => {
    const response = await getAreas(district);
    setAreas(response);
  };

  const fetchPincodesData = async (area) => {
    const response = await getPincodes(area);
    // // console.log(response);

    setPinocodes(response);
  };

  useEffect(() => {
    const fetchStatesData = async () => {
      const response = await getStates();
      setStates(response);
    };

    const loadUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/user/auth`);
        // // console.log(result.data);
        setUser(result.data);
        setState(result.data.stateId);
        setDistrict(result.data.districtId);
        setArea(result.data.areaId);
        setPincode(result.data.pincodeId);

        fetchStatesData();
        fetchDistrictsData(state);
        fetchAreasData(district);
        fetchPincodesData(area);
      } catch (err) {
        // console.log(err);
      }
    };

    loadUser();
  }, []);

  states?.forEach((row: any) =>
    stateData.push({ key: row._id, value: row.title })
  );

  districts?.forEach((row: any) =>
    districtData.push({ key: row._id, value: row.title })
  );

  areas?.forEach((row: any) =>
    areaData.push({ key: row._id, value: row.title })
  );

  pinocodes?.forEach((row: any) =>
    pincodeData.push({ key: row._id, value: row.title })
  );

  const validateInputs = () => {
    setErrors("");
    if (!address) {
      setErrors("Please enter your address");
      return false;
    }
    if (!state) {
      setErrors("Please select state");
      return false;
    }

    if (!district) {
      setErrors("Please select district");
      return false;
    }
    if (!area) {
      setErrors("Please select area");
      return false;
    }
    if (!pinocode) {
      setErrors("Please select pinocode");
      return false;
    }
    return true;
  };

  const onStateChange = async () => {
    const districtArr = await fetchDistrictsData(state);
    districtArr?.forEach((row: any) =>
      districtData.push({ key: row._id, value: row.title })
    );
  };

  const onDistrictChange = async () => {
    const areaArr = await fetchAreasData(district);
    areaArr?.forEach((row: any) =>
      areaData.push({ key: row._id, value: row.title })
    );
  };

  const onAreaChange = async () => {
    const pincodeArr = await fetchPincodesData(area);
    pincodeArr?.forEach((row: any) =>
      pincodeData.push({ key: row._id, value: row.title })
    );
  };

  const signIn = async () => {
    if (!validateInputs()) {
      return;
    }

    const formData = {
      paymentMethod: "cod",
      products: productArr,
      amount: total,
      address,
      stateId: state,
      districtId: district,
      areaId: area,
      pincodeId: pinocode,
      comment: comment,
      userId: user._id,
    };

    // // console.log(formData);

    const response = await axios.post(`${API_URL}/orders`, formData);
    // // console.log(response.data);
    clearCart();
    router.push("/checkout-confirmation");
  };
  return (
    <View className="flex-1 justify-center p-0 m-0">
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
          <View className="pt-4">
            <Text
              style={{
                color: Colors.light.blueColor,
                fontFamily: "Quicksand_700Bold",
              }}
              className="text-center text-[24px]"
            >
              Billing Address
            </Text>
          </View>
          <View className="m-4">
            <Text
              className="text-gray-500 mt-3 text-[16px]"
              style={{ fontFamily: "Quicksand_600SemiBold" }}
            >
              Your Address
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              onChangeText={setAddress}
              value={address}
              placeholder="Your Address"
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 20,
                padding: 10,
                textAlignVertical: "top",
                fontFamily: "Quicksand_600SemiBold",
              }}
            />
          </View>

          <View className="px-4">
            <Text
              className="text-gray-500 mt-4 text-[16px] "
              style={{ fontFamily: "Quicksand_600SemiBold" }}
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
              style={{ fontFamily: "Quicksand_600SemiBold" }}
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
          <View className="px-4 pb-3">
            <Text
              className="text-gray-500 mt-6 text-[16px]"
              style={{ fontFamily: "Quicksand_600SemiBold" }}
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
              onSelect={onAreaChange}
            />
          </View>
          <View className="px-4 pb-3">
            <Text
              className="text-gray-500 mt-6 text-[16px] "
              style={{ fontFamily: "Quicksand_600SemiBold" }}
            >
              Pincode
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
              placeholder="Select Pincode"
              setSelected={setPincode}
              data={pincodeData}
            />
          </View>
          <View className="m-3">
            <Text
              className="text-gray-500 mt-3 text-[16px] "
              style={{ fontFamily: "Quicksand_600SemiBold" }}
            >
              Comment
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              onChangeText={setComment}
              value={comment}
              placeholder="Comment"
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 20,
                padding: 10,
                textAlignVertical: "top",
                fontFamily: "Quicksand_600SemiBold",
              }}
            />
          </View>
          <View className="justify-end flex-col p-3 ">
            <Text className="text-red-800">{errors}</Text>
            <Button
              text="Submit"
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
