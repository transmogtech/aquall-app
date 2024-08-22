import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text, Image } from "react-native";

import Colors from "@constants/Colors";
import { useColorScheme } from "@components/useColorScheme";
import { useClientOnlyValue } from "@components/useClientOnlyValue";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useCart } from "@/providers/CartProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: 2 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { items } = useCart();
  // console.log("Cart size: " + items.length);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.blueColor,
        tabBarLabelStyle: {
          fontSize: 14,
          paddingVertical: 10,
          fontFamily: "Quicksand_600SemiBold",
        },
        tabBarStyle: {
          height: 90,
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
        tabBarIconStyle: { marginTop: 10 },
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
                <View>
                  <Image
                    source={require("@assets/images/cart.png")}
                    style={{ width: 24, height: 24, marginRight: 10 }}
                  />

                  <Text
                    style={{
                      color: "white",
                      position: "absolute",
                      top: -5,
                      right: 22,
                      zIndex: 999,
                      fontSize: 12,
                      fontFamily: "Quicksand_500Medium",
                    }}
                  >
                    {items.length > 0 && items.length}
                  </Text>
                </View>
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
          fontFamily: "Quicksand_600SemiBold",
        },

        headerTitleAlign: "center",
      }}
    >
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
          title: "Aqua News",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Shop",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="shop" size={40} color={color} />
          ),
          tabBarIconStyle: {
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            borderTopLeftRadius: 21,
            borderTopRightRadius: 21,
          },
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <View>
                    <Image
                      source={require("@assets/images/cart.png")}
                      style={{ width: 24, height: 24, marginRight: 10 }}
                    />

                    <Text
                      style={{
                        color: "white",
                        position: "absolute",
                        top: -5,
                        right: 22,
                        zIndex: 999,
                        fontSize: 12,
                        fontFamily: "Quicksand_500Medium",
                      }}
                    >
                      {items.length > 0 && items.length}
                    </Text>
                  </View>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Classified",
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
