import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

import { Company } from "@/types";
import { defaultUserImage } from "@assets/data/home";
import { API_URL } from "@/providers/AuthProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const CompanyListItem = ({ item }) => {
  return (
    <Link href={`/news/${item.id}`} asChild>
      <Pressable style={styles.article}>
        {/* Caching image for better performance: https://github.com/DylanVann/react-native-fast-image */}
        <Image
          source={{
            uri: `${API_URL}/${item.avatar}` || defaultUserImage,
          }}
          style={styles.userImage}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.userName} numberOfLines={2}>
            {item.name}
          </Text>

          {/* <Text style={styles.location}>{item.location}</Text> */}

          <Text style={styles.mobile}>
            <FontAwesome name="mobile" size={20} /> {item.mobile}
          </Text>

          <Text style={styles.email}>
            <FontAwesome name="envelope" size={20} /> {item.email}
          </Text>
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
    flexDirection: "row",
    padding: 10,
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  userImage: {
    width: 85,
    height: 85,
    resizeMode: "cover",
    marginRight: 20,
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
