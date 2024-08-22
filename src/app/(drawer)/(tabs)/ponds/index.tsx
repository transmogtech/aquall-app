import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import ponds from "@assets/data/ponds";
import { Stack } from "expo-router";
import PondListItem from "@/components/PondListItem";

const PondListingLayout = () => {
  return (
    <View className="flex-1 justify-center items-center w-full p-0 m-0">
      <Stack.Screen options={{ headerTitle: "Ponds List" }} />
      <SafeAreaView className="flex-1  w-full">
        <ScrollView className="flex-1 w-full">
          <FlatList
            data={ponds}
            renderItem={({ item }) => <PondListItem item={item} />}
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

export default PondListingLayout;

const styles = StyleSheet.create({});
