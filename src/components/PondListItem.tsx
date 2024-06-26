import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const PondListItem = ({ item }: any) => {
  return (
    <Link href={`/ponds/${item.id}`} asChild>
      <Pressable style={styles.article}>
        <Image source={item.image} style={styles.userImage} />

        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{item.title}</Text>

          <Text style={styles.location}>{item.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default PondListItem;

const styles = StyleSheet.create({
  article: {
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
