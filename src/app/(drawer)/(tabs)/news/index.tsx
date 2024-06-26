import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import { uniqBy } from "lodash";
import { getNews } from "@assets/data/news";
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
  const [value, setValue] = React.useState("English");
  const languages = ["Telugu", "English"];
  const hasMoreData = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasMoreData.current) return;

      const newArticles = await getNews(page, PAGE_SIZE);
      // console.log(newArticles);

      if (newArticles.length < PAGE_SIZE) {
        hasMoreData.current = false;
      }
      setArticles(newArticles);
      // setArticles((articles) => {
      //   // Combine and filter article has no image
      //   const allArticles = articles.concat(
      //     newArticles.filter((article) => article.urlToImage)
      //   );

      //   // Remove duplicate articles
      //   // https://lodash.com/docs/4.17.15#uniqBy
      //   return uniqBy(allArticles, "url");
      // });
      setLoading(false);
      setRefreshing(false);
    };

    fetchData();

    // console.log("Loading articles");
    // console.log(articles);
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
  const keyExtractor = (item) => item.url;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("@assets/images/Backgroundimage.png")}
          resizeMode="cover"
          className="justify-center flex-1 w-full"
          imageStyle={{ opacity: 0.2 }}
        >
          <View style={styles.content}>
            {/* <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "telugu",
                label: "Telugu",
              },
              {
                value: "english",
                label: "English",
              },
            ]}
          /> */}

            <SegmentedControl
              options={languages}
              selectedOption={value}
              onOptionChange={setValue}
            />

            {isLoading ? (
              <View style={styles.center}>
                {/* https://reactnative.dev/docs/activityindicator */}
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
              </View>
            ) : (
              // Optimizing FlatList: https://reactnative.dev/docs/optimizing-flatlist-configuration

              <FlatList
                data={articles}
                renderItem={renderArticle}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderDivider}
                ListFooterComponent={renderFooter}
                initialNumToRender={6}
                onEndReached={() => setPage((page) => page + 1)}
                onEndReachedThreshold={1}
                onRefresh={refreshData}
                refreshing={refreshing}
                style={{ paddingVertical: 20 }}
              />
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.greyColor,
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
});
