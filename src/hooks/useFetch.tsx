import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchApiData, fetchApiSuccess, fetchApiFailure } from "../store/apiSlice";

export const useFetchData = <T,>(url:string) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<T | null>(null); 
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        dispatch(fetchApiData());
        const resp = await axios.get<T>(url);
        const data = await resp?.data;
        dispatch(fetchApiSuccess(data));
        setApiData(data);
        setIsLoading(false);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred";
        setServerError(errorMessage);
        dispatch(fetchApiFailure(errorMessage));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, url]);

  return { isLoading, apiData, serverError };
};