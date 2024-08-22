import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

import { Company } from "@/types";
import { defaultUserImage } from "@assets/data/home";
import { API_URL } from "@/providers/AuthProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import AppStyles from "@/constants/AppStyles";

const CompanyListItem = ({ item }) => {
  return (
    <Link href={`/technician/${item._id}`} asChild>
      <Pressable key={item._id}>
        <View style={styles.article}>
          <Image
            source={{
              uri: defaultUserImage,
            }}
            style={styles.userImage}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={[AppStyles.titleTextStyle, styles.title]}
              numberOfLines={2}
            >
              {item.name}
            </Text>

            <Text style={AppStyles.SubTextStyle}>
              <FontAwesome name="mobile" size={20} /> {item.mobile}
            </Text>

            <Text style={AppStyles.SubTextStyle}>
              <FontAwesome name="envelope" size={16} /> {item.email}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default CompanyListItem;

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
    paddingBottom: 20,
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
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
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
    color: Colors.light.blueColor,
    fontSize: 16,
    fontWeight: "bold",
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
