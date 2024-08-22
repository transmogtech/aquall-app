import React from "react";
import { Stack, router } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import LocalRoute from "@/components/LocalRoute";

const AuthLayout = () => {
  return (
    <LocalRoute>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
    </LocalRoute>
  );
};

export default AuthLayout;
