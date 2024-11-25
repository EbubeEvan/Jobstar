import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { Job } from "@/lib/types";

import styles from "./remotejobs.style";
import { COLORS } from "@/constants";
import RemoteJobCard from "@/components/common/cards/nearby/RemoteJobCard";

const RemoteJobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch ({
    sort_by : 'relevance'
  });

  const onSiteJobs = (data as Job[]).filter((data) => data.location !== null)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Onsite Jobs</Text>
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
          (onSiteJobs)?.map((job) => (
            <RemoteJobCard job={job} key={`nearby-job${job?.id}`} handleNavigate={() => router.push(`job-details/${job.id}` as `${string}:${string}`)}/>
          ))
        )}
      </View>
    </View>
  );
};

export default RemoteJobs;
