import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { API_URL } from "@/providers/AuthProvider";

const ImageSlider = ({ images }) => {
  const { width } = Dimensions.get("window");
  const height = width * 0.5;

  const [active, setActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );

    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
      }}
    >
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={{
          width: width,
          height,
        }}
      >
        {images.map((image, index: number) => (
          <Image
            key={index}
            source={{ uri: `${API_URL}/${image.image}` }}
            style={{ width, height, resizeMode: "cover" }}
          />
        ))}
      </ScrollView>
      {/* <View style={styles.pagination}>
        {images.map((i, k) => (
          <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
            .
          </Text>
        ))}
      </View> */}
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  pagination: {
    position: "absolute",
    bottom: -15,
    alignSelf: "center",
    flexDirection: "row",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
});
