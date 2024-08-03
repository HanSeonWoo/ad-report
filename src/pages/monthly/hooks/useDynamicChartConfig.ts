import { ChartConfig } from "@/components/ui/chart";
import { useMemo } from "react";

type MonthData = {
  month: string;
  [year: string]: number | string;
};

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#9333ea",
  "#ea580c",
  "#0891b2",
  "#4f46e5",
  "#be123c",
];

export const useDynamicChartConfig = (data: MonthData[]) => {
  const chartConfig: ChartConfig = useMemo(() => {
    if (!data || data.length === 0) return {};

    // 첫 번째 데이터 항목에서 연도 키를 추출합니다.
    const years = Object.keys(data[0]).filter((key) => key !== "month");

    return years.reduce((config, year, index) => {
      config[year] = {
        label: year,
        color: COLORS[index % COLORS.length], // 색상을 순환하여 사용합니다.
      };
      return config;
    }, {} as ChartConfig);
  }, [data]);

  return chartConfig;
};
