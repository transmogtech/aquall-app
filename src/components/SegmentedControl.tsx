import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Animated, {
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type SegmentedControlProps = {
  options: [];
  selectedOption: string;
  onOptionChange?: (option: string) => void;
};
const SegmentedControl = ({
  options,
  selectedOption,
  onOptionChange,
}: SegmentedControlProps) => {
  const { width: windowWidth } = useWindowDimensions();

  const SegmentedControlWidth = windowWidth - 40;

  const itemWidth = (SegmentedControlWidth - 20) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(itemWidth * options.indexOf(selectedOption) + 10),
    };
  }, [selectedOption, options, itemWidth]);
  return (
    <View
      style={[
        styles.container,
        { width: SegmentedControlWidth, paddingLeft: 10 },
      ]}
    >
      <Animated.View
        style={[
          {
            width: itemWidth - 10,
          },
          rStyle,
          styles.activeBox,
        ]}
      />
      {options.map((option) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onOptionChange?.(option._id);
            }}
            key={option._id}
            style={{
              width: itemWidth,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{option.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SegmentedControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    backgroundColor: Colors.light.baseGray05,
    borderRadius: 20,
  },
  activeBox: {
    position: "absolute",

    height: "80%",
    top: "10%",
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.light.baseGray05,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    // elevation: 3,
  },
});
