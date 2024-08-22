import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Link,
  useRouter,
  Stack,
  useLocalSearchParams,
  router,
} from "expo-router";
import Colors from "@/constants/Colors";
import AppStyles from "@/constants/AppStyles";
import { CapitalizeFirstLetter } from "@/functions";
import * as FileSystem from "expo-file-system";
import { API_URL, useAuth } from "@/providers/AuthProvider";
import axios from "axios";
import Button from "@/components/Button";

const JobDetailsLayout = () => {
  const { id } = useLocalSearchParams();

  const [job, setJob] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${API_URL}/jobs/${id}`);
        setJob(result.data);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: job.title }} />

      <ImageBackground
        source={require("@assets/images/Backgroundimage.png")}
        resizeMode="cover"
        imageStyle={{ opacity: 0.2 }}
      >
        <View style={styles.overlay}>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>Position: </Text>
            <Text style={styles.info} className="text-gray-400">
              {job.position}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>Category: </Text>
            <Text style={styles.info} className="text-gray-400">
              {job.category}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>Type: </Text>
            <Text style={styles.info} className="text-gray-400">
              {job.type}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>Location: </Text>
            <Text style={styles.info}>
              {job.city}, {job.stateId}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>No. of Vacancy: </Text>
            <Text style={styles.info}>{job.vacancy_count}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>Experience: </Text>
            <Text style={styles.info}>{job.experience}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>Last Date of Apply: </Text>
            <Text style={styles.info}>{job.from_date}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>Start Salary: </Text>
            <Text style={styles.info}>{job.start_salary}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>Last Salary: </Text>
            <Text style={styles.info}>{job.close_salary}</Text>
          </View>
        </View>
        <View style={styles.overlay}>
          <View style={styles.infoContainer}>
            <Text style={AppStyles.TextStyle}>Description: </Text>
            <Text style={styles.info}>{job.description}</Text>
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <Button
            text="Apply"
            onPress={() => router.push(`/jobs/apply-job?id=${job._id}`)}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default JobDetailsLayout;

const styles = StyleSheet.create({
  overlay: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "rgb(255,255,255)",
  },
  container: {
    padding: 10,
    width: "100%",
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    color: Colors.light.text,
    paddingHorizontal: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    // flex: 1,
  },
  info: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
    color: "#5A5A5A",
  },
});
