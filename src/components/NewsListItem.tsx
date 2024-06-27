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
    <Link href={`/news/${item._id}`} asChild>
      <Pressable style={styles.article}>
        {/* Caching image for better performance: https://github.com/DylanVann/react-native-fast-image */}
        <Image
          source={{ uri: `${API_URL}/${item.imageUrl}` }}
          style={styles.articleImage}
        />

        <View style={{ flex: 1 }}>
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
    padding: 10,
    width: "100%",
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: "row",
  },
  articleImage: {
    width: 150,
    height: 85,
    resizeMode: "cover",
    marginRight: 10,
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
    textAlign: "center",
  },
});
