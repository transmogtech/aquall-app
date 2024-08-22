import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { uniqBy } from "lodash";
import { getNews, getLanguages } from "@assets/data/news";
import NewsItemListItem from "@/components/NewsListItem";
import {
  SegmentedButtons,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import Colors from "@/constants/Colors";
import SegmentedControl from "@/components/SegmentedControl";

const PAGE_SIZE = 20;
const PRIMARY_COLOR = "#e74c3c";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: "white",
  },
};

export default function WorldwideNews() {
  const [isLoading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState("664097ec7986f95eac9e4b3e");
  const [languages, setLanguages] = useState([]);
  const hasMoreData = useRef(true);
  const [activeTab, setActiveTab] = useState(value || "");

  const fetchData = async (language: string) => {
    // if (!hasMoreData.current) return;
    setLoading(true);
    setRefreshing(true);
    const newArticles = await getNews(page, 20, language);

    if (newArticles.length < PAGE_SIZE) {
      hasMoreData.current = false;
    }
    setArticles(newArticles);
    setValue(language);
    setActiveTab(language);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await getLanguages();
      setLanguages(response);
      // // console.log("languages: ");
      // // console.log(response);
    };

    fetchData(value);
    fetchLanguages();
    setLoading(false);
    setRefreshing(false);
  }, [page]);

  const refreshData = () => {
    setPage(1);
    setRefreshing(true);
    setArticles([]);
    hasMoreData.current = true;
  };

  const renderArticle = ({ item }) => <NewsItemListItem item={item} />;
  const renderDivider = () => <View style={styles.articleSeparator}></View>;
  const renderFooter = () => (
    <View style={styles.center}>
      {hasMoreData.current && <ActivityIndicator color={PRIMARY_COLOR} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@assets/images/Backgroundimage.png")}
        resizeMode="cover"
        className="justify-center flex-1 w-full"
        imageStyle={{ opacity: 0.2 }}
      >
        <View style={styles.content}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1,
            }}
            style={styles.tabsContainer}
          >
            {languages &&
              languages.map((language: any) => {
                return (
                  <View
                    key={language._id}
                    style={[
                      styles.tab,
                      activeTab === language._id && styles.activeTab,
                    ]}
                  >
                    <TouchableOpacity onPress={() => fetchData(language._id)}>
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === language._id && styles.activeTabText,
                        ]}
                      >
                        {language.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </ScrollView>

          {isLoading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color={PRIMARY_COLOR} />
            </View>
          ) : (
            <FlatList
              data={articles}
              renderItem={renderArticle}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderDivider}
              ListFooterComponent={renderFooter}
              initialNumToRender={6}
              // onEndReached={() => setPage((page) => page + 1)}
              onEndReachedThreshold={1}
              onRefresh={refreshData}
              refreshing={refreshing}
              style={{ paddingVertical: 20 }}
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.light.greyColor,
    // paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headlines: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 50,
    color: PRIMARY_COLOR,
  },
  articleSeparator: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ed7669",
  },
  tabsContainer: {
    padding: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 50,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.light.background,
    borderRadius: 50,
    // shadowColor: "#000",
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.6,
    // shadowRadius: 2,
    // elevation: 4,
  },
  activeTab: {
    backgroundColor: Colors.light.blueColor,
    borderRadius: 50,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 6,
  },
  activeTabText: {
    color: Colors.light.background,
    fontWeight: "bold",
  },
  tabText: {
    fontSize: 12,
    // paddingVertical: 10,
  },
});
