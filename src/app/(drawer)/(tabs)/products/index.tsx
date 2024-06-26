import { View } from "@components/Themed";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import ProductListItem from "@components/ProductListItem";
import { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import axios from "axios";
import { API_URL } from "@/providers/AuthProvider";
import { router, useLocalSearchParams } from "expo-router";
import { getCagegories, getProducts } from "@assets/data/home";
export default function TabOneScreen() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { category } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(category || "");

  const fetchData = async (category) => {
    try {
      const response = await axios.get(
        `${API_URL}/products?categoryId=${category}`
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCagegories();

      setCategories(result);
    };

    fetchCategories();

    fetchData(category);
  }, []);

  const filterProducts = (category: any) => {
    setActiveTab(category);
    fetchData(category);
    // router.push(`/products/${category}`);
  };

  return (
    <SafeAreaView>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "" && styles.activeTab]}
          onPress={() => filterProducts("")}
        >
          <Text
            style={[styles.tabText, activeTab === "" && styles.activeTabText]}
          >
            All
          </Text>
        </TouchableOpacity>
        {categories &&
          categories.map((category) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === category._id && styles.activeTab,
                ]}
                onPress={() => filterProducts(category._id)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === category._id && styles.activeTabText,
                  ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ gap: 20 }}
        style={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "transparent",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  activeTab: {
    backgroundColor: Colors.light.blueColor,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  activeTabText: {
    color: Colors.light.background,
    fontWeight: "bold",
  },
  tabText: {
    fontSize: 12,
  },
});
