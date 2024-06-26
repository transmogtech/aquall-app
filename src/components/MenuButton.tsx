import { Pressable } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function MenuButton() {
  const navigation = useNavigation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <Feather name="menu" size={24} color="white" />
    </Pressable>
  );
}
