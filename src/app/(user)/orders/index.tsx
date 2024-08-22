import { FlatList } from "react-native";
import { getOrders } from "@assets/data/orders";
import OrderListItem from "@components/OrderListItem";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/providers/AuthProvider";

export default function OrdersScreen() {
  const [user, setUser] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/user/auth`);
        setUser(result.data);
      } catch (err) {
        // console.log(err);
      }
    };
    const fetchData = async () => {
      try {
        const result = await axios.get(`${API_URL}/user/auth`);
        setUser(result.data);
        // fetch orders data from API
        const response = await getOrders(result.data._id);
        // console.log(response);
        setOrders(response);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
    fetchData();
  }, []);
  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
