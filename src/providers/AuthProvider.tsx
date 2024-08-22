import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const JWT_KEY = "NEWAQUALLAPP";

export const API_URL = "http://162.241.149.132:3030";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(JWT_KEY);
      // // console.log(token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true });
      } else {
        setAuthState({ token: null, authenticated: false });
      }
    };

    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/auth/signup`, { email, password });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    // // console.log("email: " + email + " password: " + password);
    // // console.log(`${API_URL}/auth/login`);
    try {
      const result = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
        isMobileLogin: true,
      });

      // console.log(result.data);
      setAuthState({
        token: result?.data.token,
        authenticated: true,
      });

      await SecureStore.setItemAsync(JWT_KEY, result.data.token);
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${result.data.token}`;
      return result;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.errors.message };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(JWT_KEY);
    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
