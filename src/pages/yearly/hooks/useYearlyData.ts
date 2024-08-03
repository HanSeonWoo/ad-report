import { useGetAllData } from "@/hooks/useGetAllData";
import { START_YEAR } from "@/lib/const";
import { useMemo } from "react";

export interface YearData {
  year: number;
  Revenue: number;
  Commission: number;
  Complete: number;
  RevenuePerComplete: number;
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
        const { Commission, Complete, Revenue } = result.Payment;

        return {
          year,
          Revenue,
          Commission,
          Complete,
          RevenuePerComplete:
            Revenue > 0 && Complete > 0 ? Revenue / Complete : 0,
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
