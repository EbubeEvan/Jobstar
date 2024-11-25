import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { icons } from "@/constants";

const Company = ({
  jobTitle,
  companyName,
  location,
}: {
  jobTitle: string;
  companyName: string;
  location: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image source={{
            uri: "https://t4.ftcdn.net/jpg/05/13/72/29/360_F_513722905_SgxiGdjQZsdvP4ODmERsQGgW2bUwj1lT.jpg",
          }} style={styles.logoImage}/>
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{location ?? 'Remote'}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
