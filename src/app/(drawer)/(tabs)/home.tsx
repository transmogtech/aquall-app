import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Image,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Stack, Link } from "expo-router";
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

const home = () => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCagegories();

      setCategories(result);
    };

    const fetchAppSliderImages = async () => {
      const result = await getAppSliderImages();

      setSliderImages(result);
    };

    const getSeedProducts = async () => {
      const result = await getProducts("664645fb3f25f68d99341a74");

      setSeedProducts(result);
    };

    const getFeedProducts = async () => {
      const result = await getProducts("664645eb3f25f68d99341a71");

      setFeedProducts(result);
    };

    const getAeratorsProducts = async () => {
      const result = await getProducts("6646461c3f25f68d99341a7a");

      setAeratorsProducts(result);
    };

    const getChemicalProducts = async () => {
      const result = await getProducts("6646460f3f25f68d99341a77");

      setChemicalProducts(result);
    };

    const getOtherProducts = async () => {
      const result = await getProducts("6646463e3f25f68d99341a80");

      setOtherProducts(result);
    };

    const getBestSellingProducts = async () => {
      const result = await getProducts();

      setOtherProducts(result);
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
      console.log("sponsored Ad: ");

      console.log(result);
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
  }, []);
  const categoryIcons = {
    testkit: require("@assets/images/test_kit.png"),
    seed: require("@assets/images/Seeds.png"),
    chemicals: require("@assets/images/Chemicals.png"),
    aerators: require("@assets/images/Aerators.png"),
    others: require("@assets/images/other.png"),
    feed: require("@assets/images/Feeds.png"),
  };

  return (
    <View className="flex-1 justify-center p-0 m-0 font-[Satoshi]">
      <Stack.Screen
        options={{
          title: "Aquall",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1">
          <View className="flex-1 flex-row justify-between items-center p-5">
            {categories &&
              categories.map((category) => {
                return (
                  <Link
                    href={{
                      pathname: "/products",
                      params: { category: category._id },
                    }}
                    key={Math.random()}
                    asChild
                  >
                    <Pressable>
                      <Image source={categoryIcons[category.url]} />
                      <Text>{category.title}</Text>
                    </Pressable>
                  </Link>
                );
              })}
          </View>
          {sliderImages && <ImageSlider images={sliderImages} />}
          {seedProducts && (
            <ProductList products={seedProducts} title="Top Selling Seeds" />
          )}
          {feedProducts && (
            <ProductList products={feedProducts} title="Top Selling Feeds" />
          )}

          <BestSellingProductList
            products={bestSellingProducts}
            title="Best Selling Products"
          />
          {sponsoredAds && <SponsoredAd ad={sponsoredAds[0]} />}
          {sponsoredAds && <SponsoredAd ad={sponsoredAds[1]} />}
          {chemicalProducts && (
            <ProductList
              products={chemicalProducts}
              title="Top Selling Chemicals"
            />
          )}
          {aeratorsProducts && (
            <ProductList
              products={aeratorsProducts}
              title="Top Selling Aerators"
            />
          )}
          {otherProducts && (
            <ProductList
              products={otherProducts}
              title="Top Selling Other Products"
            />
          )}
          <View style={styles.container}>
            <Text style={styles.title}>Latest News</Text>
            <FontAwesome name="angle-right" size={20} />
          </View>
          <FlatList
            data={news}
            renderItem={({ item, index }) => (
              <Link href={`/news/${item._id}`} asChild>
                <Pressable style={styles.article}>
                  <Image
                    source={{ uri: `${API_URL}/${item.imageUrl}` }}
                    style={styles.articleImage}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.articleTitle} numberOfLines={2}>
                      {item.title}
                    </Text>

                    <Text style={styles.articlePublishedAt}>
                      {item.created}
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
          {sponsoredAds && <SponsoredAd ad={sponsoredAds[2]} />}
          <View style={styles.container}>
            <Text style={styles.title}>Latest Videos</Text>
            <FontAwesome name="angle-right" size={20} />
          </View>

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

          <View style={styles.container}>
            <Text style={styles.title}>Contact Technicians</Text>
            <FontAwesome name="angle-right" size={20} />
          </View>
          <FlatList
            data={technicians}
            renderItem={({ item, index }) => (
              <Link href={`/news/${item.id}`} asChild>
                <Pressable style={styles.article}>
                  {/* Caching image for better performance: https://github.com/DylanVann/react-native-fast-image */}
                  <Image
                    source={{
                      uri: `${API_URL}/${item.avatar}` || defaultUserImage,
                    }}
                    style={styles.userImage}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.userName} numberOfLines={2}>
                      {item.name}
                    </Text>

                    {/* <Text style={styles.location}>{item.location}</Text> */}

                    <Text style={styles.mobile}>
                      <FontAwesome name="mobile" size={20} /> {item.mobile}
                    </Text>

                    <Text style={styles.email}>
                      <FontAwesome name="envelope" size={20} /> {item.email}
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
  },
  container2: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  article: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  articleImage: {
    width: 150,
    height: 85,
    resizeMode: "cover",
    marginRight: 20,
  },
  userImage: {
    width: 85,
    height: 85,
    resizeMode: "cover",
    marginRight: 20,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  articleDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  articlePublishedAt: {
    fontSize: 14,
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
  },
  userName: {
    color: Colors.light.blueColor,
  },
  location: {
    color: "#767E7E",
  },
  mobile: {
    color: "#1E1E1E",
  },
  email: {
    color: "#787878",
  },
});
