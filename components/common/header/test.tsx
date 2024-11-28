import React from "react";
import { TouchableOpacity, Image, Share, ImageSourcePropType } from "react-native";
import styles from "./screenheader.style";

const TestShare = ({
    iconUrl,
    shareLink,
  }: {
    iconUrl: string;
    shareLink: string;
  }) => {
  const handleShare = async () => {
    try {
        await Share.share({
          message: `Check out this job:\n${shareLink}`,
          title: "Job Details",
          url: shareLink
        });
  
        console.log("Shared successfully:", shareLink); // Successful share log
      } catch (error) {
        console.error("Error sharing content:", error); // Log the error if sharing fails
      }
  };

  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handleShare} className="">
    <Image
      source={iconUrl as ImageSourcePropType}
      resizeMode="cover"
      style={styles.btnImg}
    />
  </TouchableOpacity>
  );
};

export default TestShare;
