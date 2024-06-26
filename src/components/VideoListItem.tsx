import { StyleSheet, Alert, Pressable, Image, Modal } from "react-native";
import { useRef, useState, useCallback } from "react";
import { Text, View } from "./Themed";
import Colors from "@constants/Colors";
import { video } from "@/types";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
// import YoutubePlayer from "react-native-youtube-iframe";

type VideoListItemProps = {
  video: video;
};

const VideoListItem = ({ video }: VideoListItemProps) => {
  // const [playing, setPlaying] = useState(false);
  const [modalVisible, setModalVisibile] = useState(false);

  const openModal = () => {
    setModalVisibile(true);
  };

  const closeModal = () => {
    setModalVisibile(false);
  };
  // get video id
  const videoId = video.url.split("https://youtu.be/")[1];
  const videoImg = "https://img.youtube.com/vi/" + videoId + "/0.jpg";
  // console.log(videoImg);
  // const onStateChange = useCallback((state: any) => {
  //   if (state === "ended") {
  //     setPlaying(false);
  //     Alert.alert("video has finished playing!");
  //   }
  // }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);
  return (
    <Link href={`/videos/${video._id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          {/* <YoutubePlayer
            play={playing}
            height={200}
            webViewStyle={styles.video}
            videoId={videoId}
            onChangeState={onStateChange}
          /> */}

          <Image
            source={{ uri: videoImg }}
            style={styles.video}
            resizeMode="cover"
          />

          <Text style={styles.title}> {video.title}</Text>
          <Text style={styles.date}> {video.created}</Text>
        </View>
      </Pressable>
    </Link>
  );
};
export default VideoListItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
  },
});
