"use strict";
import { StyleSheet } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
  TextStyle: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
    color: "#000000",
  },
  SubTextStyle: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
    color: "#5A5A5A",
  },
  HeaderStyle: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
    color: Colors.light.blueColor,
  },
  errorTextStyle: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
    color: "#991B1B",
  },
  titleTextStyle: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 18,
    color: Colors.light.blueColor,
  },
});
