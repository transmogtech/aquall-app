import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ToastAndroid,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { getOrdersDetails } from "@assets/data/orders";
import OrderItemListItem from "@components/OrderItemListItem";
import OrderListItem from "@components/OrderListItem";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch orders data from API
        const response = await getOrdersDetails(id);
        // // console.log(response.order);
        setOrder(response.order);
        setProducts(response.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const UpdateOrder = async () => {
    axios
      .patch(`${API_URL}/orders/${order._id}`, {
        status: "cancelled",
        comment,
      })
      .then((response) => {
        // console.log(response);
        setModalVisible(false);
        ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
        router.push("/(user)/orders");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Stack.Screen options={{ title: `Order #${order.orderId}` }} />

        <OrderListItem order={order} />

        <FlatList
          data={products}
          renderItem={({ item }) => <OrderItemListItem item={item} />}
          contentContainerStyle={{ gap: 10 }}
        />

        {order.status == "pending" && (
          <Button text="Cancel Order" onPress={toggleModal} />
        )}
        {order.status == "cancelled" && (
          <View
            style={{
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
            }}
          >
            <Text style={{ fontFamily: "Quicksand_600SemiBold", fontSize: 16 }}>
              Reason for cancellation:{" "}
            </Text>
            <Text style={{ fontFamily: "Quicksand_500Medium", fontSize: 16 }}>
              {order.comment}
            </Text>
          </View>
        )}
      </View>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: Colors.light.background,
          }}
        >
          <Text
            className="text-gray-500 m-3 text-[16px]"
            style={{ fontFamily: "Quicksand_500Medium" }}
          >
            Reason for cancellation
          </Text>
          <TextInput
            multiline={true}
            onChangeText={setComment}
            value={comment}
            numberOfLines={10}
            style={{
              textAlignVertical: "top",
              backgroundColor: "#f0f0f0",
              borderRadius: 10,
              padding: 10,
            }}
          />

          <Button text="Save" onPress={UpdateOrder} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
