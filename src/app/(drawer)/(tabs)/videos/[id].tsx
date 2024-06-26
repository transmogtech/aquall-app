import {
  StyleSheet,
  Alert,
  ImageBackground,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { useRef, useState, useCallback, useEffect } from "react";
import Colors from "@constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
// import videos from "@assets/data/video";

const VideoItem = () => {
  const [playing, setPlaying] = useState(false);
  const [video, setVideo] = useState([]);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/youtube-videos/${id}`);

        setVideo(response.data);
        setVideoId(response.data.url.split("https://youtu.be/")[1]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // eslint-disable-line

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const { id } = useLocalSearchParams();

  // const video = videos.find((p) => p.id.toString() === id);

  if (!video) {
    return <Text>video not found</Text>;
  }
  // get video id

  return (
    <View className="flex-1 p-0 m-0" style={styles.container}>
      <Stack.Screen options={{ title: "Video page" }} />

      <SafeAreaView className="flex-1">
        <ImageBackground
          source={require("@assets/images/Backgroundimage.png")}
          resizeMode="cover"
          className="flex-1 w-full"
        >
          <Text style={styles.title}> {video.title}</Text>
          <Text style={styles.date}> {video.created}</Text>
          <YoutubePlayer
            play={playing}
            height={400}
            webViewStyle={styles.video}
            videoId={videoId}
            onChangeState={onStateChange}
          />
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};
export default VideoItem;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
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
});
