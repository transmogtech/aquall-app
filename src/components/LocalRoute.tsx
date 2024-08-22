import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const LocalRoute = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/(drawer)/(tabs)/home");
    }
  }, [user]);

  return children;
};

export default LocalRoute;
