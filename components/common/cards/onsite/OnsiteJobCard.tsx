import { View, Text, TouchableOpacity, Image } from "react-native";
import { Item } from "@/lib/types";
import { ImageStyle } from "react-native";

import styles from "./onsitejobcard.style";

const OnsiteJobCard = ({
  item,
  selectedJob,
  handleCardPress
}: {
  item: Item;
  selectedJob: unknown;
  handleCardPress: (item : Item) => void
}) => {
  return (
    <TouchableOpacity
      style={
        item.id === selectedJob ? styles.container2 : styles.container1
      }
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity
        style={
          item.id === selectedJob
            ? styles.logoContainer2
            : styles.logoContainer1
        }
      >
        <Image
          source={{
            uri: "https://t4.ftcdn.net/jpg/05/13/72/29/360_F_513722905_SgxiGdjQZsdvP4ODmERsQGgW2bUwj1lT.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage as ImageStyle}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.company_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text
          style={
            item.id === selectedJob ? styles.jobName2 : styles.jobName1
          }
          numberOfLines={1}
        >
          {item.role}
        </Text>
        <Text style={styles.location}>{item.location ?? 'Remote'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OnsiteJobCard;
