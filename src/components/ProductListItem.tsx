import { StyleSheet, Image, Pressable, Text, View } from "react-native";

import Colors from "@constants/Colors";
import { Product } from "@/types";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { API_URL } from "@/providers/AuthProvider";

type ProductListItemProps = {
  product: Product;
};

export const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`/products/${product._id}`} asChild>
      <Pressable style={styles.container} key={product._id}>
        <View style={styles.ratingWrapper}>
          <AntDesign name="star" size={18} color="#FFC107" />
          <Text style={styles.rating}> {product.rating}</Text>
        </View>
        <Image
          source={{ uri: `${API_URL}/${product.imageUrl}` || defaultImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <View style={styles.item}>
            <Text style={styles.title}>{product.name}</Text>
            <Text className="text-gray-400" style={styles.category}>
              {product.categoryId?.title}
            </Text>
          </View>
          <View style={styles.item}>
            <Text className="items-end" style={styles.price}>
              ${product.price}
            </Text>
            <Pressable style={styles.cartWrapper}>
              <AntDesign name="shoppingcart" size={24} style={styles.cart} />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
export default ProductListItem;

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  item: {
    width: "50%", // is 50% of container width
  },

  container: {
    padding: 10,
    flex: 1,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    color: Colors.light.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  price: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  rating: {
    color: Colors.light.tint,
  },
  category: {
    fontSize: 16,
  },
  image: {
    width: "80%",
    aspectRatio: 1,
  },
  cartWrapper: { textAlign: "right", alignItems: "flex-end" },
  cart: {
    backgroundColor: Colors.light.blueColor,
    color: Colors.light.background,
    padding: 5,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingWrapper: {
    backgroundColor: Colors.light.greyColor,
    borderRadius: 50,
    flex: 1,
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
});
