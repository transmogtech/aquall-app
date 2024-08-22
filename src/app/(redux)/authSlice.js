import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const loadUserFromStorage = async (req, res) => {
  try {
    const user = await AsyncStorage.get("userInfo");
    return user ? JSON.parse(user) : null;
  } catch (err) { return null; }
}

const initialState = {
  user: null,
  isLoading: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${action.payload.token}`;

      AsyncStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      state.isLoading = false;
      axios.defaults.headers.common["Authorization"] = "";
      AsyncStorage.removeItem("userInfo");
    },
    setUserAction: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;


    }

  }
});

export const { loginAction, logoutAction, setUserAction } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const loadUser = () => async (dispatch) => {
  const user = await loadUserFromStorage();
  if (user) {
    dispatch(setUserAction(user));
  }
}