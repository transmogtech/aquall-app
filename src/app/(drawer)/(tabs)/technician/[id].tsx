import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultUserImage } from "@assets/data/home";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useLocalSearchParams, Stack, useRouter, router } from "expo-router";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
import Button from "@/components/Button";
import { ScrollView } from "react-native-gesture-handler";
import AppStyles from "@/constants/AppStyles";

const TechnicianListLayout = () => {
  const { id } = useLocalSearchParams();
  const [record, setRecord] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/user/auth`);
        // // console.log(result.data);

        setUser(result.data);
      } catch (err) {
        // console.log(err);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/${id}`);

        setRecord(response.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
    loadUser();
  }, []);
  // const product = products.find((p) => p.id.toString() === id);

  const sendRequest = () => {
    const formData = { technicianId: record._id, userId: user._id };

    axios
      .post(`${API_URL}/technician-requests`, formData)
      .then((response) => {
        // console.log(response);
        router.push("/technician/confirmation");
        // Alert.alert("Request sent successfully");
      })
      .catch((error) => {
        // console.log(error);
        Alert.alert("Failed to send request");
      });
  };
  if (!record) {
    return <Text>User not found</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.article}>
        <Image source={{ uri: defaultUserImage }} style={styles.userImage} />

        <View style={{ flex: 1 }}>
          <Text style={[AppStyles.titleTextStyle, styles.userName]}>
            {record.name}
          </Text>

          <Text style={AppStyles.SubTextStyle}>
            <FontAwesome name="mobile" size={20} /> {record.mobile}
          </Text>

          <Text style={AppStyles.SubTextStyle}>
            <FontAwesome name="envelope" size={16} /> {record.email}
          </Text>
          <Button text="Request" onPress={sendRequest} />
        </View>
      </View>
    </ScrollView>
  );
};

export default TechnicianListLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productTitle: {
    fontWeight: "600",
    textAlign: "center",
    padding: 8,
    fontSize: 12,
  },
  category: {
    color: "#5A5A5A",
  },
  article: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    elevation: 2,
    shadowColor: "#000",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userImage: {
    width: 85,
    height: 85,
    resizeMode: "cover",
    marginRight: 20,
    borderRadius: 50,
  },

  userName: {
    paddingBottom: 20,
  },
  location: {
    color: "#767E7E",
  },
  mobile: {
    color: "#1E1E1E",
    paddingVertical: 10,
  },
  email: {
    color: "#787878",
  },
});
