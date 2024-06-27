import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

export async function getCagegories() {
  try {
    const response = await axios.get(`${API_URL}/categories`);

    return response.data.categories;
  } catch (error) {
    console.log(error);
  }
}

export async function getAppSliderImages() {
  try {
    const response = await axios.get(`${API_URL}/app-slider-images`);

    return response.data.appsliderimages;
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts(category = "", limit = 3) {
  try {
    const response = await axios.get(
      `${API_URL}/products?categoryId=${category}&limit=${limit}`
    );

    return response.data.products;
  } catch (error) {
    console.log(error);
  }
}

export async function getLatestVideos() {
  try {
    const response = await axios.get(`${API_URL}/youtube-videos?limit=2`);

    return response.data.youtubevideos;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(userRole = "") {
  try {
    const response = await axios.get(
      `${API_URL}/user?userroleId=${userRole}&limit=2`
    );

    return response.data.users;
  } catch (error) {
    console.log(error);
  }
}

export async function getTechnicians() {
  try {
    const response = await axios.get(
      `${API_URL}/user?userroleId=6658f0a00db84a26d0d23198`
    );

    return response.data.users;
  } catch (error) {
    console.log(error);
  }
}

export async function getSponsoredAds(limit = 3) {
  try {
    const response = await axios.get(`${API_URL}/sponsored-ads`);
    console.log("sponsored Ad: ");
    console.log(response.data);
    return response.data.sponsoredads;
  } catch (error) {
    console.log(error);
  }
}

export const defaultUserImage =
  "https://www.gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd?s=200&r=pg&d=mm";
