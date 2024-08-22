import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Order } from "@/types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";
import Colors from "@/constants/Colors";
import AppStyles from "@/constants/AppStyles";
import { CapitalizeFirstLetter } from "@/functions";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: [];
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  // // console.log(order);
  return (
    <Link href={`/orders/${order._id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.orderId}</Text>
          <Text style={AppStyles.SubTextStyle}>
            {dayjs(order.created).fromNow()}
          </Text>
          <Text style={AppStyles.TextStyle}>
            {CapitalizeFirstLetter(order.status)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
    marginVertical: 5,
    color: Colors.light.blueColor,
  },
  time: {
    color: "gray",
  },
  status: {
    fontWeight: "500",
  },
});

export default OrderListItem;
