import React from "react";
import { Stack, router } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

const AuthLayout = () => {
  const { authState } = useAuth();

  if (authState?.authenticated) {
    router.push("/home");
  }
  return <Stack></Stack>;
};

export default AuthLayout;
