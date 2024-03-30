import { View, ScrollView, SafeAreaView, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { registerRootComponent } from 'expo';

import { COLORS, icons, images, SIZES } from "@/constants";
import { Icons } from "@/lib/types";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "@/components";


const Home = () => {
  const router = useRouter();
  const iconSet : Icons = icons;
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <Image source={images.logo} className="w-32 h-32" resizeMode="cover"/>
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile}  />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
        <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}` as `${string}:${string}`)
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

registerRootComponent(Home);

export default Home;
