import { View, Text, StyleSheet, Image } from "react-native";
import React, { Fragment } from "react";
import Colors from "../constants/Colors";
import { defaultImage } from "./ProductListItem";
import { API_URL } from "@/providers/AuthProvider";
import { CapitalizeFirstLetter } from "@/functions";

type OrderItemListItemProps = {
  item: [];
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  // console.log(item);
  return (
    <Fragment>
      <View style={styles.container}>
        <Image
          source={{
            uri: `${API_URL}/${item.productId.imageUrl}` || defaultImage,
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            {CapitalizeFirstLetter(item.productId.name)}
          </Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.price}>
              Price: {item.productId.price?.toFixed(2)}
            </Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
          </View>
        </View>
      </View>
    </Fragment>
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
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 20,
    marginBottom: 5,
    color: Colors.light.blueColor,
  },
  subtitleContainer: {
    fontSize: 16,
    marginBottom: 5,
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
  },
  price: {
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
  },
});

export default OrderItemListItem;
