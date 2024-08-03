import { useGetAllData } from "@/hooks/useGetAllData";
import { RESULT_TYPES, START_YEAR, YEARS } from "@/lib/const";
import { ResultType } from "@/lib/type";
import { useMemo } from "react";

// 단일 월에 대한 여러 연도의 데이터를 표현하는 타입
export type MonthYearDataType = {
  [year: string]: number;
};

// 단일 지표(예: Revenue)에 대한 모든 월의 데이터를 표현하는 타입
export type MetricDataType = {
  [month: number]: MonthYearDataType;
};

// 모든 지표에 대한 데이터를 표현하는 최종 타입
export type AllMetricsDataType = {
  [K in ResultType]: MetricDataType;
};

export const useMonthData = () => {
  const { allData, isError, isLoading, progress } = useGetAllData();

  const metricsData: AllMetricsDataType = useMemo(() => {
    if (isLoading || isError) {
      return RESULT_TYPES.reduce((acc, type) => {
        acc[type] = {};
        return acc;
      }, {} as AllMetricsDataType);
    }

    const yearlyData = allData.map((result) => result?.Payment);
    if (!yearlyData.every(Boolean)) {
      return RESULT_TYPES.reduce((acc, type) => {
        acc[type] = {};
        return acc;
      }, {} as AllMetricsDataType);
    }

    const initialMetricsData: AllMetricsDataType = RESULT_TYPES.reduce(
      (acc, type) => {
        acc[type] = Array.from({ length: 12 }, (_, month) => ({
          [month]: YEARS.reduce((yearAcc, year) => {
            yearAcc[year.toString()] = 0;
            return yearAcc;
          }, {} as MonthYearDataType),
        })).reduce((monthAcc, monthData, monthIndex) => {
          monthAcc[monthIndex] = monthData[monthIndex];
          return monthAcc;
        }, {} as MetricDataType);
        return acc;
      },
      {} as AllMetricsDataType
    );

    yearlyData.forEach((yearData, yearIndex) => {
      const year = (START_YEAR + yearIndex).toString();
      yearData?.Monthly.forEach(
        ({ Revenue, Commission, Complete }, monthIndex) => {
          initialMetricsData.Revenue[monthIndex][year] = Revenue;
          initialMetricsData.Commission[monthIndex][year] = Commission;
          initialMetricsData.Complete[monthIndex][year] = Complete;
          initialMetricsData.RevenuePerComplete[monthIndex][year] =
            Revenue > 0 && Complete > 0 ? Revenue / Complete : 0;
        }
      );
    });

    return initialMetricsData;
  }, [allData, isLoading, isError]);

  return { progress, isLoading, isError, metricsData };
};
