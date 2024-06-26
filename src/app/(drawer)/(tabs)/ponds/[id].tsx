import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { useRef, useState, useCallback } from "react";
import Colors from "@constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import ponds from "@assets/data/ponds";
import { ScrollView } from "react-native-gesture-handler";

const PondItem = () => {
  const { id } = useLocalSearchParams();

  const pond = ponds.find((p) => p.id.toString() === id);

  if (!pond) {
    return <Text>pond not found</Text>;
  }

  return (
    <View className="flex-1 p-0 m-0">
      <Stack.Screen options={{ title: "Pond Details" }} />

      <SafeAreaView className="flex-1">
        <ScrollView>
          <ImageBackground
            source={require("@assets/images/Backgroundimage.png")}
            resizeMode="cover"
            className="flex-1 w-full"
          >
            <Text style={styles.title}> {pond.title}</Text>
            <Text style={styles.date}> {pond.username}</Text>
            <Image
              source={pond.image}
              resizeMode="cover"
              className="w-full h-[400px]"
            />
            <View style={styles.container}>
              <Text style={styles.title}>Pond Type:</Text>
              <Text style={styles.date}>{pond.type}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Pond Lease/Rent:</Text>
              <Text style={styles.date}>{pond.rent}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Pond Size:</Text>
              <Text style={styles.date}>{pond.size}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Price:</Text>
              <Text style={styles.date}>{pond.price}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Posted by:</Text>
              <Text style={styles.date}>{pond.posted_by}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Mobile Number:</Text>
              <Text style={styles.date}>{pond.mobile}</Text>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default PondItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.light.text,
    paddingHorizontal: 20,
  },
  date: {
    fontSize: 18,
    paddingHorizontal: 20,
  },
  video: {
    alignSelf: "center",
    width: "90%",
    height: 400,
    borderRadius: 10,
  },
});
