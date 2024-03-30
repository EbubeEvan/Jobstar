import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIRERBASE_AUTH } from "@/firebaseConfig";

const InsideLayout = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="job-details/[id]" />
      <Stack.Screen name="search/[id]" />
    </Stack>
  );
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIRERBASE_AUTH, (user) => console.log("user", user));
  }, []);

  return (
    <Stack initialRouteName="index">
      {user ? (
        <Stack.Screen name="InsideLayout" />
      ) : (
        <Stack.Screen name="login" />
      )}
      <Stack.Screen name="signIn" />
    </Stack>
  );
};

export default Layout;
