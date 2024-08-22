import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Pressable,
} from "react-native";
import { format } from "date-fns";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { API_URL } from "@/providers/AuthProvider";

export default function Article({ item }) {
  const openLink = () => {
    const url = "/news/" + item.id;

    // https://reactnative.dev/docs/linking
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Broken Link!");
      }
    });
  };

  // const publishedFromNow = formatDistanceToNow(new Date(item.publishedAt));
  const date = format(new Date(item.created), "dd-MM-yyyy");
  const time = format(new Date(item.created), "HH:mm:ss");

  return (
    <Link href={`/news/${item._id}`} key={item._id} asChild>
      <Pressable style={styles.article}>
        <Image
          source={{ uri: `${API_URL}/${item.imageUrl}` }}
          style={styles.articleImage}
        />

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.articleTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.articlePublishedAt}>
            {date} | {time}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  article: {
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
  articleImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 20,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  articleDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  articlePublishedAt: {
    fontSize: 14,
  },
});
