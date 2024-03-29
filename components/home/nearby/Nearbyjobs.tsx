import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { Job } from "@/types";

import styles from "./nearbyjobs.style";
import { COLORS } from "@/constants";
import NearbyJobCard from "@/components/common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch ({
    sort_by : 'relevance'
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          (data as Job[])?.map((job) => (
            <NearbyJobCard job={job} key={`nearby-job${job?.id}`} handleNavigate={() => router.push(`job-details/${job.id}` as `${string}:${string}`)}/>
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
