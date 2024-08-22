import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { forwardRef } from "react";
import AppStyles from "@/constants/AppStyles";
type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <Text style={[styles.text]}>{text}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.blueColor,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    fontFamily: "Quicksand_600SemiBold",
    color: "#ffffff",
  },
});

export default Button;
