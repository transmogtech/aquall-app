import axios from "axios";

const API_URL = "http://162.241.149.132:3030";

const login = async ({ email, password }) => {
  try {

    const result = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
      isMobileLogin: true,
    });

    // console.log(result);
    // setAuthState({
    //   token: result?.data.token,
    //   authenticated: true,
    // });

    // await SecureStore.setItemAsync(JWT_KEY, result.data.token);
    // axios.defaults.headers.common["Authorization"] =
    //   `Bearer ${result.data.token}`;
    return result.data;
  }
  catch (error) {
    // console.log(error.response.data);
    return { error: error.response.data.errors[0].message };
  }

}

const register = async (email, password) => {
  try {
    const formData = {
      name,
      email,
      mobile,
      password,
      stateId: state,
      districtId: district,
      areaId: area,
      userroleId: role,
      otp,
    };
    const response = await axios.post(`${API_URL}/user/signup`, formData);

    // // console.log(result.data);
    // setAuthState({
    //   token: result?.data.token,
    //   authenticated: true,
    // });

    // await SecureStore.setItemAsync(JWT_KEY, result.data.token);
    // axios.defaults.headers.common["Authorization"] =
    //   `Bearer ${result.data.token}`;
    return result.data;
  } catch (error) {
    // return { error: true, msg: (error as any).response.data.errors.message };
    // console.log(error);
  }
}

export { login, register };