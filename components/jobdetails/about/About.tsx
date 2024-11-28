import { View, Text, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

import styles from "./about.style";
import TestShare from "@/components/common/header/test";
import { icons } from "@/constants";

const About = ({ info, shareLink }: { info: string; shareLink: string }) => {
  const source = {
    html: info,
  };

  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View className="flex flex-row justify-between">
        <Text style={styles.headText}>About the job:</Text>
        <TestShare iconUrl={icons.share} shareLink={shareLink} />
      </View>

      <View style={styles.contentBox}>
        <RenderHtml contentWidth={width} source={source} />
      </View>
    </View>
  );
};

export default About;
