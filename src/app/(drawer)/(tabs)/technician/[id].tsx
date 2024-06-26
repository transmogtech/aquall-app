import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Stack, Link } from "expo-router";
import TechnicianListItem from "@/components/TechnicianList";

const TechnicianListLayout = () => {
  const technicianList = [
    {
      id: 1,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
    {
      id: 2,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
    {
      id: 3,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
    {
      id: 4,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
    {
      id: 5,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
    {
      id: 6,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
    {
      id: 7,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
    {
      id: 8,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
    {
      id: 9,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
    {
      id: 10,
      name: "Rajeev Ranjan",
      image: require("@assets/images/technician.png"),
      location: "Prakasam, Andhrapradesh",
      mobile: "9502513322",
      email: "rajeevkha2@gmail.com",
    },
  ];
  return (
    <View className="flex-1 justify-center items-center w-full p-0 m-0 font-[Satoshi]">
      <Stack.Screen options={{ headerTitle: "Corgil INC" }} />
      <SafeAreaView className="flex-1  w-full">
        <ScrollView className="flex-1 w-full">
          <FlatList
            data={technicianList}
            renderItem={({ item, index }) => <TechnicianListItem item={item} />}
            showsVerticalScrollIndicator={false}
            initialNumToRender={6}
            onEndReachedThreshold={1}
            contentContainerStyle={{ gap: 20 }}
            style={{ paddingVertical: 10 }}
            scrollEnabled={false}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TechnicianListLayout;

const styles = StyleSheet.create({});
