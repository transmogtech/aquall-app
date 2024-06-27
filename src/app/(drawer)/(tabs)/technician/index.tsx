import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import companies from "@assets/data/companies";
import CompanyListItem from "@/components/TechnicianCompanyList";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";
const CompanyListLayout = () => {
  const [technician, setTechnician] = useState([]);

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user?userroleId=6658f0a00db84a26d0d23198`
        );

        setTechnician(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTechnician();
  }, []);
  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="flex-1">
        <FlatList
          data={technician}
          renderItem={({ item, index }) => <CompanyListItem item={item} />}
          numColumns={1}
          contentContainerStyle={{ gap: 20 }}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default CompanyListLayout;

const styles = StyleSheet.create({});
