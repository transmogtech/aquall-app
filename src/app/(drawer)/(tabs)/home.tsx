import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Image,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { Stack, Link, router } from "expo-router";
import ImageSlider from "@/components/ImageSlider";
import { FontAwesome } from "@expo/vector-icons";
import Button from "@/components/Button";
import ProductList from "@/components/ProductList";
import BestSellingProductList from "@/components/BestSellingProductList";
import SponsoredAd from "@/components/SponsoredAd";
import Colors from "@/constants/Colors";
import {
  defaultUserImage,
  getAppSliderImages,
  getCagegories,
  getLatestVideos,
  getProducts,
  getSponsoredAds,
  getUsers,
} from "@assets/data/home";
import { getNews } from "@assets/data/news";
import VideoListItem from "@/components/VideoListItem";
import { API_URL } from "@/providers/AuthProvider";
import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { CapitalizeFirstLetter } from "@/functions";
const home = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [seedProducts, setSeedProducts] = useState([]);
  const [feedProducts, setFeedProducts] = useState([]);
  const [aeratorsProducts, setAeratorsProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [chemicalProducts, setChemicalProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [sponsoredAds, setSponsoredAds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const categoryArr = {
    seed: "664645fb3f25f68d99341a74",
    feed: "664645eb3f25f68d99341a71",
    chemicals: "6646460f3f25f68d99341a77",
    aerators: "6646461c3f25f68d99341a7a",
    others: "66b284ff761baa9ebd06a011",
  };

  const fetchData = async () => {
    const fetchCategories = async () => {
      const result = await getCagegories();
      setCategories(result);
    };

    const fetchAppSliderImages = async () => {
      const result = await getAppSliderImages();

      setSliderImages(result);
    };

    const getSeedProducts = async () => {
      const result = await getProducts(categoryArr["seed"]);

      setSeedProducts(result);
    };

    const getFeedProducts = async () => {
      const result = await getProducts(categoryArr["feed"]);

      setFeedProducts(result);
    };

    const getAeratorsProducts = async () => {
      const result = await getProducts(categoryArr["aerators"]);

      setAeratorsProducts(result);
    };

    const getChemicalProducts = async () => {
      const result = await getProducts(categoryArr["chemicals"]);

      setChemicalProducts(result);
    };

    const getOtherProducts = async () => {
      const result = await getProducts(categoryArr["others"]);

      setOtherProducts(result);
    };

    const getBestSellingProducts = async () => {
      const result = await getProducts("", 4);

      setBestSellingProducts(result);
    };

    const getNewsList = async () => {
      const result = await getNews(1, 2);
      setNews(result);
    };

    const getVideos = async () => {
      const result = await getLatestVideos();

      setVideos(result);
    };

    const getTechnicians = async () => {
      const result = await getUsers("6658f0a00db84a26d0d23198");

      setTechnicians(result);
    };

    const fetchSponsoredAds = async () => {
      const result = await getSponsoredAds(3);
      // // console.log("sponsored Ad: ");

      // // console.log(result);
      setSponsoredAds(result);
    };

    getBestSellingProducts();
    getNewsList();
    getVideos();
    getSeedProducts();
    getFeedProducts();
    getTechnicians();
    getAeratorsProducts();
    getChemicalProducts();
    getOtherProducts();
    fetchCategories();
    fetchAppSliderImages();
    fetchSponsoredAds();
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // // console.log(news);

  const categoryIcons = {
    testkit: require("@assets/images/test_kit.png"),
    seed: require("@assets/images/Seeds.png"),
    chemicals: require("@assets/images/Chemicals.png"),
    aerators: require("@assets/images/Aerators.png"),
    others: require("@assets/images/other.png"),
    feed: require("@assets/images/Feeds.png"),
  };

  return (
    <View className="flex-1 justify-center p-0 m-0">
      <Stack.Screen
        options={{
          headerTitle: "Aquall",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ImageBackground
            source={require("@assets/images/Backgroundimage.png")}
            resizeMode="stretch"
            className="justify-center flex-1 w-full"
          >
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.categoryContainer}
            >
              <FlatList
                data={categories}
                renderItem={({ item, index }) => (
                  <Link
                    href={{
                      pathname: "/products",
                      params: { category: item._id },
                    }}
                    key={index}
                    asChild
                  >
                    <Pressable style={styles.categoryCard}>
                      <Image
                        source={categoryIcons[item.url]}
                        style={{
                          alignSelf: "center",
                          width: 50,
                          height: 50,
                        }}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          paddingTop: 10,
                          fontFamily: "Quicksand_600SemiBold",
                          color: Colors.light.text,
                          fontSize: 14,
                        }}
                      >
                        {item.title}
                      </Text>
                    </Pressable>
                  </Link>
                )}
                horizontal={true}
                onEndReachedThreshold={1}
                style={{ paddingVertical: 10 }}
                scrollEnabled={false}
              />
            </ScrollView>
            {sliderImages && <ImageSlider images={sliderImages} />}
            {seedProducts && (
              <ProductList
                products={seedProducts}
                title="Top Selling Seeds"
                id={categoryArr["seed"]}
              />
            )}
            {feedProducts && (
              <ProductList
                products={feedProducts}
                title="Top Selling Feeds"
                id={categoryArr["feed"]}
              />
            )}

            <BestSellingProductList
              products={bestSellingProducts}
              title="Best Selling Products"
            />
            {/* {sponsoredAds && <SponsoredAd ad={sponsoredAds[0]} />} */}
            {/* {sponsoredAds && <SponsoredAd ad={sponsoredAds[1]} />} */}
            {chemicalProducts && (
              <ProductList
                products={chemicalProducts}
                title="Top Selling Chemicals"
                id={categoryArr["chemicals"]}
              />
            )}
            {aeratorsProducts && (
              <ProductList
                products={aeratorsProducts}
                title="Top Selling Aerators"
                id={categoryArr["aerators"]}
              />
            )}
            <Link href={`/news`} key={Math.random()} asChild>
              <Pressable>
                <View style={styles.container}>
                  <Text style={styles.title}>Latest News</Text>
                  <FontAwesome name="angle-right" size={20} />
                </View>
              </Pressable>
            </Link>
            <FlatList
              data={news}
              renderItem={({ item, index }) => (
                <Link href={`/news/${item._id}`} asChild>
                  <Pressable style={styles.article} key={index}>
                    <Image
                      source={{ uri: `${API_URL}/${item.imageUrl}` }}
                      style={styles.articleImage}
                    />

                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.articleTitle} numberOfLines={2}>
                        {CapitalizeFirstLetter(item.title)}
                      </Text>

                      <Text style={styles.articlePublishedAt}>
                        {moment(item.created).format("DD-MM-YYYY")} |{" "}
                        {moment(item.created).format("HH:mm:ss")}{" "}
                      </Text>
                    </View>
                  </Pressable>
                </Link>
              )}
              showsVerticalScrollIndicator={false}
              initialNumToRender={2}
              onEndReachedThreshold={1}
              contentContainerStyle={{ gap: 20 }}
              style={{ paddingVertical: 10 }}
              scrollEnabled={false}
            />
            <Image
              source={require("@assets/images/banner.png")}
              resizeMode="contain"
              style={{ width: "100%", height: 200 }}
            />

            {/* {sponsoredAds && <SponsoredAd ad={sponsoredAds[2]} />} */}
            <Link href={`/videos`} key={Math.random()} asChild>
              <Pressable>
                <View style={styles.container}>
                  <Text style={styles.title}>Latest Videos</Text>
                  <FontAwesome name="angle-right" size={20} />
                </View>
              </Pressable>
            </Link>
            <FlatList
              data={videos}
              renderItem={({ item, index }) => <VideoListItem video={item} />}
              showsVerticalScrollIndicator={false}
              initialNumToRender={6}
              onEndReachedThreshold={1}
              contentContainerStyle={{ gap: 20 }}
              style={{ paddingVertical: 10 }}
              scrollEnabled={false}
            />

            <Link href={`/technician`} key={Math.random()} asChild>
              <Pressable>
                <View style={styles.container}>
                  <Text style={styles.title}>Contact Technicians</Text>
                  <FontAwesome name="angle-right" size={20} />
                </View>
              </Pressable>
            </Link>
            <FlatList
              data={technicians}
              renderItem={({ item, index }) => (
                <Link href={`/news/${item.id}`} asChild>
                  <Pressable style={styles.article} key={index}>
                    <Image
                      source={{
                        uri: defaultUserImage,
                      }}
                      style={styles.userImage}
                    />

                    <View style={{ flex: 1 }}>
                      <Text style={styles.userName} numberOfLines={2}>
                        {CapitalizeFirstLetter(item.name)}
                      </Text>

                      {/* <Text style={styles.location}>{item.location}</Text> */}

                      <Text style={styles.mobile}>
                        <FontAwesome name="mobile" size={20} />{" "}
                        {CapitalizeFirstLetter(item.mobile)}
                      </Text>

                      <Text style={styles.email}>
                        <FontAwesome name="envelope" size={20} />{" "}
                        {CapitalizeFirstLetter(item.email)}
                      </Text>
                    </View>
                  </Pressable>
                </Link>
              )}
              showsVerticalScrollIndicator={false}
              initialNumToRender={6}
              onEndReachedThreshold={1}
              contentContainerStyle={{ gap: 20 }}
              style={{ paddingVertical: 10 }}
              scrollEnabled={false}
            />
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  category: {
    color: "#5A5A5A",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    fontFamily: "Quicksand_400Regular",
  },
  container2: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    fontFamily: "Quicksand_400Regular",
  },
  title: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
  },
  article: {
    flexDirection: "row",

    padding: 10,
    // backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  articleImage: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginRight: 20,
  },
  userImage: {
    width: 85,
    height: 85,
    resizeMode: "cover",
    marginRight: 20,
    borderRadius: 50,
  },
  articleTitle: {
    fontFamily: "Quicksand_600SemiBold",

    fontSize: 18,
    marginBottom: 10,
  },
  articleDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  articlePublishedAt: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
    color: "#5A5A5A",
  },
  date: {
    fontSize: 14,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  video: {
    width: "100%",
    height: 200,
  },
  userName: {
    color: Colors.light.blueColor,
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
  },
  location: {
    color: "#767E7E",
  },
  mobile: {
    color: "#1E1E1E",
    fontFamily: "Quicksand_500Medium",
    padding: 10,
  },
  email: {
    fontFamily: "Quicksand_500Medium",
    color: "#787878",
  },
  categoryContainer: { padding: 8 },
  categoryCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    margin: 10,
    // elevation: 4,
  },
});
