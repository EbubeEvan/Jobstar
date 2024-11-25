import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./footer.style";
import { icons } from "../../../constants";
import { Job } from "@/lib/types";

const Footer = ({ url, data }: { url: string; data: Job }) => {
  const [saved, setsaved] = useState(false);
  const [filteredArray, setFilteredArray] = useState<Job[] | null>(null);

  const saveJob = async (value: Job) => {
    if (!saved) {
      try {
        const JobArrayString = await AsyncStorage.getItem("Jobs");

        if (JobArrayString !== null) {
          let JobArray: Job[] = JSON.parse(JobArrayString);
          if (Array.isArray(JobArray)) {
            JobArray.push(value);
          } else {
            JobArray = [value];
          }
          const jsonJobArray = JSON.stringify(JobArray);
          await AsyncStorage.setItem("Jobs", jsonJobArray);
        } else {
          const JobArray = [value];
          const jsonJobArray = JSON.stringify(JobArray);
          await AsyncStorage.setItem("Jobs", jsonJobArray);
        }

        setsaved(true);
        alert(`Job saved!`);
      } catch (error) {
        console.log(error);
        alert(`Failed to save Job: ${error}`);
      }
    } else {
      try {
        const JobArrayString = await AsyncStorage.getItem("Jobs");

        if (JobArrayString !== null) {
          let JobArray: Job[] = JSON.parse(JobArrayString);
          if (Array.isArray(JobArray)) {
            const filteredJobArray = JobArray.filter(
              (item: Job) => item.id !== data.id
            );
            setFilteredArray(filteredJobArray);
          }

          const jsonJobArray = JSON.stringify(filteredArray!);
          await AsyncStorage.setItem("Jobs", jsonJobArray);
          alert("Job Removed!");
          setsaved(false);
        }
      } catch (error) {
        alert(`Failed to remove Job: ${error}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={() => saveJob(data!)}>
        {saved ? (
          <Image
            source={icons.heart}
            resizeMode="contain"
            style={styles.likeBtnImage}
          />
        ) : (
          <Image
            source={icons.heartOutline}
            resizeMode="contain"
            style={styles.likeBtnImage}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
