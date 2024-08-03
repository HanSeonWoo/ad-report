import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import YearlyChart from "@/components/charts/YearlyChart";
import { YearlyTable } from "@/components/tables/YearlyTable";
import { useQueries } from "@tanstack/react-query";
import { fetchAdSettlementData } from "@/services/settlement";
import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";

export type AdSettlementQueryKey = readonly [
  "adSettlement",
  { search_year: number }
];

export interface YearData {
  year: number;
  Revenue: number;
  Commission: number;
  Complete: number;
  NetRevenue: number;
}
export type YearDataKeys = keyof YearData;

const START_YEAR = 2018;
const END_YEAR = 2021;
const YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, i) => START_YEAR + i
);

export default function YearlyPage() {
  const [progress, setProgress] = useState(0);

  const results = useQueries({
    queries: YEARS.map((year) => ({
      queryKey: ["adSettlement", { search_year: year }] as const,
      queryFn: ({ queryKey }: { queryKey: AdSettlementQueryKey }) =>
        fetchAdSettlementData({ search_year: queryKey[1].search_year }),
      staleTime: Infinity,
    })),
  });

  // 로딩 상태 확인
  const isLoading = results.some((result) => result.isLoading);

  // 에러 상태 확인
  const isError = results.some((result) => result.isError);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 5, 95);
          return newProgress;
        });
      }, 500);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
    }
  }, [isLoading]);

  // 모든 데이터가 로드되고 에러가 없을 때만 데이터 가공
  const yearData: YearData[] = useMemo(() => {
    if (isLoading || isError) return [];

    return results
      .map((result, index) => {
        const year = START_YEAR + index;
        if (!result.data) {
          console.error(`No data for year ${year}`);
          return null;
        }
        const revenue = result.data.Payment.Revenue;
        const commission = result.data.Payment.Commission;

        return {
          year,
          Revenue: revenue,
          Commission: commission,
          Complete: result.data.Payment.Complete,
          NetRevenue: revenue - commission,
        };
      })
      .filter((data): data is YearData => data !== null);
  }, [results, isLoading, isError]);

  return (
    <ContentLayout title="연도별">
      {isLoading && <Progress value={progress} className="w-full" />}
      {isError && <div>Error loading data</div>}
      {yearData && yearData.length > 0 && <YearlyChart data={yearData} />}
      {yearData && yearData.length > 0 && <YearlyTable data={yearData} />}
    </ContentLayout>
  );
}
