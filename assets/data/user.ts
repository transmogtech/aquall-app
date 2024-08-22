import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

export async function getUserRoles() {
  try {
    const response = await axios.get(`${API_URL}/user-roles`);

    return response.data.userroles;
  } catch (error) {
    // console.log(error);
  }
}

export async function signup(formData: {}) {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, formData);
    // // console.log(response);
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function otp_verification(otp: number, userId: string) {
  try {
    const response = await axios.post(`${API_URL}/user/otp-verification`, {
      otp,
      userId,
    });
    return response.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
}
