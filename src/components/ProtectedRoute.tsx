import { ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/(auth)/login");
    }
  }, [user]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (!user) {
    return null;
  }
  return children;
};

export default ProtectRoute;
