import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";

import CartProvider from "@/providers/CartProvider";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import { Pressable } from "react-native";
import MenuButton from "@/components/MenuButton";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Satoshi: require("../../assets/fonts/Satoshi-Regular.ttf"),
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    Quicksand: require("@assets/fonts/Quicksand-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { authState, onLogout } = useAuth();

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(user)/orders"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
