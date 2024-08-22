import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter, Stack, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { API_URL, useAuth } from "@/providers/AuthProvider";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ApplicationFormLayout = () => {
  const { id } = useLocalSearchParams();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState("");
  const [doc, setDoc] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/user/auth`);
        setName(result.data.name);
        setEmail(result.data.email);
        setMobile(result.data.mobile);
        setUserId(result.data._id);
      } catch (err) {
        // console.log(err);
      }
    };

    loadUser();
  }, []);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: ["application/pdf"],
    });

    const document = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    setDoc(document);

    const filePath = result.assets[0].uri.split("/");

    var lastSegment = filePath.pop() || filePath.pop();
    setUrl(lastSegment);

    // // console.log("uploaded document: ");
    // // console.log(url);
    // // console.log("encoded document: ");

    // // console.log(document);

    // let result = await DocumentPicker.getDocumentAsync({
    //   type: "*/*",
    //   copyToCacheDirectory: true,
    // }).then((response) => {
    //   if (response.type == "success") {
    //     let { name, size, uri } = response;

    //     / ------------------------/;
    //     if (Platform.OS === "android" && uri[0] === "/") {
    //       uri = `file://${uri}`;
    //       uri = uri.replace(/%/g, "%25");
    //     }
    //     / ------------------------/;

    //     let nameParts = name.split(".");
    //     let fileType = nameParts[nameParts.length - 1];
    //     var fileToUpload = {
    //       name: name,
    //       size: size,
    //       uri: uri,
    //       type: "application/" + fileType,
    //     };
    //     // console.log(fileToUpload, "...............file");
    //     setDoc(fileToUpload);
    //   }
    // });
    // // console.log(result);
    // // console.log("Doc: " + doc.uri);
  };

  const applyJob = async () => {
    const url = `${API_URL}/job-applications`;
    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("userId", userId);
    formData.append("resume", doc);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user?.token,
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      router.push("/jobs/confirmation");
    } catch (e) {
      // console.log(e.response.data);
    }

    // fetch(url, options).catch((error) => // console.log(error));
  };

  const router = useRouter();

  const signIn = () => {
    // if (!validateInputs()) {
    //   return;
    // }
    // console.log("sign in");
    router.push("/jobs/confirmation");
  };
  return (
    <View className="flex-1 justify-center p-0 m-0 ">
      <Stack.Screen options={{ title: "Job Application Form" }} />
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={require("@assets/images/Backgroundimage.png")}
          resizeMode="cover"
          className="justify-center flex-1 w-full"
        >
          <View className="m-4">
            <Text className="text-gray-500 mt-6 text-[16px] ">Your Name</Text>
            <TextInput
              onChangeText={setName}
              value={name}
              placeholder="Your Name"
              className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
            />
          </View>
          <View className="m-4">
            <Text className="text-gray-500 text-[16px] ">Mobile Number</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={setMobile}
              value={mobile}
              placeholder="Mobile Number"
              className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
            />
          </View>
          <View className="m-4">
            <Text className="text-slate-500 text-[16px]">Email Address</Text>
            <TextInput
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Category Name"
              value={email}
              className="bg-[#f0f0f0] rounded-[50px] p-4 mt-2 text-gray-900"
            />
          </View>
          <View className="m-4">
            <Text className="text-slate-500 text-[16px]">Resume</Text>
            {doc ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{url}</Text>
                <TouchableOpacity onPress={() => setDoc("")}>
                  <MaterialIcons name="delete" color="grey" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <Button
                style={styles.uploadBtn}
                text="Select Document"
                onPress={pickDocument}
              />
            )}
          </View>

          <View className="justify-end flex-col p-3 ">
            <Text className="text-red-800">{errors}</Text>
            <Button
              text="Apply"
              style={styles.button}
              className="rounded-none"
              onPress={applyJob}
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
  uploadBtn: { width: 100 },
});
