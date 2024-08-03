import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import { Progress } from "@/components/ui/progress";
import { RESULT_TYPES } from "@/lib/const";
import { ResultType } from "@/lib/type";
import { useState } from "react";
import MonthlyChart from "./components/MonthlyChart";
import MonthlyTable from "./components/MonthlyTable";
import { useMonthData } from "./hooks/useMonthData";

export default function MonthlyPage() {
  const [resultType, setResultType] = useState<ResultType>(RESULT_TYPES[0]);
  const { isLoading, progress, metricsData } = useMonthData();
  const monthChartDate = Object.entries(metricsData[resultType]).map(
    ([_, yearData]) => yearData
  );

  return (
    <ContentLayout title="월별">
      {isLoading ? (
        <Progress value={progress} className="w-full" />
      ) : (
        <>
          <MonthlyChart
            data={monthChartDate}
            onSelect={setResultType}
            resultType={resultType}
          />
          <MonthlyTable data={monthChartDate} resultType={resultType} />
        </>
      )}
    </ContentLayout>
  );
}
