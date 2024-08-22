import {
  StyleSheet,
  Alert,
  ImageBackground,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { useRef, useState, useCallback, useEffect } from "react";
import Colors from "@constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
import moment from "moment";
// import news from "@assets/data/news";
import { format } from "date-fns";
import React from "react";
import HTMLView from "react-native-htmlview";
const NewsItem = () => {
  const { id } = useLocalSearchParams();
  const [news, setNews] = useState([]);
  const [videoId, setVideoId] = useState([]);
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/news/${id}`);
        // console.log(response.data);
        setVideoId(response.data.videoUrl?.split("https://youtu.be/")[1]);
        setNews(response.data);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 p-0 m-0" style={styles.container}>
      <Stack.Screen options={{ title: "News" }} />

      <ScrollView className="flex-1">
        <ImageBackground
          source={require("@assets/images/Backgroundimage.png")}
          resizeMode="cover"
          className="flex-1 w-full"
        >
          <Text style={styles.title}>{news.title}</Text>
          <Text style={styles.date}>
            {moment(news.created).format("DD-MM-YYYY")} |{" "}
            {moment(news.created).format("HH:mm:ss")}
          </Text>
          <Image
            source={{ uri: `${API_URL}/${news.imageUrl}` }}
            style={styles.video}
            resizeMode="cover"
          />
          <Text style={{ fontWeight: "bold", fontSize: 20, padding: 20 }}>
            Introduction
          </Text>
          <HTMLView value={news.description} className="p-4" />
          {/* <Text style={styles.text}>{news.description}</Text> */}
          {videoId && (
            <YoutubePlayer
              play={playing}
              height={400}
              webViewStyle={styles.video}
              videoId={videoId}
              onChangeState={onStateChange}
            />
          )}
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
export default NewsItem;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
    color: Colors.light.text,
    paddingHorizontal: 20,
  },
  date: {
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  video: {
    alignSelf: "center",
    width: "90%",
    height: 400,
    borderRadius: 10,
  },
  text: {
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    textAlign: "justify",
    paddingVertical: 20,
  },
});
