import { StyleSheet, FlatList, SafeAreaView } from "react-native";

import EditScreenInfo from "@components/EditScreenInfo";
import { Text, View } from "@components/Themed";
// import videos from "@assets/data/video";
import VideoListItem from "@/components/VideoListItem";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/providers/AuthProvider";
// import videos from "@assets/data/video";
import axios from "axios";
export default function TabTwoScreen() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/youtube-videos`);

        setVideos(response.data.youtubevideos);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []); //eslint-disable-line
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoListItem video={item} />}
        contentContainerStyle={{ gap: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
