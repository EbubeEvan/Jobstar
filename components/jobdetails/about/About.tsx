import { View, Text, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

import styles from "./about.style";

const About = ({ info }: { info: string }) => {
  const source = {
    html: info,
  };

  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About the job:</Text>

      <View style={styles.contentBox}>
        <RenderHtml contentWidth={width} source={source} />
      </View>
    </View>
  );
};

export default About;
