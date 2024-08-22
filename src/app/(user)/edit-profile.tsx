import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, Stack, router } from "expo-router";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
import Button from "@/components/Button";
import {
  getStates,
  getDistricts,
  getAreas,
  getPincodes,
} from "@assets/data/Location";
import { SelectList } from "react-native-dropdown-select-list";
import AppStyles from "@/constants/AppStyles";
import { ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";

const EditProfileLayout = () => {
  const [errors, setErrors] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [defaultState, setDefaultState] = useState({});
  const [defaultDistrict, setDefaultDistrict] = useState({});
  const [defaultArea, setDefaultArea] = useState({});
  const [defaultPincode, setDefaultPincode] = useState({});
  const [userId, setUserId] = useState("");
  const stateData: any = [];
  const districtData: any = [];
  const areaData: any = [];
  const [statesArr, setStatesArr] = useState([]);
  const [districtArr, setDistrictArr] = useState([]);
  const [areaArr, setAreaArr] = useState([]);
  const [pincodeArr, setPincodeArr] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState("");

  const fetchDistrictData = async (state) => {
    const response = await getDistricts(state);
    response.forEach((row: any) => {
      districtData.push({ key: row._id, value: row.title });
    });
    setDistrictArr(districtData);
  };

  const fetchAreaData = async (district) => {
    const response = await getAreas(district);
    response.forEach((row: any) => {
      areaData.push({ key: row._id, value: row.title });
    });
    setAreaArr(districtData);
  };

  const fetchPincodeData = async (area) => {
    try {
      const response = await getPincodes(area);
      // // console.log(response);
      const pincodeData = [];
      response.forEach((row: any) => {
        pincodeData.push({ key: row._id, value: row.title });
      });
      setPincodeArr(pincodeData);
    } catch (err) {
      // console.log(err);
    }
  };

  // const [role, setRole] = useState("");
  useEffect(() => {
    const fetchStatesData = async () => {
      const response = await getStates();
      response.forEach((row: any) => {
        stateData.push({ key: row._id, value: row.title });
      });
      setStatesArr(stateData);
    };

    fetchStatesData();

    const loadUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/user/auth`);

        setName(result.data.name);
        setMobile(result.data.mobile);
        setEmail(result.data.email);
        setState(result.data.stateId._id);
        setDefaultState({
          key: result.data.stateId._id,
          value: result.data.stateId.title,
        });

        fetchDistrictData(result.data.stateId._id);
        fetchAreaData(result.data.districtId._id);
        fetchPincodeData(result.data.areaId._id);
        setDistrict(result.data.districtId._id);
        setArea(result.data.areaId._id);
        setPincode(result.data.pincodeId?._id);

        setDefaultDistrict({
          key: result.data.districtId._id,
          value: result.data.districtId.title,
        });

        setDefaultArea({
          key: result.data.areaId._id,
          value: result.data.areaId.title,
        });

        setDefaultPincode({
          key: result.data.pincodeId?._id,
          value: result.data.pincodeId?.title,
        });
        setUserId(result.data._id);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
      }
    };

    // fetchUserRole();

    loadUser();
  }, []);

  // statesArr?.forEach((row: any) => {
  //   stateData.push({ key: row._id, value: row.title });
  //   if (state == row._id) {
  //     setDefaultState({ key: row._id, value: row.title });
  //   }
  // });
  const onStateChange = async () => {
    await fetchDistrictData(state);
  };

  const onDistrictChange = async () => {
    await fetchAreaData(district);
  };
  const validateInputs = () => {
    setErrors("");
    if (!name) {
      setErrors("Please enter your name");
      return false;
    }

    return true;
  };

  const updateProfile = async () => {
    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    const formData = {
      name,
      stateId: state,
      districtId: district,
      areaId: area,
      pincodeId: pincode,
      // avatar: imageData,
      // userroleId: role,
      userId,
    };
    // console.log(formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user.token,
      },
    };
    const response = await axios.patch(
      `${API_URL}/user/${userId}`,
      formData,
      config
    );
    // console.log(response.data);
    router.push(`/profile`);
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-0 m-0 ">
      <Stack.Screen
        options={{
          title: "Edit Profile",
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
            <View className="m-4">
              <Text
                className="text-gray-500 mt-6 text-[16px] "
                style={AppStyles.TextStyle}
              >
                Your Name
              </Text>
              <TextInput
                onChangeText={setName}
                value={name}
                name="name"
                placeholder="Your Name"
                className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
                style={AppStyles.TextStyle}
              />
            </View>
            <View className="m-4">
              <Text
                className="text-gray-500 text-[16px] "
                style={AppStyles.TextStyle}
              >
                Mobile Number
              </Text>
              <TextInput
                keyboardType="numeric"
                value={mobile}
                name="mobile"
                placeholder="Mobile Number"
                readOnly="true"
                className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
                style={AppStyles.TextStyle}
              />
            </View>
            <View className="m-4">
              <Text
                className="text-slate-500 text-[16px]"
                style={AppStyles.TextStyle}
              >
                Email Address
              </Text>
              <TextInput
                keyboardType="email-address"
                value={email}
                name="email"
                placeholder="Category Name"
                readOnly="true"
                className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
                style={AppStyles.TextStyle}
              />
            </View>
            <View className="px-4">
              <Text
                className="text-gray-500 mt-6 text-[16px] "
                style={AppStyles.TextStyle}
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
                data={statesArr}
                onSelect={onStateChange}
                defaultOption={defaultState}
              />
            </View>
            <View className="px-4">
              <Text
                className="text-gray-500 mt-6 text-[16px] "
                style={AppStyles.TextStyle}
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
                data={districtArr}
                defaultValue={district}
                onSelect={onDistrictChange}
                defaultOption={defaultDistrict}
              />
            </View>
            <View className="px-4">
              <Text
                className="text-gray-500 mt-6 text-[16px] "
                style={AppStyles.TextStyle}
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
                data={areaArr}
                defaultOption={defaultArea}
              />
            </View>
            <View className="px-4">
              <Text
                className="text-gray-500 mt-6 text-[16px] "
                style={AppStyles.TextStyle}
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
                data={pincodeArr}
                defaultOption={defaultPincode}
              />
            </View>
            <View className="justify-end flex-col p-3 ">
              <Text style={AppStyles.errorTextStyle}>{errors}</Text>
              <Button
                text={isLoading ? "Updating..." : "Update"}
                className="rounded-none"
                onPress={updateProfile}
                disabled={isLoading}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default EditProfileLayout;

const styles = StyleSheet.create({
  errorText: {},
});
