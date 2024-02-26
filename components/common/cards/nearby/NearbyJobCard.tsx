import { View, Text, TouchableOpacity, Image } from "react-native";
import { Job } from "@/types";
import { ImageStyle } from "react-native";

import styles from "./nearbyjobcard.style";

const NearbyJobCard = ({job, handleNavigate} : {job : Job , handleNavigate : () => void}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity
        style={styles.logoContainer}
      >
        <Image
          source={{
            uri: "https://t4.ftcdn.net/jpg/05/13/72/29/360_F_513722905_SgxiGdjQZsdvP4ODmERsQGgW2bUwj1lT.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage as ImageStyle}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text
          style={styles.jobName}
          numberOfLines={1}
        >
          {job.role}
        </Text>
        <Text style={styles.jobType}>{job.location ?? 'Remote'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
