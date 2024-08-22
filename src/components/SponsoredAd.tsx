import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { API_URL } from "@/providers/AuthProvider";
import { CapitalizeFirstLetter } from "@/functions";
import { Link, useRouter } from "expo-router";

const SponsoredAd = ({ ad }) => {
  const router = useRouter();

  // console.log(ad);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{CapitalizeFirstLetter(ad?.name)}</Text>

      {/* <Link href={ad?.url || "#"} key={ad?._id} style={styles.container}>
        <Pressable style={styles.container}> */}
      <Image
        source={{ uri: `${API_URL}/${ad?.image}` }}
        resizeMode="cover"
        style={{ width: "100%", height: 200 }}
      />
      <View style={styles.container2}>
        <Button
          onPress={() => router.push(ad?.url || "#")}
          text={`Up to ${ad?.discount}% off`}
        />
        <Text style={styles.text}> Limited Time Deal</Text>
      </View>
      {/* </Pressable>
      </Link> */}
    </View>
  );
};

export default SponsoredAd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

    width: "100%",
    padding: 10,
  },
  title: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
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
    fontFamily: "Quicksand_600SemiBold",
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
