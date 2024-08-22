import {
  ImageBackground,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Colors from "@/constants/Colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { API_URL, useAuth } from "@/providers/AuthProvider";
import axios from "axios";
import ProtectRoute from "@/components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../(redux)/authSlice";
const CustomDrawerContent = (props: any) => {
  const pathname = usePathname();
  const screenHeight = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/user/auth`);
        setUser(result.data);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
      }
    };

    loadUser();
  }, [pathname]);

  const handleLogout = async () => {
    dispatch(logoutAction());
  };
  return (
    <DrawerContentScrollView {...props} style={{ flex: 1 }}>
      <ImageBackground
        source={require("@assets/images/menu_bg.jpeg")}
        style={{
          padding: 10,
          backgroundColor: Colors.light.blueColor,
          height: screenHeight,
        }}
        imageStyle={{ opacity: 0.1 }}
        resizeMode="cover"
      >
        {!isLoading && user && (
          <View style={{ padding: 20 }}>
            <Image
              source={{
                uri: user?.avatar
                  ? `${API_URL}/${user.avatar}`
                  : "https://www.gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd?s=200&r=pg&d=mm",
              }}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "500",
                fontSize: 18,
                paddingTop: 10,
                color: Colors.light.background,
                fontFamily: "Quicksand_600SemiBold",
              }}
            >
              {user?.name}
            </Text>
          </View>
        )}

        <DrawerItem
          icon={() => (
            <Ionicons size={18} color={Colors.light.background} name="home" />
          )}
          label="Home"
          labelStyle={styles.navItemLable}
          style={{
            backgroundColor:
              pathname == "/home" ? Colors.light.blueColor : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(tabs)/home");
          }}
        />
        <DrawerItem
          icon={() => (
            <Ionicons size={18} color={Colors.light.background} name="cart" />
          )}
          label="Cart"
          labelStyle={styles.navItemLable}
          style={{
            backgroundColor:
              pathname == "/cart" ? Colors.light.blueColor : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/cart");
          }}
        />
        <DrawerItem
          icon={() => (
            <MaterialCommunityIcons
              name="order-bool-ascending"
              size={18}
              color={Colors.light.background}
            />
          )}
          label="Orders"
          labelStyle={styles.navItemLable}
          style={{
            backgroundColor:
              pathname == "/orders" ? Colors.light.blueColor : "transparent",
          }}
          onPress={() => {
            router.push("/(user)/orders");
          }}
        />
        <DrawerItem
          icon={() => (
            <Ionicons size={18} color={Colors.light.background} name="list" />
          )}
          label="Brood Stock"
          labelStyle={styles.navItemLable}
          style={{
            backgroundColor:
              pathname == "/brood-stock"
                ? Colors.light.blueColor
                : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/brood-stock");
          }}
        />

        {/* <DrawerItem
          icon={() => (
            <Ionicons
              size={18}
              color={Colors.light.background}
              name="information-circle"
            />
          )}
          label="About Us"
          labelStyle={styles.navItemLable}
          style={{
            backgroundColor:
              pathname == "/about-us" ? Colors.light.blueColor : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/about-us");
          }}
        /> */}
        <DrawerItem
          icon={() => (
            <FontAwesome
              name="users"
              size={18}
              color={Colors.light.background}
            />
          )}
          label="Technician"
          labelStyle={styles.navItemLable}
          style={{
            backgroundColor:
              pathname == "/technician"
                ? Colors.light.blueColor
                : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(tabs)/technician");
          }}
        />
        <DrawerItem
          icon={() => (
            <FontAwesome
              name="user-circle-o"
              size={18}
              color={Colors.light.background}
            />
          )}
          label="Profile"
          labelStyle={styles.navItemLable}
          style={{
            backgroundColor:
              pathname == "/profile" ? Colors.light.blueColor : "transparent",
          }}
          onPress={() => {
            router.push("/(user)/profile");
          }}
        />
        <DrawerItem
          icon={() => (
            <MaterialIcons
              name="logout"
              size={18}
              color={Colors.light.background}
            />
          )}
          label="Logout"
          labelStyle={styles.navItemLable}
          onPress={handleLogout}
        />
      </ImageBackground>
    </DrawerContentScrollView>
  );
};

const DrawerLayout = () => {
  return (
    <ProtectRoute>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerStyle: { backgroundColor: Colors.light.blueColor },
            drawerLabelStyle: {
              fontSize: 16,
              color: Colors.light.background,
            },
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
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        />
      </GestureHandlerRootView>
    </ProtectRoute>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({
  navItemLable: {
    marginLeft: -20,
    fontSize: 18,
    color: Colors.light.background,
    fontFamily: "Quicksand_600SemiBold",
  },
});
