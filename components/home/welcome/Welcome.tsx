import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { icons, SIZES } from "@/constants";
import styles from "./welcome.style";

const jobTypes = ["Full-time", "Contract"];

const Welcome = ({
  searchTerm,
  setSearchTerm,
  handleClick,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
}) => {
  const [userDetails, setUserDetails] = useState<{ firstName: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          userDoc.exists()
            ? setUserDetails(userDoc.data() as { firstName: string })
            : console.warn("No user data found!");
        } else {
          console.warn("No user is logged in!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hi {userDetails?.firstName || "Guest"}!</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={item === activeJobType ? styles.tab2 : styles.tab1}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text
                style={
                  item === activeJobType ? styles.tabText2 : styles.tabText1
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
