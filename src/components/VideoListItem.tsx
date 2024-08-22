import { StyleSheet, Alert, Pressable, Image, Modal } from "react-native";
import { useRef, useState, useCallback } from "react";
import { Text, View } from "./Themed";
import Colors from "@constants/Colors";
import { video } from "@/types";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
// import YoutubePlayer from "react-native-youtube-iframe";
import moment from "moment";
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
  // // console.log(videoImg);
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

          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.date}>
            {moment(video.created).format("DD-MM-YYYY")}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};
export default VideoListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
    padding: 10,
  },
  date: {
    fontFamily: "Quicksand_500Medium",
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
