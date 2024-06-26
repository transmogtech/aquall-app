import { StyleSheet, Image, View, Text, ImageBackground } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Colors from "@/constants/Colors";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default CustomDrawerContent;

export default function HeaderMenu() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      ></Drawer>
    </GestureHandlerRootView>
  );
}
