import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { router, Tabs } from "expo-router";
import { Image } from "react-native";
import { icons } from "@/constants";

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
      <Tabs.Screen name="index" options={{
        tabBarIcon : () => (
          <Image source={icons.home} className="w-8 h-8 outline-double" resizeMode="cover"/>
        )
      }}/>
      <Tabs.Screen name="saved" options={{
        tabBarIcon : () => (
          <Image source={icons.heartOutline} className="w-8 h-8" resizeMode="cover"/>
        )
      }}/>
    </Tabs>
  );
};

export default Layout;
