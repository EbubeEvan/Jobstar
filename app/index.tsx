import { Redirect } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { Image, Text, View } from "react-native";
import { images} from "@/constants";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
        <View className="flex justify-center items-center">
            <Image source={images.iconLogo} resizeMode="center" />
        </View>
    )
  }

  if (user) {
    return <Redirect href={"/(tabs)"} />
  }

  return <Redirect href="/login" />;
}
