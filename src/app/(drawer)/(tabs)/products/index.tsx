import { View } from "@components/Themed";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import ProductListItem from "@components/ProductListItem";
import React, { useMemo, useState } from "react";
import Colors from "@/constants/Colors";
import axios from "axios";
import { API_URL } from "@/providers/AuthProvider";
import { useLocalSearchParams } from "expo-router";
import { getCagegories } from "@assets/data/home";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import CategoryListItem from "@/components/CategoryListItem";
export default function TabOneScreen() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { category } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(category || "");
  // console.log("Category called: " + category);

  const fetchData = async (category) => {
    setLoading(true);

    try {
      var url = "";

      if (category) {
        url = `${API_URL}/products?categoryId=${category}`;
      } else {
        url = `${API_URL}/products`;
      }
      // // console.log(url);
      const response = await axios.get(url);

      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      // console.log(error.data);
    }
  };
  useMemo(() => {
    const fetchCategories = async () => {
      const result = await getCagegories();

      const catArr = [{ id: "", title: "All" }];

      result.forEach((category) => {
        catArr.push({
          id: category._id,
          title: category.title,
        });
      });

      setCategories(catArr);

      // setCategories(result);
    };

    fetchCategories();

    // console.log("Active Category:  " + activeTab);
    setActiveTab(category);

    fetchData(category);
  }, [category]); // eslint-disable-line

  const filterProducts = (category: any) => {
    setActiveTab(category);
    fetchData(category);
    // router.push(`/products/${category}`);
  };

  return (
    <SafeAreaView>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {/* <View
          style={[
            styles.tab,
            (activeTab === "" || activeTab == undefined) && styles.activeTab,
          ]}
        >
          <TouchableOpacity onPress={() => filterProducts("")}>
            <Text
              style={[
                styles.tabText,
                (activeTab === "" || activeTab == undefined) &&
                  styles.activeTabText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
        </View> */}
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryListItem
              category={item}
              activeTab={activeTab}
              filterProducts={filterProducts}
            />
          )}
          horizontal={true}
          contentContainerStyle={{ gap: 20 }}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
        {/* {categories &&
          categories.map((row, index) => {
            return (
              <TouchableOpacity
                style={[styles.tab, activeTab === row._id && styles.activeTab]}
                onPress={() => filterProducts(row._id)}
                key={index}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === row._id && styles.activeTabText,
                  ]}
                >
                  {row.title}
                </Text>
              </TouchableOpacity>
            );
          })} */}
      </ScrollView>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductListItem product={item} />}
          numColumns={2}
          contentContainerStyle={{ gap: 20 }}
          columnWrapperStyle={{ gap: 20 }}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          style={{ padding: 20 }}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  tabsContainer: {
    padding: 8,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
