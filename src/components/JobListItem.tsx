import { StyleSheet, Image, Pressable } from "react-native";

import { Text, View } from "./Themed";
import Colors from "@constants/Colors";
import { Job } from "@/types";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

type JobListItemProps = {
  job: Job;
};

const JobListItem = ({ job }: JobListItemProps) => {
  return (
    <Link href={`/jobs/${job._id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}> {job.title}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>Position: </Text>
          <Text style={styles.info} className="text-gray-400">
            {job.position}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Category: </Text>
          <Text style={styles.info} className="text-gray-400">
            {job.category}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Type: </Text>
          <Text style={styles.info} className="text-gray-400">
            {job.type}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Location: </Text>
          <Text style={styles.info} className="text-gray-400">
            {job.location}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};
export default JobListItem;

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flex: 1,
  },
  info: {
    fontSize: 16,
  },
});
