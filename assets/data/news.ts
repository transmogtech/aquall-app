import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

// Register API Key here for more requests & APIs: https://newsapi.org

export async function getNews(page = 1, pageSize = 10, language = "all") {
  try {
    const response = await axios.get(
      `${API_URL}/news?language=${language}&page=${page}&limit=${pageSize}`
    );

    // // console.log(response.data);

    return response.data.news;
  } catch (error) {
    // console.log(error.response.data);
  }
}

export async function getLanguages() {
  try {
    const response = await axios.get(`${API_URL}/languages?status=Active`);
    // // console.log("Languages:");
    // // console.log(response.data.languages);
    return response.data.languages;
  } catch (error) {
    // console.log(error.response.data);
  }
}
