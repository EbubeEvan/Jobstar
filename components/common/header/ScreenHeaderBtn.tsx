import { TouchableOpacity, Image, Share, ImageSourcePropType } from "react-native";
import styles from "./screenheader.style";

const ScreenHeaderBtn = ({
  iconUrl,
  shareLink,
}: {
  iconUrl: string;
  shareLink: string;
}) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this job: ${shareLink}`,
        title: "Job Details",
      });

      console.log("Shared successfully:", shareLink); // Successful share log
    } catch (error) {
      console.error("Error sharing content:", error); // Log the error if sharing fails
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
