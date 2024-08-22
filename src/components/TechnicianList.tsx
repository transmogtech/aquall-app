import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultUserImage } from "@assets/data/home";

const TechnicianListItem = ({ item }: any) => {
  return (
    <View style={styles.article}>
      <Image source={{ uri: defaultUserImage }} style={styles.userImage} />

      <View style={{ flex: 1 }}>
        <Text style={styles.userName} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.location}>{item.location}</Text>

        <Text style={styles.mobile}>
          <FontAwesome name="mobile" size={20} /> {item.mobile}
        </Text>

        <Text style={styles.email}>
          <FontAwesome name="envelope" size={20} /> {item.email}
        </Text>
      </View>
    </View>
  );
};

export default TechnicianListItem;

const styles = StyleSheet.create({
  article: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: "100%",
  },
  userImage: {
    width: 85,
    height: 85,
    resizeMode: "cover",
    marginRight: 10,
  },
  userName: {
    color: Colors.light.blueColor,
  },
  location: {
    color: "#767E7E",
  },
  mobile: {
    color: "#1E1E1E",
  },
  email: {
    color: "#787878",
  },
});
