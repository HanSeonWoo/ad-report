import { fetchAdSettlementData } from "@/services/settlement";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Params = {
  search_year: number;
  search_month?: number;
};
export const useGetData = ({ search_year, search_month }: Params) => {
  const [progress, setProgress] = useState(0);

  const result = useQuery({
    queryKey: ["adSettlement", { search_year, search_month }] as const,
    queryFn: () => fetchAdSettlementData({ search_year, search_month }),
  });

  useEffect(() => {
    if (result.isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => Math.min(oldProgress + 5, 95));
      }, 350);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
    }
  }, [result.isLoading]);

  return { ...result, progress };
};
