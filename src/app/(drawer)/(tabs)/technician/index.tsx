import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CompanyListItem from "@/components/TechnicianCompanyList";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
const CompanyListLayout = () => {
  const [technician, setTechnician] = useState([]);
  const [loading, setLoading] = useState(false);
  const PRIMARY_COLOR = "#e74c3c";

  useEffect(() => {
    setLoading(true);
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user?userroleId=6658f0a00db84a26d0d23198&limit=20&status=active`
        );

        setTechnician(response.data.users);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchTechnician();
    setLoading(false);
  }, []);
  return (
    <ScrollView className="flex-1 p-4">
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        </View>
      ) : (
        <View className="flex-1">
          <FlatList
            data={technician}
            renderItem={({ item, index }) => <CompanyListItem item={item} />}
            numColumns={1}
            contentContainerStyle={{ gap: 20 }}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default CompanyListLayout;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
