import { useState, useEffect, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { AdSettlementQueryKey } from "@/pages/YearlyPage";
import { fetchAdSettlementData } from "@/services/settlement";

const START_YEAR = 2018;
const END_YEAR = 2021;
export const YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, i) => START_YEAR + i
);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface MonthData {
  month: string;
  [year: string]: number | string;
}

const useMonthData = () => {
  const [progress, setProgress] = useState(0);

  const results = useQueries({
    queries: YEARS.map((year) => ({
      queryKey: ["adSettlement", { search_year: year }] as const,
      queryFn: ({ queryKey }: { queryKey: AdSettlementQueryKey }) =>
        fetchAdSettlementData({ search_year: queryKey[1].search_year }),
      staleTime: Infinity,
    })),
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => Math.min(oldProgress + 5, 95));
      }, 500);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
    }
  }, [isLoading]);

  const monthData: MonthData[] = useMemo(() => {
    if (isLoading || isError) return [];

    const yearlyData = results.map((result) => result.data?.Payment);
    if (!yearlyData.every(Boolean)) return [];

    const monthData: MonthData[] = MONTHS.map((month) => ({ month }));

    yearlyData.forEach((yearData, index) => {
      const year = (START_YEAR + index).toString();
      yearData?.Monthly.forEach((monthlyPayment: any) => {
        const date = new Date(parseInt(monthlyPayment.Datetime.slice(6, -2)));
        const monthIndex = date.getMonth();
        monthData[monthIndex][year] = monthlyPayment.Revenue;
      });
    });

    // Fill in missing data with 0
    monthData.forEach((monthDatum) => {
      YEARS.forEach((year) => {
        if (!(year.toString() in monthDatum)) {
          monthDatum[year.toString()] = 0;
        }
      });
    });

    return monthData;
  }, [results, isLoading, isError]);

  return { progress, isLoading, isError, monthData };
};

export default useMonthData;
