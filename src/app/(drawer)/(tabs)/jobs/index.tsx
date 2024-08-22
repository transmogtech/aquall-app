import { View } from "@components/Themed";
import {
  FlatList,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
// import jobs from "@assets/data/jobs";
import JobListItem from "@/components/JobListItem";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
export default function TabOneScreen() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs`);

        setJobs(response.data.jobs);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("@assets/images/Backgroundimage.png")}
        resizeMode="cover"
        imageStyle={{ opacity: 0.2 }}
      >
        <View style={styles.overlay}>
          <FlatList
            data={jobs}
            renderItem={({ item }) => <JobListItem job={item} />}
            numColumns={2}
            contentContainerStyle={{ gap: 20 }}
            columnWrapperStyle={{ gap: 20 }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  overlay: {
    marginVertical: 20,
    // backgroundColor: "rgba(211,211,211,0.2)",
  },
});
