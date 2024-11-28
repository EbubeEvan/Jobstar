import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { convertToHyphens } from "@/lib/utils";

import {
  Company,
  JobAbout,
  JobFooter,
  ScreenHeaderBtn,
} from "@/components";
import { COLORS, SIZES, icons } from '@/constants'
import { Job } from "@/lib/types";
import useFetch from "@/hooks/useFetch";

const JobDetails = () => {
  const params = useGlobalSearchParams();

  const { data, isLoading, error, refetch } = useFetch();

  const [refreshing, setRefreshing] = useState(false);

  const jobData = (data as Job[]).find((item) => item.id === params.id)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);
  
  const shareLink = `jobstar://job-details/${params.id}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              shareLink={shareLink as string}
            />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                jobTitle={jobData!.role}
                companyName={jobData!.company_name}
                location={jobData!.location}
              />
              <JobAbout info={jobData!.text ?? "No data provided"} />
            </View>
          )}
        </ScrollView>
        <JobFooter url={jobData!?.url ?? 'https://careers.google.com/jobs/results/'} data={jobData!} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
