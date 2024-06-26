import React from "react";
import { Stack } from "expo-router";

const OrderStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Orders" }} />
    </Stack>
  );
};

export default OrderStack;
