import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

export async function getOrders(userId) {
  try {
    const response = await axios.get(`${API_URL}/orders?userId=${userId}`);

    return response.data.orders;
  } catch (error) {
    // console.log(error.data);
  }
}

export async function getOrdersDetails(orderId) {
  try {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);

    return response.data;
  } catch (error) {
    // console.log(error.data);
  }
}
