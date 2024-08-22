import React from "react";
import { Text } from "react-native";
import AppStyles from "@/constants/AppStyles";

const CapitalizedText = ({ text, ...props }) => {
  let formattedText = text?.toLowerCase();
  formattedText = formattedText?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );

  return (
    <Text style={AppStyles.TextStyle} {...props}>
      {formattedText?.length < 11
        ? `${formattedText}`
        : `${formattedText.substring(0, 11)}...`}
    </Text>
  );
};

export default CapitalizedText;
