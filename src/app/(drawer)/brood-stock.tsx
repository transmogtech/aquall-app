import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";
import { Stack } from "expo-router";
import axios from "axios";
import { API_URL } from "@/providers/AuthProvider";

const BroodStockScreen = () => {
  const [pdf, setPdf] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/hatecheries-pdf`);
      setPdf(response.data.hatecheriespdf[0].pdf);
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  });
  const source = {
    uri: `${API_URL}/${pdf}`,
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Brood Stock",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Quicksand_600SemiBold",
          },
        }}
      />
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          // console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          // console.log(error);
        }}
        onPressLink={(uri) => {
          // console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};
export default BroodStockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
