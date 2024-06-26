import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

import { Company } from "@/types";
type CompanyListItemProps = {
  company: Company;
};

const CompanyListItem = ({ company }: CompanyListItemProps) => {
  return (
    <Link href={`/technician/${company.id}`} asChild>
      <Pressable style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          key={company.id}
        >
          <Image
            source={company.image}
            resizeMode="cover"
            style={{ width: 70, height: 70 }}
          />
          <Text style={styles.productTitle}>{company.name}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default CompanyListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productTitle: {
    fontWeight: "600",
    textAlign: "center",
    padding: 8,
    fontSize: 12,
  },
  category: {
    color: "#5A5A5A",
  },
});
