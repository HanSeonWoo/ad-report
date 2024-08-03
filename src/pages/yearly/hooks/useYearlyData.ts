import { START_YEAR, useGetAllData } from "@/hooks/useGetAllData";
import { useMemo } from "react";

export interface YearData {
  year: number;
  Revenue: number;
  Commission: number;
  Complete: number;
  NetRevenue: number;
}
export type YearDataKeys = keyof YearData;

export const useYearlyData = () => {
  const { allData, isError, isLoading, progress } = useGetAllData();

  const yearData: YearData[] = useMemo(() => {
    if (isLoading || isError) return [];

    return allData
      .map((result, index) => {
        const year = START_YEAR + index;
        if (!result) {
          console.error(`No data for year ${year}`);
          return null;
        }
        const revenue = result.Payment.Revenue;
        const commission = result.Payment.Commission;

        return {
          year,
          Revenue: revenue,
          Commission: commission,
          Complete: result.Payment.Complete,
          NetRevenue: revenue - commission,
        };
      })
      .filter((data): data is YearData => data !== null);
  }, [allData, isLoading, isError]);

  return {
    yearData,
    isError,
    isLoading,
    progress,
  };
};
