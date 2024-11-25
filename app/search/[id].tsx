import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import NotFound from "@/components/search/NotFound";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";

import { NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";
import useFetch from "@/hooks/useFetch";
import { Item } from "@/lib/types";

const JobSearch = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(2);
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);

  const { data, isLoading, error } = useFetch();

  const lowerCaseId = (params.id as string)?.toLowerCase();

  const resultData = (data as Item[])?.filter(
    (result) =>
      result?.keywords
        ?.map((keyword) => keyword.toLowerCase())
        ?.includes(lowerCaseId) ||
      result.role.toLowerCase().includes(lowerCaseId) ||
      result.employment_type?.toLowerCase() === lowerCaseId
  );

  const itemsPerPage = 10;

  const handlePagination = (direction: string) => {
    const totalPages = resultData.length / itemsPerPage;
    if (direction === "left") {
      page > 1 && setPage(page - 1);
    } else {
      page < totalPages && setPage(page + 1);
    }
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(page * itemsPerPage, resultData.length);
    setVisibleItems(resultData.slice(startIndex, endIndex));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <FlatList
        data={
          visibleItems.length ? visibleItems : resultData.slice(0, itemsPerPage)
        }
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
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              <>
                {/* Other content inside the header */}
                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                  error && <Text>Oops something went wrong</Text>
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

export default JobSearch;
