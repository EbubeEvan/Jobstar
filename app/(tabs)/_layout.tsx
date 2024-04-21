import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { router, Tabs } from "expo-router";
import { Image } from "react-native";
import { icons } from "@/constants";
import { FontAwesome } from "@expo/vector-icons";

const Layout = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login" as `${string}:${string}`)
      }
    });
  }, []);

  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen name="index" options={{ title : "Home",
        tabBarIcon : () => (
          <FontAwesome name="home" color='grey' size={20} className="w-6 h-6 mt-4" />
        ),
        tabBarActiveBackgroundColor : 'lightblue',
        tabBarActiveTintColor: 'white'
      }}/>
      <Tabs.Screen name="saved" options={{ title : "Saved",
        tabBarIcon : () => (
          <FontAwesome name="heart" color='grey' size={20}  className="w-6 h-6 mt-3" />
        ),
        tabBarActiveBackgroundColor : 'lightblue',
        tabBarActiveTintColor: 'white'
      }}/>
    </Tabs>
  );
};

export default Layout;
