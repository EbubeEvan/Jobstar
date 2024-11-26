import { View, ScrollView, SafeAreaView, Image, ImageProps, TouchableOpacity} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { registerRootComponent } from 'expo';
import { signOut } from "firebase/auth";

import { COLORS, icons, images, SIZES } from "@/constants";
import { Icons } from "@/lib/types";
import Onsitejobs from "@/components/home/popular/Onsitejobs";
import RemoteJobs from "@/components/home/nearby/RemoteJobs";
import { Welcome } from "@/components";
import { auth } from "@/firebaseConfig";

const Home = () => {
  const router = useRouter();
  const iconSet : Icons = icons;
  const [searchTerm, setSearchTerm] = useState("");;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <Image source={images.logo} className="w-44 h-32" resizeMode="cover"/>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Image source={iconSet.logout as ImageProps} className="w-7 h-7 mr-3" resizeMode="cover"/>
            </TouchableOpacity>
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
          <Onsitejobs />
          <RemoteJobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

registerRootComponent(Home);

export default Home;
