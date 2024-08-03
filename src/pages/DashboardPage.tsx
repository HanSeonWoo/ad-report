import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import MonthDashboard from "@/components/MonthDashboard";
import { Progress } from "@/components/ui/progress";
import { useGetAllData } from "@/hooks/useGetAllData";
import { useGetData } from "@/hooks/useGetData";
import { MONTHS, YEARS } from "@/lib/const";
import { useState } from "react";

// 랜덤 선택 함수
function getRandomElement<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 랜덤 선택 함수 이유
 * 대시보드에서는 가장 최근 월 데이터를 보여주는 게 좋다고 생각하나,
 * 데모에서는 최신 데이터가 없기에 랜덤 데이터를 선택.
 */

export default function DashboardPage() {
  useGetAllData();

  const [year] = useState(getRandomElement(YEARS));
  const [month] = useState(getRandomElement(MONTHS));
  const { data, isLoading, isError, progress } = useGetData({
    search_year: year,
    search_month: month,
  });
  console.log("🚀 ~ DashboardPage ~ data:", data);
  return (
    <ContentLayout title="대시보드">
      {!data ? (
        <Progress value={progress} className="w-full" />
      ) : (
        <div className="">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {year}년 {month}월 대시보드
          </h2>
          <MonthDashboard data={data} />
        </div>
      )}
    </ContentLayout>
  );
}
