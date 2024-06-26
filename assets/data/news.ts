import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

// Register API Key here for more requests & APIs: https://newsapi.org
const API_KEY = "ce52845d6e754123b3ecf9f68006b846";

export async function getNews(page = 1, pageSize = 10, language = "all") {
  try {
    const response = await axios.get(
      `${API_URL}/news?language=${language}&page=${page}&limit=${pageSize}`
    );

    return response.data.news;
  } catch (error) {
    console.log(error.response.data);
  }
}
