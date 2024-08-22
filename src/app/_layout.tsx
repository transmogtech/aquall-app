import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  createNavigationContainerRef,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";

import CartProvider from "@/providers/CartProvider";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import {
  Quicksand_400Regular,
  Quicksand_700Bold,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";
import { Provider } from "react-redux";
import { store } from "./(redux)/store";
import LocalRoute from "@/components/LocalRoute";
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
    "Quicksand-Regular": require("@assets/fonts/Quicksand-Regular.ttf"),
    Quicksand_400Regular,
    Quicksand_700Bold,
    Quicksand_600SemiBold,
    Quicksand_500Medium,
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
  return (
    <Provider store={store}>
      <ThemeProvider value={DefaultTheme}>
        <CartProvider>
          <Layout />
        </CartProvider>
      </ThemeProvider>
    </Provider>
  );
}

export const Layout = () => {
  return (
    <LocalRoute>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)/orders" options={{ headerShown: false }} />
      </Stack>
    </LocalRoute>
  );
};
