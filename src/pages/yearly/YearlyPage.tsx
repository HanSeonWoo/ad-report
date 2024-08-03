import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import { Progress } from "@/components/ui/progress";
import YearlyChart from "./components/YearlyChart";
import { YearlyTable } from "./components/YearlyTable";
import { useYearlyData } from "./hooks/useYearlyData";

export default function YearlyPage() {
  const { isError, isLoading, progress, yearData } = useYearlyData();

  return (
    <ContentLayout title="연도별">
      {isError && <div>Error loading data</div>}
      {isLoading ? (
        <Progress value={progress} className="w-full" />
      ) : (
        <>
          <YearlyChart data={yearData} />
          <YearlyTable data={yearData} />
        </>
      )}
    </ContentLayout>
  );
}
