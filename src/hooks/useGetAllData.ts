import { fetchAdSettlementData } from "@/services/settlement";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export const START_YEAR = 2018;
const END_YEAR = 2021;
export const YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, i) => START_YEAR + i
);

type AdSettlementQueryKey = readonly ["adSettlement", { search_year: number }];

export const useGetAllData = () => {
  const [progress, setProgress] = useState(0);

  const results = useQueries({
    queries: YEARS.map((year) => ({
      queryKey: ["adSettlement", { search_year: year }] as const,
      queryFn: ({ queryKey }: { queryKey: AdSettlementQueryKey }) =>
        fetchAdSettlementData({ search_year: queryKey[1].search_year }),
      staleTime: Infinity,
    })),
  });

  const isLoading = useMemo(
    () => results.some((result) => result.isLoading),
    [results]
  );

  const isError = useMemo(
    () => results.some((result) => result.isError),
    [results]
  );

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => Math.min(oldProgress + 5, 95));
      }, 350);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
    }
  }, [isLoading]);

  return {
    isLoading,
    isError,
    progress,
    allData: results.map((item) => item.data),
  };
};
