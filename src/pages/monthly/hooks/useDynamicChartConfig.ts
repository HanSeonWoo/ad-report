import { ChartConfig } from "@/components/ui/chart";
import { useMemo } from "react";
import { MonthYearDataType } from "./useMonthData";

export const useDynamicChartConfig = (data: MonthYearDataType[]) => {
  const chartConfig: ChartConfig = useMemo(() => {
    if (!data) return {};

    // 첫 번째 데이터 항목에서 연도 키를 추출합니다.
    const years = Object.keys(data[0]);

    return years.reduce((config, year, index) => {
      config[year] = {
        label: year,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return config;
    }, {} as ChartConfig);
  }, [data]);

  return chartConfig;
};
