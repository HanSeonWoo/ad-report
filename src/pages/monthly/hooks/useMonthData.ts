import { useMemo } from "react";
import { START_YEAR, useGetAllData, YEARS } from "../../../hooks/useGetAllData";

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

export const useMonthData = () => {
  const { allData, isError, isLoading, progress } = useGetAllData();

  const monthData: MonthData[] = useMemo(() => {
    if (isLoading || isError) return [];

    const yearlyData = allData.map((result) => result?.Payment);
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
  }, [allData, isLoading, isError]);

  return { progress, isLoading, isError, monthData };
};
