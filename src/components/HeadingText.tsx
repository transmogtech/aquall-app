import React from "react";
import { Text } from "react-native";
import AppStyles from "@/constants/AppStyles";

const HeadingText = ({ text }) => {
  let formattedText = text.toLowerCase();
  formattedText = formattedText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );

  return <Text style={AppStyles.HeaderStyle}>{formattedText}</Text>;
};

export default HeadingText;
