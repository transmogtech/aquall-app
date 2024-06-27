import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { API_URL } from "@/providers/AuthProvider";

const SponsoredAd = ({ ad }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ad?.name}</Text>
      <Image
        source={{ uri: `${API_URL}/${ad?.image}` }}
        resizeMode="cover"
        style={{ width: "100%", height: 200 }}
      />
      <View style={styles.container2}>
        <Button text={`Up to ${ad?.discount}% off`} />
        <Text style={styles.text}> Limited Time Deal</Text>
      </View>
      {/* <Text style={styles.productTitle}>{product}</Text> */}
      {/* <Text style={styles.price}>From ₹30 </Text> */}
    </View>
  );
};

export default SponsoredAd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 2,
    paddingHorizontal: 20,
  },

  bold: { fontWeight: "bold" },
  text: {
    fontWeight: "bold",
    color: Colors.light.blueColor,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "600",
    paddingLeft: 20,
  },
  price: {
    fontSize: 16,
    paddingLeft: 20,
  },
});
