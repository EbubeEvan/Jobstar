import { useState, useEffect } from "react";
import axios from "axios";
import { Query } from "@/lib/types";
import Constants from "expo-constants";

const extras = Constants.expoConfig?.extra

const useFetch = ( query?: Query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const options = {
    method: "GET",
    url: extras?.EXPO_PUBLIC_JOBS_API,
    headers: {
      "Authorization": extras?.EXPO_PUBLIC_JOB_TOKEN,
    },
    params: { ...query },
  };

  const fetchData = async() => {
    setIsLoading(true)
    try {
        const response = await axios.request(options)
        setData(response.data.results)
        setIsLoading(false)
    } catch (error) {
        setError(error);
        alert('There is an error')
    } finally {
        setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const refetch = () => {
    setIsLoading(true);
    fetchData()
  }

  return {data , isLoading, error, refetch}
};

export default useFetch