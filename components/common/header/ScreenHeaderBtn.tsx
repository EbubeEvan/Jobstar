import { TouchableOpacity, Image, Share, Alert } from "react-native";
import { ImageSourcePropType } from "react-native";
// import Share from "react-native-share";

import styles from "./screenheader.style";

const ScreenHeaderBtn = ({
  iconUrl,
  shareLink,
}: {
  iconUrl: string;
  shareLink?: string;
}) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this awesome job!",
        url: shareLink,
        title: "Jobstar",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with activity type of', result.activityType);
        } else {
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handleShare}>
      <Image
        source={iconUrl as ImageSourcePropType}
        resizeMode="cover"
        style={styles.btnImg}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
