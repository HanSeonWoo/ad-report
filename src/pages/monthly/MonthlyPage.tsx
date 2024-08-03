import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import { Progress } from "@/components/ui/progress";
import MonthlyChart from "./components/MonthlyChart";
import MonthlyTable from "./components/MonthlyTable";
import { useMonthData } from "./hooks/useMonthData";

export default function MonthlyPage() {
  const { isError, isLoading, progress, monthData } = useMonthData();
  return (
    <ContentLayout title="월별">
      {isLoading ? (
        <Progress value={progress} className="w-full" />
      ) : (
        <>
          <MonthlyChart data={monthData} />
          <MonthlyTable data={monthData} />
        </>
      )}
    </ContentLayout>
  );
}
