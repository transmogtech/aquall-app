import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

export async function getStates() {
  try {
    const response = await axios.get(`${API_URL}/states`);

    return response.data.states;
  } catch (error) {
    // console.log(error);
  }
}

export async function getDistricts(state: string) {
  try {
    const response = await axios.get(`${API_URL}/districts?stateId=${state}`);

    return response.data.districts;
  } catch (error) {
    // console.log(error);
  }
}

export async function getAreas(district: string) {
  try {
    const response = await axios.get(`${API_URL}/areas?districtId=${district}`);

    return response.data.areas;
  } catch (error) {
    // console.log(error);
  }
}

export async function getPincodes(area: string) {
  try {
    const response = await axios.get(`${API_URL}/pincodes?areaId=${area}`);
    return response.data.pincodes;
  } catch (error) {
    // console.log(error);
  }
}
