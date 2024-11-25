import { useState, useEffect } from "react";
import axios from "axios";
import { Query } from "@/lib/types";

const useFetch = ( query?: Query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const options = {
    method: "GET",
    url: `https://findwork.dev/api/jobs/`,
    headers: {
      "Authorization": 'Token bd33b721608d111b24562f59e873fcf991c3cd7a',
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