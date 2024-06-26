import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React from "react";
import companies from "@assets/data/companies";
import CompanyListItem from "@/components/TechnicianCompanyList";
const CompanyListLayout = () => {
  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="flex-1">
        <FlatList
          data={companies}
          renderItem={({ item, index }) => <CompanyListItem company={item} />}
          numColumns={3}
          contentContainerStyle={{ gap: 20 }}
          columnWrapperStyle={{ gap: 20 }}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default CompanyListLayout;

const styles = StyleSheet.create({});
