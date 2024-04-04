import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

import { NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";
import { Job } from "@/lib/types";
import NotFound from "@/components/search/NotFound";

const saved = () => {
  const [jobList, setJobList] = useState<Job[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const getSavedJobs = async () => {
      setIsLoading(true);
      try {
        const savedJobsString = await AsyncStorage.getItem("Jobs");
        if (savedJobsString !== null) {
          const savedJobs: Job[] = JSON.parse(savedJobsString);
          setJobList(savedJobs);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSavedJobs();
  }, []);

  const itemsPerPage = 10;

  const handlePagination = (direction: string) => {
    const totalPages = jobList?.length! / itemsPerPage;
    if (direction === "left") {
      page > 1 && setPage(page - 1);
    } else {
      page < totalPages && setPage(page + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTitle: "",
        }}
      />

      <FlatList
        data={jobList!}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>Saved Jobs</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              <>
                {/* Other content inside the header */}
                {isLoading && (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                )}
              </>
            </View>
          </>
        )}
        ListEmptyComponent={<NotFound />}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>
                {page > 1 ? page - 1 : page}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default saved;
