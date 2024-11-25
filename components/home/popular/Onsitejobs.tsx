import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { Item } from "@/lib/types";

import styles from "./onsitejobs.style";
import { COLORS, SIZES } from "@/constants";
import OnsiteJobCard from "@/components/common/cards/onsite/OnsiteJobCard";

const Onsitejobs = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch();

  const remoteJobs = (data as Item[]).filter((data) => data.location === null)

  const [selectedJob, setSelectedJob] = useState('');

  const handleCardPress = (item : Item) => {
    router.push(`job-details/${item.id}` as `${string}:${string}`)
    setSelectedJob(item.id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Remote Jobs</Text>
        {/* <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={remoteJobs}
            renderItem={({ item }) => <OnsiteJobCard item={item} selectedJob={selectedJob} handleCardPress={() => handleCardPress(item)}/>}
            keyExtractor={(item : Item) => item?.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Onsitejobs;
