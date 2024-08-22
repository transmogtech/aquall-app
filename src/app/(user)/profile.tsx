import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Link } from "expo-router";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ProfileLayout = () => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/user/auth`);
        setUser(result.data);
        setImage(`${API_URL}/${result.data.avatar}`);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
      }
    };

    loadUser();
  }, []);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // // console.log(result);

    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();

      formData.append("avatar", { uri: localUri, name: filename, type });

      try {
        const response = await axios.post(
          `${API_URL}/user/image-upload/${user._id}`,
          formData,
          config
        );
        setImage(localUri);
        // // console.log(response.data);
      } catch (e) {
        // // console.log(e.response.data);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
      <Stack.Screen
        options={{
          title: "Profile",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <ScrollView style={{ marginHorizontal: 12, borderRadius: 20 }}>
        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingLeft: 12,
          }}
        >
          <Link href={`/(user)/edit-profile`}>
            <FontAwesome5 name="user-edit" size={24} color="black" />
          </Link>
        </View>
        <View style={{ alignItems: "center", marginVertical: 22 }}>
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{
                uri: image
                  ? image
                  : "https://www.gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd?s=200&r=pg&d=mm",
              }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: Colors.light.baseGray05,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 999,
              }}
            >
              <MaterialIcons name="photo-camera" size={32} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            elevation: 2,
            shadowColor: "#000",
            borderRadius: 10,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 12,
            }}
          >
            <FontAwesome name="user-o" size={24} color="black" />
            <Text
              style={{
                marginLeft: 20,
                fontFamily: "Quicksand_600SemiBold",
                fontSize: 16,
              }}
            >
              {user.name}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 12,
            }}
          >
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <Text
              style={{
                marginLeft: 20,
                fontFamily: "Quicksand_600SemiBold",
                fontSize: 16,
              }}
            >
              {user.email}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 12,
            }}
          >
            <MaterialIcons name="phone-android" size={24} color="black" />
            <Text
              style={{
                marginLeft: 20,
                fontFamily: "Quicksand_600SemiBold",
                fontSize: 16,
              }}
            >
              {user.mobile}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 12,
            }}
          >
            <SimpleLineIcons name="location-pin" size={24} color="black" />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  marginLeft: 20,
                  fontFamily: "Quicksand_600SemiBold",
                  fontSize: 16,
                }}
              >
                {user.districtId?.title}, {user.stateId?.title}
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  fontFamily: "Quicksand_600SemiBold",
                  fontSize: 16,
                }}
              >
                {user.areaId?.title}, {user.pincodeId?.title}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.light.blueColor,
            padding: 15,
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: 5,
            marginVertical: 10,
          }}
        >
          <Link
            href={`/(user)/change-password`}
            style={{ fontFamily: "Quicksand_600SemiBold", color: "#ffffff" }}
          >
            <Text>Change Password</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({
  errorText: {},
});
