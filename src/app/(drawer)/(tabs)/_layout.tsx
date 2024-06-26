import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@constants/Colors";
import { useColorScheme } from "@components/useColorScheme";
import { useClientOnlyValue } from "@components/useClientOnlyValue";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerToggleButton } from "@react-navigation/drawer";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: 2 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerLeft: () => (
          <DrawerToggleButton tintColor={Colors.light.background} />
        ),
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.background}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
        headerTintColor: Colors.light.background,
        headerStyle: {
          backgroundColor: Colors.light.blueColor,
        },
        headerTitleStyle: {
          fontSize: 16,
          color: Colors.light.background,
        },

        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ href: null, headerTitle: "Products" }}
      />
      <Tabs.Screen name="home" options={{ href: null, headerTitle: "Home" }} />

      <Tabs.Screen
        name="ponds"
        options={{ href: null, headerTitle: "Ponds" }}
      />

      <Tabs.Screen
        name="technician"
        options={{ href: null, headerTitle: "Technician" }}
      />

      <Tabs.Screen
        name="counts"
        options={{
          title: "Rates",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="line-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          headerTitle: "Products",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="shop" size={28} color={Colors.light.blueColor} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].background}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="briefcase" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: "Videos",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="youtube-play" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
