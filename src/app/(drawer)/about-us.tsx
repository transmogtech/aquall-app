import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import AppStyles from "@/constants/AppStyles";

const AboutUsLayout = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "About Us",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <SafeAreaView>
        <ScrollView>
          <ImageBackground
            source={require("@assets/images/Backgroundimage.png")}
            resizeMode="stretch"
            className="justify-center flex-1 w-full"
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Quicksand_700Bold",
                }}
              >
                About Us
              </Text>
              <Text style={AppStyles.TextStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                porro inventore maiores numquam non? Dolor error enim in quia
                aspernatur ab consectetur aut eos adipisci reiciendis fugit
                debitis, explicabo quae.
              </Text>
              <Text style={AppStyles.TextStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                porro inventore maiores numquam non? Dolor error enim in quia
                aspernatur ab consectetur aut eos adipisci reiciendis fugit
                debitis, explicabo quae.
              </Text>
              <Text style={AppStyles.TextStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                porro inventore maiores numquam non? Dolor error enim in quia
                aspernatur ab consectetur aut eos adipisci reiciendis fugit
                debitis, explicabo quae.
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Quicksand_700Bold",
                }}
              >
                Aquall
              </Text>
              <Text style={AppStyles.TextStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                porro inventore maiores numquam non? Dolor error enim in quia
                aspernatur ab consectetur aut eos adipisci reiciendis fugit
                debitis, explicabo quae.
              </Text>
              <Text style={AppStyles.TextStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                porro inventore maiores numquam non? Dolor error enim in quia
                aspernatur ab consectetur aut eos adipisci reiciendis fugit
                debitis, explicabo quae.
              </Text>
              <Text style={AppStyles.TextStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                porro inventore maiores numquam non? Dolor error enim in quia
                aspernatur ab consectetur aut eos adipisci reiciendis fugit
                debitis, explicabo quae.
              </Text>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AboutUsLayout;
